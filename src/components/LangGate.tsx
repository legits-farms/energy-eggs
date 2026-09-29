import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Lang } from '../i18n'

// Sets the active i18next language (and <html lang>) for everything
// rendered under this branch of the route tree.
export default function LangGate({ lang }: { lang: Lang }) {
  const { i18n } = useTranslation()
  useEffect(() => {
    i18n.changeLanguage(lang)
    document.documentElement.lang = lang
  }, [lang, i18n])
  return <Outlet />
}
