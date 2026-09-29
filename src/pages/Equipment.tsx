import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { LocaleLink as Link } from '../components/LocaleLink'
import { MotionConfig } from 'framer-motion'
import { CountUp, MItem, MReveal, MStagger, pop } from '../components/Motion'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'

// Icons are static (not translatable) — merged by index with the translated
// title/text arrays from i18n at render time.
const EQUIPMENT_ICONS: ReactNode[] = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c3.5 4.5 6 7.8 6 11a6 6 0 0 1-12 0c0-3.2 2.5-6.5 6-11z" /><path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="14" r="6" /><path d="M12 8V4M8 5l1.5 2M16 5l-1.5 2" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h16l-2 9H6l-2-9z" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h10l-1.5 16a2 2 0 0 1-2 1.8h-3A2 2 0 0 1 8.5 19L7 3z" /><path d="M8 9h8" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-5 9 5-9 5-9-5z" /><path d="M3 14l9 5 9-5" /></svg>,
]

type CatalogueMeta = { icon: ReactNode; items: ReactNode[] }

const CATALOGUE_META: CatalogueMeta[] = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h16l-2 9H6l-2-9z" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>,
    items: [
      <><path d="M6 4h12l-2 7H8L6 4z" /><path d="M8 11v4a4 4 0 0 0 8 0v-4" /></>,
      <><rect x="3" y="13" width="18" height="6" rx="2" /><path d="M8 13V9a4 4 0 1 1 8 0v4" /></>,
      <><path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" /><ellipse cx="12" cy="14" rx="3" ry="1.4" /></>,
    ],
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c3.5 4.5 6 7.8 6 11a6 6 0 0 1-12 0c0-3.2 2.5-6.5 6-11z" /></svg>,
    items: [
      <><path d="M12 3v4" /><path d="M7 7h10l-1 12a2 2 0 0 1-2 1.8h-4A2 2 0 0 1 8 19L7 7z" /></>,
      <><path d="M12 2v3" /><path d="M5 6h14l-1.5 14a2 2 0 0 1-2 1.8h-7A2 2 0 0 1 6.5 20L5 6z" /></>,
      <><circle cx="7" cy="8" r="2.4" /><circle cx="17" cy="8" r="2.4" /><path d="M7 10.4V15M17 10.4V15" /><path d="M4 19h16" /></>,
      <><circle cx="12" cy="8" r="2.6" /><path d="M12 10.6V16" /><path d="M8 19h8" /></>,
      <><ellipse cx="12" cy="16" rx="6" ry="3" /><path d="M12 13V6" /><circle cx="12" cy="5" r="1.4" /></>,
      <><path d="M12 4v9" /><path d="M9 6h6" /><circle cx="12" cy="16" r="2.4" /></>,
      <><path d="M12 4v9" /><path d="M9 6h6" /><path d="M12 13l-2.5 5h5L12 13z" /></>,
      <><path d="M4 12h16" /><path d="M8 8v8M16 8v8" /></>,
      <><rect x="9" y="3" width="6" height="18" rx="2" /><path d="M9 13h6" /></>,
      <><rect x="5" y="6" width="14" height="14" rx="2" /><path d="M9 6V4h6v2" /></>,
    ],
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></svg>,
    items: [
      <><circle cx="12" cy="15" r="5" /><path d="M12 3c1.5 2 2 3.2 2 4.3A2 2 0 0 1 12 9.3 2 2 0 0 1 10 7.3C10 6.2 10.5 5 12 3z" /></>,
      <><circle cx="8" cy="16" r="4" /><circle cx="16" cy="16" r="4" /><path d="M12 3c1.2 1.7 1.6 2.7 1.6 3.6a1.6 1.6 0 1 1-3.2 0C10.4 5.7 10.8 4.7 12 3z" /></>,
      <><circle cx="12" cy="12" r="2.6" /><path d="M12 9.4c0-2 1.2-3.2 2.4-2.8S15.6 9 13.9 10.1M12 14.6c0 2-1.2 3.2-2.4 2.8S8.4 15 10.1 13.9M9.4 12c-2 0-3.2-1.2-2.8-2.4S9 8.4 10.1 10.1M14.6 12c2 0 3.2 1.2 2.8 2.4S15 15.6 13.9 13.9" /></>,
      <><circle cx="12" cy="13" r="6" /><path d="M9 5h6M12 5V2" /></>,
      <><path d="M4 13a8 8 0 0 1 16 0" /><path d="M4 13v3M8 13v4M12 13v5M16 13v4M20 13v3" /></>,
    ],
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" /><path d="M3 8l9 5 9-5M12 13v8" /></svg>,
    items: [
      <><rect x="3" y="8" width="18" height="11" rx="1.5" /><path d="M3 8l3-4h12l3 4" /><path d="M9 13h.01M15 13h.01M9 16h.01M15 16h.01" /></>,
      <><rect x="5" y="9" width="14" height="9" rx="1.5" /><path d="M8 9V7a4 4 0 0 1 8 0v2" /><path d="M9 13h.01M12 13h.01M15 13h.01" /></>,
      <><rect x="3" y="6" width="18" height="12" rx="2" /><ellipse cx="8" cy="12" rx="2" ry="2.6" /><ellipse cx="16" cy="12" rx="2" ry="2.6" /></>,
    ],
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4L15 12l-3-3 2.7-2.7z" /></svg>,
    items: [
      <><path d="M15 5a3 3 0 1 1-3 3" /><path d="M9 19a3 3 0 1 0 3-3" /><path d="M12 8v8" /></>,
      <><circle cx="7" cy="7" r="3" /><circle cx="17" cy="17" r="3" /><path d="M9.5 9.5l5 5" /></>,
      <><path d="M3 13l7-7 3 3-7 7H3v-3z" /><path d="M13 6l3-3 5 5-3 3" /></>,
      <><path d="M4 20l7-7" /><path d="M13 5l6 6-3 3-6-6 3-3z" /><path d="M9 13l2 2" /></>,
      <><path d="M12 3v13" /><path d="M6 3h12" /><path d="M6 3l1 4M10 3l.5 4M13.5 3l.5 4M18 3l-1 4" /></>,
      <><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2.6" /></>,
    ],
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-5 9 5-9 5-9-5z" /><path d="M3 14l9 5 9-5" /></svg>,
    items: [
      <><path d="M4 15c3-6 13-6 16 0" /><path d="M6 18h12" /><circle cx="9" cy="12" r=".6" fill="currentColor" /><circle cx="12" cy="10.5" r=".6" fill="currentColor" /><circle cx="15" cy="12" r=".6" fill="currentColor" /></>,
      <path d="M5 17l3-9 4 3 3-6 4 12z" />,
      <><path d="M10 3h4v5l4 9a2 2 0 0 1-2 3H8a2 2 0 0 1-2-3l4-9V3z" /><path d="M9 13h6" /></>,
      <><path d="M10 3h4v4l3 8a2 2 0 0 1-2 3H9a2 2 0 0 1-2-3l3-8V3z" /><circle cx="12" cy="14" r="1" fill="currentColor" /><circle cx="10.5" cy="16.5" r=".8" fill="currentColor" /><circle cx="13.5" cy="16.5" r=".8" fill="currentColor" /></>,
    ],
  },
]

