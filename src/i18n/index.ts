import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'

export const SUPPORTED_LANGS = ['en', 'hi'] as const
export type Lang = (typeof SUPPORTED_LANGS)[number]

// Read the language straight from the URL at boot so the first render
// already matches — avoids a flash of English before LangGate's effect runs.
export const initialLang: Lang = typeof window !== 'undefined' && window.location.pathname.startsWith('/hi') ? 'hi' : 'en'
if (typeof document !== 'undefined') document.documentElement.lang = initialLang

// English is bundled (it's also the fallback). Hindi (~150 KB of Devanagari
// text) is a separate chunk loaded only when a Hindi page is opened, so
// English visitors never download or parse it.
i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnObjects: true,
})

const loaders: Record<Lang, (() => Promise<{ default: object }>) | null> = {
  en: null,
  hi: () => import('./locales/hi.json'),
}

/** Makes sure a language's translations are loaded (no-op once loaded). */
export async function ensureLanguage(lang: Lang) {
  const load = loaders[lang]
  if (!load || i18n.hasResourceBundle(lang, 'translation')) return
  const mod = await load()
  i18n.addResourceBundle(lang, 'translation', mod.default, true, true)
}

export default i18n
