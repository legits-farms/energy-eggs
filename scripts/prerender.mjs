// Build-time prerender: after `vite build`, render every route (English and
// Hindi) to its own static HTML file with page-specific <title>, description,
// canonical, hreflang, Open Graph and breadcrumb data. Crawlers and link
// previews then see real content without running JavaScript; in the browser
// main.tsx boots as usual and replaces the markup.
//
// Output naming is directory-style (/birds -> birds/index.html). energyeggs.in
// runs `serve -s dist` on Render: with -s, serve rewrites every path that isn't
// an exact file to index.html *before* trying birds.html, so flat files would
// never be served — but a directory with an index.html is. Vercel and other
// static hosts serve directory indexes too.
import { readFile, readdir, writeFile, mkdir, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'

const SITE = 'https://energyeggs.in'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrOut = resolve(root, 'dist-ssr')

// Mirrors SEO_KEYS in src/components/Layout.tsx
const SEO_KEYS = {
  '': 'home', birds: 'birds', eggs: 'eggs', equipment: 'equipment', feed: 'feed',
  'farm-development': 'farmDevelopment', 'contract-farming': 'contractFarming',
  'b2b-supply': 'b2bSupply', shop: 'shop', 'rate-card': 'rateCard', about: 'about', contact: 'contact',
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const urlFor = (path, lang) => (lang === 'en' ? `/${path}` : path ? `/hi/${path}` : '/hi')
const fileFor = (path, lang) => {
  if (lang === 'en') return path ? `${path}/index.html` : 'index.html'
  return path ? `hi/${path}/index.html` : 'hi/index.html'
}

// Swap the content attribute/href of a single tag in the template; fail loudly
// if the template changed so a broken prerender never ships silently.
function setTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: template tag not found: ${pattern}`)
  return html.replace(pattern, replacement)
}

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: ssrOut, emptyOutDir: true, copyPublicDir: false },
})

const { render, t, ROUTES } = await import(pathToFileURL(resolve(ssrOut, 'entry-server.js')).href)
const template = await readFile(resolve(dist, 'index.html'), 'utf8')

let count = 0
for (const lang of ['en', 'hi']) {
  for (const [path] of ROUTES) {
    const url = urlFor(path, lang)
    const key = SEO_KEYS[path] ?? 'home'
    const title = t(`seo.${key}.title`, lang)
    const description = t(`seo.${key}.description`, lang)
    const canonical = `${SITE}${url}`
    const enUrl = `${SITE}${urlFor(path, 'en')}`
    const hiUrl = `${SITE}${urlFor(path, 'hi')}`
    const appHtml = await render(url, lang)

    // Home > Page breadcrumb (home itself gets none)
    const crumbName = title.split(/ [|—] /)[0]
    const breadcrumb = path
      ? `<script type="application/ld+json">${JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Energy Eggs', item: `${SITE}${urlFor('', lang)}` },
            { '@type': 'ListItem', position: 2, name: crumbName, item: canonical },
          ],
        })}</script>\n`
      : ''

    let html = template
    html = setTag(html, /<html lang="[^"]*">/, `<html lang="${lang}">`)
    html = setTag(html, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    html = setTag(html, /(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    html = setTag(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
    html = setTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
    html = setTag(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    html = setTag(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    html = setTag(html, /(<meta property="og:locale" content=")[^"]*(")/, `$1${lang === 'hi' ? 'hi_IN' : 'en_IN'}$2`)
    html = setTag(html, /(<meta property="og:locale:alternate" content=")[^"]*(")/, `$1${lang === 'hi' ? 'en_IN' : 'hi_IN'}$2`)
    html = setTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    html = setTag(html, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    html = setTag(
      html,
      /<\/head>/,
      `    <link rel="alternate" hreflang="en" href="${enUrl}" />\n` +
        `    <link rel="alternate" hreflang="hi" href="${hiUrl}" />\n` +
        `    <link rel="alternate" hreflang="x-default" href="${enUrl}" />\n` +
        (breadcrumb ? `    ${breadcrumb}` : '') +
        `  </head>`,
    )
    html = setTag(html, /<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`)

    const out = resolve(dist, fileFor(path, lang))
    await mkdir(dirname(out), { recursive: true })
    await writeFile(out, html)
    count++
  }
}

// Production runs `serve dist` (see "start" in package.json). serve's -s flag
// can't be used: it rewrites every non-exact path to index.html before looking
// for the page file, so prerendered pages and verification files would never
// be served. Instead map each page explicitly. There is deliberately no "**"
// catch-all: serve re-applies the remaining rules to an already-rewritten path,
// so "**" would turn /birds/index.html back into /index.html. Unknown paths get
// 404.html instead (the SPA shell, noindex), and the client router redirects.
const rewrites = []
for (const lang of ['en', 'hi']) {
  for (const [path] of ROUTES) {
    const url = urlFor(path, lang)
    if (url === '/') continue
    rewrites.push({ source: url, destination: `/${fileFor(path, lang)}` })
  }
}
// Google Search Console HTML-file verification: serve strips ".html" with a
// 301, so the extensionless path must resolve to the file too.
for (const f of await readdir(dist)) {
  if (/^google[0-9a-f]+\.html$/.test(f)) rewrites.push({ source: `/${f.replace(/\.html$/, '')}`, destination: `/${f}` })
}
await writeFile(resolve(dist, 'serve.json'), JSON.stringify({ cleanUrls: true, rewrites }, null, 2))
await writeFile(
  resolve(dist, '404.html'),
  setTag(template, /(<meta name="robots" content=")[^"]*(")/, '$1noindex, follow$2'),
)

await rm(ssrOut, { recursive: true, force: true })
console.log(`prerender: wrote ${count} pages + serve.json (${rewrites.length} rewrites)`)
