import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useSpring } from 'framer-motion'
import Logo from './Logo'
import { EnquiryProvider } from './EnquiryModal'
import { CALL_DISPLAY, CALL_NUMBER } from './CallButton'
import { LocaleLink, LocaleNavLink, pathWithLang, stripLangPrefix } from './LocaleLink'

const SERVICES: [to: string, key: string][] = [
  ['/birds', 'nav.birds'],
  ['/eggs', 'nav.eggs'],
  ['/equipment', 'nav.equipment'],
  ['/feed', 'nav.feed'],
  ['/farm-development', 'nav.farmDevelopment'],
]

const SITE_URL = 'https://energyeggs.vercel.app'

// Maps a canonical (un-prefixed) path to its seo.* translation key
const SEO_KEYS: Record<string, string> = {
  '/': 'home',
  '/birds': 'birds',
  '/eggs': 'eggs',
  '/equipment': 'equipment',
  '/feed': 'feed',
  '/farm-development': 'farmDevelopment',
  '/contract-farming': 'contractFarming',
  '/b2b-supply': 'b2bSupply',
  '/shop': 'shop',
  '/rate-card': 'rateCard',
  '/about': 'about',
  '/contact': 'contact',
}

// Ensures a <link rel="alternate" hreflang="..."> tag exists for each
// language variant of the current page, so search engines know these URLs
// are the same content and serve the right one per searcher — this is what
// actually keeps a multi-language site SEO-safe (no gate/interstitial needed).
function setHreflang(base: string) {
  const variants: [hreflang: string, href: string][] = [
    ['en', `${SITE_URL}${base}`],
    ['hi', `${SITE_URL}${base === '/' ? '/hi' : `/hi${base}`}`],
    ['x-default', `${SITE_URL}${base}`],
  ]
  for (const [hreflang, href] of variants) {
    let el = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`)
    if (!el) {
      el = document.createElement('link')
      el.rel = 'alternate'
      el.hreflang = hreflang
      document.head.appendChild(el)
    }
    el.href = href
  }
}

function SeoMeta() {
  const { pathname } = useLocation()
  const { t } = useTranslation()
  useEffect(() => {
    const base = stripLangPrefix(pathname)
    const key = SEO_KEYS[base] ?? 'home'
    const title = t(`seo.${key}.title`)
    const description = t(`seo.${key}.description`)
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}`
    document.title = title
    const set = (selector: string, attr: string, value: string) => {
      document.querySelector(selector)?.setAttribute(attr, value)
    }
    set('meta[name="description"]', 'content', description)
    set('link[rel="canonical"]', 'href', url)
    set('meta[property="og:title"]', 'content', title)
    set('meta[property="og:description"]', 'content', description)
    set('meta[property="og:url"]', 'content', url)
    set('meta[name="twitter:title"]', 'content', title)
    set('meta[name="twitter:description"]', 'content', description)
    setHreflang(base)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, t])
  return null
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

const LANG_CHOICE_KEY = 'ee-lang-choice'

// A small, dismissible suggestion banner — never a blocking gate. The real
// page underneath always renders regardless, so crawlers and users both see
// actual content first; this just offers a switch for browsers set to Hindi.
function LangSuggest() {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (i18n.language !== 'en') return
    try {
      if (localStorage.getItem(LANG_CHOICE_KEY)) return
    } catch { /* ignore */ }
    const browserLang = navigator.language || navigator.languages?.[0] || ''
    if (browserLang.toLowerCase().startsWith('hi')) setShow(true)
  }, [i18n.language])

  const dismiss = (choice: string) => {
    try { localStorage.setItem(LANG_CHOICE_KEY, choice) } catch { /* ignore */ }
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="lang-suggest" role="region" aria-label="Language suggestion">
      <span>यह वेबसाइट हिंदी में भी उपलब्ध है।</span>
      <div className="lang-suggest-actions">
        <Link to={pathWithLang(pathname, 'hi')} className="btn sm" onClick={() => dismiss('hi')}>हिंदी में देखें</Link>
        <button type="button" className="lang-suggest-close" aria-label="Dismiss" onClick={() => dismiss('en')}>✕</button>
      </div>
    </div>
  )
}

