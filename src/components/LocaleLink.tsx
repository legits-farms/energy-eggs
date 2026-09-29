import { Link, NavLink, type LinkProps, type NavLinkProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGS } from '../i18n'

const PREFIXED_LANGS = SUPPORTED_LANGS.filter((l) => l !== 'en')
const PREFIX_RE = new RegExp(`^/(${PREFIXED_LANGS.join('|')})(/.*)?$`)

// English lives at the plain paths (no prefix, preserves existing URLs/SEO);
// every other language gets a leading /<lang> segment.
export function localize(path: string, lang: string): string {
  if (lang === 'en') return path
  return path === '/' ? `/${lang}` : `/${lang}${path}`
}

// "/hi/eggs" -> "/eggs", "/hi" -> "/", "/eggs" -> "/eggs"
export function stripLangPrefix(pathname: string): string {
  const m = pathname.match(PREFIX_RE)
  if (m) return m[2] || '/'
  return pathname
}

// Same page, different language — used by the language switcher.
export function pathWithLang(pathname: string, lang: string): string {
  return localize(stripLangPrefix(pathname), lang)
}

type ToProp = LinkProps['to']
const toPath = (to: ToProp) => (typeof to === 'string' ? to : (to.pathname ?? ''))

// Drop-in replacements for react-router's Link/NavLink that automatically
// prefix internal hrefs with the active language.
export function LocaleLink({ to, ...props }: LinkProps) {
  const { i18n } = useTranslation()
  return <Link to={localize(toPath(to), i18n.language)} {...props} />
}

export function LocaleNavLink({ to, ...props }: NavLinkProps) {
  const { i18n } = useTranslation()
  return <NavLink to={localize(toPath(to), i18n.language)} {...props} />
}
