import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import hi from './locales/hi.json'

export const SUPPORTED_LANGS = ['en', 'hi'] as const
export type Lang = (typeof SUPPORTED_LANGS)[number]

// Read the language straight from the URL at boot so the first render
// already matches — avoids a flash of English before LangGate's effect runs.
const initialLang: Lang = typeof window !== 'undefined' && window.location.pathname.startsWith('/hi') ? 'hi' : 'en'
if (typeof document !== 'undefined') document.documentElement.lang = initialLang

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnObjects: true,
})

export default i18n
