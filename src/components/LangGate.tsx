import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ensureLanguage, type Lang } from '../i18n'

// Sets the active i18next language (and <html lang>) for everything
// rendered under this branch of the route tree, loading its translations
// first if needed.
export default function LangGate({ lang }: { lang: Lang }) {
  const { i18n } = useTranslation()
  useEffect(() => {
    let alive = true
    ensureLanguage(lang)
      .catch(() => { /* keep showing the fallback language */ })
      .finally(() => {
        if (!alive) return
        i18n.changeLanguage(lang)
        document.documentElement.lang = lang
      })
    return () => { alive = false }
  }, [lang, i18n])
  return <Outlet />
}