function LangSwitch({ pathname, className = 'lang-switch' }: { pathname: string; className?: string }) {
  const { i18n } = useTranslation()
  return (
    <div className={className} role="group" aria-label="Language">
      <Link to={pathWithLang(pathname, 'en')} className={i18n.language === 'en' ? 'on' : ''}>EN</Link>
      <Link to={pathWithLang(pathname, 'hi')} className={i18n.language === 'hi' ? 'on' : ''}>हिं</Link>
    </div>
  )
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 35, damping: 14, mass: 0.4, restDelta: 0.001 })
  const basePath = stripLangPrefix(pathname)
  const onServicePage = SERVICES.some(([to]) => to === basePath)

  const closeAll = () => {
    setMenuOpen(false)
    setServicesOpen(false)
  }

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
      // Close the mobile menu when tapping anywhere outside the nav
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', onClickOutside)
    return () => document.removeEventListener('pointerdown', onClickOutside)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setServicesOpen(false)
  }, [pathname])

  return (
    <EnquiryProvider>
      <SeoMeta />
      <ScrollToTop />
      <LangSuggest />

      {/* NAV */}
      <header className={scrolled ? 'scrolled' : ''}>
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
        <div className="wrap">
          <nav aria-label="Main navigation" ref={navRef}>
            <Logo />
            <div className={`navlinks ${menuOpen ? 'open' : ''}`}>

              <div className={`has-dropdown ${servicesOpen ? 'open' : ''}`} ref={dropRef}>
                <button
                  type="button"
                  className={`drop-btn ${onServicePage ? 'active' : ''}`}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((o) => !o)}
                >
                  {t('nav.services')} <span className="caret" aria-hidden="true">▾</span>
                </button>
                <div className="dropdown">
                  {SERVICES.map(([to, key]) => (
                    <LocaleNavLink key={to} to={to} onClick={closeAll}>{t(key)}</LocaleNavLink>
                  ))}
                </div>
              </div>

              <LocaleNavLink to="/contract-farming" onClick={closeAll}>{t('nav.contractFarming')}</LocaleNavLink>
              <LocaleNavLink to="/b2b-supply" onClick={closeAll}>{t('nav.partnership')}</LocaleNavLink>
              <LocaleNavLink to="/about" onClick={closeAll}>{t('nav.about')}</LocaleNavLink>
              <LocaleNavLink to="/contact" onClick={closeAll}>{t('nav.contact')}</LocaleNavLink>
              <LocaleLink to="/rate-card" className="btn menu-cta" onClick={closeAll}>{t('nav.getRatecard')}</LocaleLink>
              <LocaleLink to="/shop" className="btn ghost menu-cta" onClick={closeAll}>{t('nav.shop')}</LocaleLink>
              <LangSwitch pathname={pathname} className="lang-switch lang-switch-mobile" />
            </div>
            <div className="nav-ctas">
              <LangSwitch pathname={pathname} />
              <LocaleLink to="/rate-card" className="btn nav-cta">{t('nav.getRateCardFull')}</LocaleLink>
              <LocaleLink to="/shop" className="btn nav-cta ghost">{t('nav.shop')}</LocaleLink>
            </div>
            <button
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="burger" aria-hidden="true"><i /><i /><i /></span>
            </button>
          </nav>
        </div>
        <div className={`nav-scrim ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      </header>

      <main>
        <Outlet />
      </main>

      {/* Floating contact buttons — every page */}
      <div className="fab-stack">
        <a className="fab fab-call" href={`tel:${CALL_NUMBER}`} aria-label={`Call Energy Eggs on ${CALL_DISPLAY}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="fab-label">Call Us</span>
        </a>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div>
              <span className="script foot-tagline">{t('footer.tagline')}</span>
              <p className="foot-tagsub">{t('footer.tagSub')}</p>
            </div>
            <LocaleLink to="/rate-card" className="btn">{t('footer.getRateCard')}</LocaleLink>
          </div>
          <div className="foot-grid">
            <div>
              <Logo light />
              <p>{t('footer.about')}</p>
            </div>
            <div>
              <h4>{t('footer.servicesHeading')}</h4>
              <LocaleLink to="/shop">{t('footer.shop')}</LocaleLink>
              <LocaleLink to="/birds">{t('footer.wholeBirds')}</LocaleLink>
              <LocaleLink to="/eggs">{t('footer.desiEggs')}</LocaleLink>
              <LocaleLink to="/equipment">{t('footer.farmEquipments')}</LocaleLink>
              <LocaleLink to="/feed">{t('footer.feed')}</LocaleLink>
              <LocaleLink to="/farm-development">{t('footer.farmDevelopment')}</LocaleLink>
            </div>
            <div>
              <h4>{t('footer.partnershipsHeading')}</h4>
              <LocaleLink to="/contract-farming">{t('footer.contractFarming')}</LocaleLink>
              <LocaleLink to="/b2b-supply">{t('footer.partnership')}</LocaleLink>
              <LocaleLink to="/about">{t('footer.aboutUs')}</LocaleLink>
              <LocaleLink to="/contact">{t('footer.contactUs')}</LocaleLink>
              <LocaleLink to="/rate-card">{t('footer.rateCard')}</LocaleLink>
            </div>
            <div>
              <h4>{t('footer.getInTouch')}</h4>
              <a href="tel:+917878787226">+91 78 78 78 7226</a>
              <a href="mailto:hello@energyeggs.in">hello@energyeggs.in</a>
              <LocaleLink to="/contact">{t('footer.b2bEnquiry')}</LocaleLink>
            </div>
          </div>
          <div className="foot-bottom">
            <span>{t('footer.copyright')}</span>
            <span className="foot-breeds">{t('footer.breeds')}</span>
            <button
              type="button"
              className="to-top"
              aria-label={t('footer.backToTop')}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              ↑
            </button>
          </div>
        </div>
      </footer>
    </EnquiryProvider>
  )
}
