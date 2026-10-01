// Build-time prerender entry (see scripts/prerender.mjs). Renders one route to
// static HTML so crawlers and link previews get real content and per-page
// meta without running JavaScript. The browser still boots normally via
// main.tsx and replaces this markup on load.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import i18n, { ensureLanguage } from './i18n'
import { AppRoutes, ROUTES } from './App'

export { ROUTES }

export async function render(url: string, lang: 'en' | 'hi') {
  // LangGate switches language in an effect, which never runs on the server.
  await ensureLanguage(lang)
  await i18n.changeLanguage(lang)
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  )
  return html
}

export async function t(key: string, lang: 'en' | 'hi'): Promise<string> {
  await ensureLanguage(lang)
  return i18n.getFixedT(lang)(key) as string
}