type TextPair = { title: string; text: string }
type CatalogueItem = { cat: string; desc: string; items: string[] }
type SetupItem = { title: string; points: string[] }
type StepItem = { title: string; text: string }
type FaqItem = { q: string; a: string }
type StatItem = { n: string; label: string }

export default function Equipment() {
  const { t } = useTranslation()
  const heroChips = t('equipment.hero.chips', { returnObjects: true }) as string[]
  const coreItems = t('equipment.core.items', { returnObjects: true }) as TextPair[]
  const stats = t('equipment.stats', { returnObjects: true }) as StatItem[]
  const categories = t('equipment.catalogue.categories', { returnObjects: true }) as CatalogueItem[]
  const requirementFlow = t('equipment.requirementFlow', { returnObjects: true }) as string[]
  const whoItems = t('equipment.who.items', { returnObjects: true }) as TextPair[]
  const setupItems = t('equipment.setups.items', { returnObjects: true }) as SetupItem[]
  const steps = t('equipment.how.steps', { returnObjects: true }) as StepItem[]
  const faqItems = t('equipment.faq.items', { returnObjects: true }) as FaqItem[]

  return (
    <MotionConfig reducedMotion="user">
      <PageHero eyebrow={t('equipment.hero.eyebrow')} title={<>{t('equipment.hero.titlePre')}<span>{t('equipment.hero.titleSpan')}</span></>}>
        <p>{t('equipment.hero.text')}</p>
        <div className="chips" style={{ justifyContent: 'center', marginTop: 22 }}>
          {heroChips.map((c) => <span key={c} className="pill">{c}</span>)}
        </div>
      </PageHero>

      {/* CORE SYSTEMS */}
      <section>
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('equipment.core.eyebrow')}</span>
            <h2>{t('equipment.core.heading')}</h2>
            <p>{t('equipment.core.text')}</p>
          </MReveal>
          <MStagger className="features features-5">
            {coreItems.map((c, i) => (
              <MItem key={c.title} className="feature">
                <div className="ic">{EQUIPMENT_ICONS[i]}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </MItem>
            ))}
          </MStagger>
          <MStagger className="stats-band" gap={0.1} amount={0.3}>
            {stats.map((s) => (
              <MItem key={s.label} variants={pop}>
                <CountUp value={s.n} />
                <small>{s.label}</small>
              </MItem>
            ))}
          </MStagger>
        </div>
      </section>

      {/* FULL CATALOGUE */}
      <section className="alt">
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('equipment.catalogue.eyebrow')}</span>
            <h2>{t('equipment.catalogue.heading')}</h2>
            <p>{t('equipment.catalogue.text')}</p>
          </MReveal>
          <MStagger className="cat-grid" gap={0.1}>
            {categories.map((c, ci) => (
              <MItem key={c.cat} className="panel cat-panel">
                <div className="cat-head">
                  <div className="ic-sm">{CATALOGUE_META[ci].icon}</div>
                  <h3>{c.cat}</h3>
                  <span className="cat-count">{t('equipment.catalogue.itemsCount', { count: c.items.length })}</span>
                </div>
                <p>{c.desc}</p>
                <div className="item-grid">
                  {c.items.map((name, ii) => (
                    <div key={name} className="item-card">
                      <div className="ic-xs">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          {CATALOGUE_META[ci].items[ii]}
                        </svg>
                      </div>
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </MItem>
            ))}
          </MStagger>
          <MReveal className="chain wrap-chain" style={{ marginTop: 56 }}>
            {requirementFlow.map((s, i) => (
              <span key={s} className="chain-item">
                <span>{s}</span>
                {i < requirementFlow.length - 1 && <span className="ar">→</span>}
              </span>
            ))}
          </MReveal>
        </div>
      </section>

      {/* WHO WE EQUIP */}
      <section>
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('equipment.who.eyebrow')}</span>
            <h2>{t('equipment.who.heading')}</h2>
            <p>{t('equipment.who.text')}</p>
          </MReveal>
          <MStagger className="features features-4">
            {whoItems.map((w, i) => (
              <MItem key={w.title} className="step">
                <div className="num">0{i + 1}</div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </MItem>
            ))}
          </MStagger>
        </div>
      </section>

      {/* SETUPS BY MODEL */}
      <section className="alt">
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('equipment.setups.eyebrow')}</span>
            <h2>{t('equipment.setups.heading')}</h2>
            <p>{t('equipment.setups.text')}</p>
          </MReveal>
          <MStagger className="cards-2" gap={0.15}>
            {setupItems.map((s) => (
              <MItem key={s.title} className="panel">
                <h3>{s.title}</h3>
                <ul className="story-list">
                  {s.points.map((p) => (
                    <li key={p}><span className="chk">✓</span> {p}</li>
                  ))}
                </ul>
                <Link to="/contract-farming" className="panel-link">{t('equipment.setups.link')}</Link>
              </MItem>
            ))}
          </MStagger>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('equipment.how.eyebrow')}</span>
            <h2>{t('equipment.how.heading')}</h2>
            <p>{t('equipment.how.text')}</p>
          </MReveal>
          <MStagger className="steps steps-5">
            {steps.map((s, i) => (
              <MItem key={s.title} className="step">
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </MItem>
            ))}
          </MStagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="alt">
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('equipment.faq.eyebrow')}</span>
            <h2>{t('equipment.faq.heading')}</h2>
          </MReveal>
          <MReveal className="faq">
            {faqItems.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </MReveal>
          <MiniCta
            title={t('equipment.cta.title')}
            text={t('equipment.cta.text')}
            cta={t('equipment.cta.cta')}
            source="Equipment Enquiry"
          />
        </div>
      </section>
    </MotionConfig>
  )
}
