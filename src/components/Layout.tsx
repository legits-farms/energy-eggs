import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import Logo from './Logo'
import { EnquiryProvider } from './EnquiryModal'
import { CALL_DISPLAY, CALL_NUMBER } from './CallButton'

const SERVICES = [
  ['/birds', 'Birds'],
  ['/eggs', 'Eggs'],
  ['/equipment', 'Farm Equipments'],
  ['/feed', 'Feed'],
  ['/farm-development', 'Farm Development'],
]

const SITE_URL = 'https://energyeggs.vercel.app'

const ROUTE_META: Record<string, [title: string, description: string]> = {
  '/': ['Energy Eggs — The B2B Desi Poultry Ecosystem', 'Sonali, Aseel, Kadaknath and Fiyoumi birds and eggs with published rate cards, poultry equipment, feed, farm development and contract farming partnerships.'],
  '/birds': ['Desi Birds & Country Chicken Rate Card | Energy Eggs', 'Live bird rates by age for Sonali, Aseel and Kadaknath — day-old chicks to 20+ weeks, male and female. Sonali ₹500/kg, Aseel ₹700/kg, Kadaknath ₹750/kg, Fiyoumi ₹1,500/kg. Minimum order 10 birds.'],
  '/eggs': ['Desi Egg Rate Card — Ex-Farm Prices | Energy Eggs', 'Ex-farm egg prices from ₹10.75 to ₹12.00 per egg, tiered by monthly commitment. Washing, grading and packing add-ons, custom packing and private label for bulk B2B orders.'],
  '/equipment': ['Poultry Farm Equipment | Energy Eggs', 'Poultry equipment for desi poultry farms — nipple drinking systems, brooding, feeders, drinkers and husk supply for farm setup and expansion.'],
  '/feed': ['Poultry Feed | Energy Eggs', 'Poultry feed programmes for every growth stage — from pre-starter to grower and finisher — supporting consistent desi bird performance.'],
  '/farm-development': ['Poultry Farm Development & Design | Energy Eggs', 'End-to-end desi poultry farm development — farm design, shed construction and pasture planning, from land to farm-ready.'],
  '/contract-farming': ['Contract Farming — Pasture-Raised & Deep Litter Models | Energy Eggs', 'Structured Sonali contract farming with fixed-price egg procurement, 15-day payments, flock buyback and full technical support. Pasture-raised and deep-litter models.'],
  '/b2b-supply': ['B2B Poultry Supply & Volume Commitment | Energy Eggs', 'Structured B2B procurement for restaurants, hotels, QSRs, retailers and distributors — spot orders, scheduled supply and volume commitment programmes with priority supply.'],
  '/shop': ['Shop — Order Desi Birds, Eggs & Equipment | Energy Eggs', 'Order Sonali, Aseel, Kadaknath and Fiyoumi birds, desi eggs and poultry farm equipment at published B2B rates. Pick your product, send an enquiry and get a structured quote.'],
  '/rate-card': ['Rate Card — Bird & Egg Prices | Energy Eggs', 'The complete published B2B rate card — live bird rates by age for Sonali, Aseel and Kadaknath, and ex-farm egg prices tiered by monthly commitment with processing add-ons.'],
  '/about': ['About Energy Eggs — The B2B Desi Poultry Ecosystem', 'Energy Eggs connects desi poultry farmers and food businesses through structured production models, published pricing and dependable B2B supply.'],
  '/contact': ['Contact — B2B Enquiry | Energy Eggs', 'Tell us your requirement — birds, eggs, equipment, farm development or contract farming — and our B2B team will respond with a structured commercial proposal.'],
}

function SeoMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const [title, description] = ROUTE_META[pathname] ?? ROUTE_META['/']
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
  }, [pathname])
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

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 35, damping: 14, mass: 0.4, restDelta: 0.001 })
  const onServicePage = SERVICES.some(([to]) => to === pathname)

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
                  Services <span className="caret" aria-hidden="true">▾</span>
                </button>
                <div className="dropdown">
                  {SERVICES.map(([to, label]) => (
                    <NavLink key={to} to={to} onClick={closeAll}>{label}</NavLink>
                  ))}
                </div>
              </div>

              <NavLink to="/contract-farming" onClick={closeAll}>Contract Farming</NavLink>
              <NavLink to="/b2b-supply" onClick={closeAll}>Partnership</NavLink>
              <NavLink to="/about" onClick={closeAll}>About Us</NavLink>
              <NavLink to="/contact" onClick={closeAll}>Contact</NavLink>
              <Link to="/rate-card" className="btn menu-cta" onClick={closeAll}>Get Ratecard</Link>
              <Link to="/shop" className="btn ghost menu-cta" onClick={closeAll}>Shop</Link>
            </div>
            <div className="nav-ctas">
              <Link to="/rate-card" className="btn nav-cta">Get Rate Card</Link>
              <Link to="/shop" className="btn nav-cta ghost">Shop</Link>
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
              <span className="script foot-tagline">Nourishing lives. Naturally.</span>
              <p className="foot-tagsub">The B2B Desi Poultry Ecosystem</p>
            </div>
            <Link to="/rate-card" className="btn">Get Rate Card</Link>
          </div>
          <div className="foot-grid">
            <div>
              <Logo light />
              <p>
                The B2B desi poultry ecosystem — birds, eggs, farms, equipment and partnerships,
                from farm development to reliable B2B supply.
              </p>
            </div>
            <div>
              <h4>Services</h4>
              <Link to="/shop">Shop</Link>
              <Link to="/birds">Whole Birds</Link>
              <Link to="/eggs">Desi Eggs</Link>
              <Link to="/equipment">Farm Equipments</Link>
              <Link to="/feed">Feed</Link>
              <Link to="/farm-development">Farm Development</Link>
              
            </div>
            <div>
              <h4>Partnerships</h4>
              <Link to="/contract-farming">Contract Farming</Link>
              <Link to="/b2b-supply">Partnership</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/rate-card">Rate Card</Link>
            </div>
            <div>
              <h4>Get in Touch</h4>
              <a href="tel:+917878787226">+91 78 78 78 7226</a>
              <a href="mailto:hello@energyeggs.in">hello@energyeggs.in</a>
              <Link to="/contact">B2B Enquiry</Link>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Energy Eggs® Pvt Ltd. The B2B Desi Poultry Ecosystem.</span>
            <span>Sonali · Aseel · Kadaknath · Fiyoumi</span>
            <button
              type="button"
              className="to-top"
              aria-label="Back to top"
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
