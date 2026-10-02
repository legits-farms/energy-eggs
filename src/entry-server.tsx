// Build-time prerender entry (see scripts/prerender.mjs). Renders one route to
// static HTML so crawlers and link previews get real content and per-page
// meta without running JavaScript. The browser still boots normally via
// main.tsx and replaces this markup on load.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import i18n, { ensureLanguage } from './i18n'
import { AppRoutes, ROUTES } from './App'
import { SiteSettingsProvider, applySettingsToI18n, type SiteSettings } from './lib/siteSettings'

export { ROUTES }
export { DEFAULT_SETTINGS, mergeSettings, fetchPublicSettings, phoneE164 } from './lib/siteSettings'

export async function render(url: string, lang: 'en' | 'hi', settings: SiteSettings) {
  // LangGate switches language in an effect, which never runs on the server.
  await ensureLanguage(lang)
  await i18n.changeLanguage(lang)
  const html = renderToString(
    <SiteSettingsProvider initial={settings} live={false}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </SiteSettingsProvider>,
  )
  return html
}

export async function t(key: string, lang: 'en' | 'hi', settings: SiteSettings): Promise<string> {
  await ensureLanguage(lang)
  applySettingsToI18n(settings)
  return i18n.getFixedT(lang)(key) as string
}
