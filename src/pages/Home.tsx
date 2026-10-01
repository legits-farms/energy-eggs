import type { CSSProperties, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { CountUp, MItem, MReveal, MStagger, pop } from '../components/Motion'
import SprintingHen from '../components/SprintingHen'
import EnquiryButton from '../components/EnquiryButton'
import CallButton from '../components/CallButton'
import { LocaleLink } from '../components/LocaleLink'
import sonaliImg from '../assets/sonali.webp'
import aseelImg from '../assets/aseel.webp'
import kadaknathImg from '../assets/kadaknath.webp'
import fiyoumiImg from '../assets/fiyoumi.webp'

// Breed names are proper nouns — same in every language.
const BREEDS: [name: string, img: string][] = [
  ['Sonali', sonaliImg],
  ['Aseel', aseelImg],
  ['Kadaknath', kadaknathImg],
  ['Fiyoumi', fiyoumiImg],
]

// Static per-item metadata (route + icon aren't translatable) — merged by
// index with the translated title/text arrays from i18n at render time.
const PATH_LINKS = ['/b2b-supply', '/contract-farming', '/farm-development', '/contract-farming#lease-your-farm']

const WHAT_WE_DO_META: { to: string; icon: ReactNode }[] = [
  {
    to: '/birds',
    icon: (
      <>
        <circle cx="12" cy="9" r="5" />
        <path d="M7 20c1-4 3-6 5-6s4 2 5 6" />
        <path d="M15 7l4-2-2 4" />
      </>
    ),
  },
  {
    to: '/eggs',
    icon: <path d="M12 2C7 7 6 11 6 14a6 6 0 0012 0c0-3-1-7-6-12z" />,
  },
  {
    to: '/equipment',
    icon: (
      <>
        <path d="M4 21V10l8-6 8 6v11" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
  },
  {
    to: '/farm-development',
    icon: (
      <>
        <path d="M3 21h18" />
        <path d="M5 21V8l7-5 7 5v13" />
        <path d="M9 12h6" />
      </>
    ),
  },
  {
    to: '/contract-farming',
    icon: (
      <>
        <path d="M8 12l3 3 5-6" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
  },
]

type TextPair = { title: string; text: string }
type PathItem = { tag: string; title: string; text: string; cta: string }
type StatItem = { n: string; label: string }
type WhyItem = { title: string; text: string }

export default function Home() {
  const { t } = useTranslation()
  const badges = t('home.badges', { returnObjects: true }) as string[]
  const marquee = t('home.marquee', { returnObjects: true }) as string[]
  const whatWeDoItems = t('home.whatWeDo.items', { returnObjects: true }) as TextPair[]
  const stats = t('home.stats', { returnObjects: true }) as StatItem[]
  const ecosystemItems = t('home.ecosystem.items', { returnObjects: true }) as TextPair[]
  const pathItems = t('home.paths.items', { returnObjects: true }) as PathItem[]
  const whyItems = t('home.why.items', { returnObjects: true }) as WhyItem[]
  const brandValues = t('home.brandPromise.values', { returnObjects: true }) as string[]

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            {/* CSS entrance — runs on first paint, no JS needed, so it never delays LCP */}
            <div className="hero-in">
              <div className="badges" style={{ '--i': 0 } as CSSProperties}>
                {badges.map((b) => <span key={b} className="pill">{b}</span>)}
              </div>
              <span
                className="script"
                style={{ fontSize: '1.3rem', display: 'inline-block', '--i': 1 } as CSSProperties}
              >
                {t('home.scriptLine')}
              </span>
              <h1 style={{ '--i': 2 } as CSSProperties}>
                {t('home.heroTitleLine1')}
                <br />
                {t('home.heroTitleBusinessPre')}<span>{t('home.heroTitleBusinessSpan')}</span>
              </h1>
              <p className="tag" style={{ '--i': 3 } as CSSProperties}>
                {t('home.heroTag')}
              </p>
              <div className="hero-cta" style={{ '--i': 4 } as CSSProperties}>
                <LocaleLink to="/rate-card" className="btn">{t('home.ctaPricing')}</LocaleLink>
                <LocaleLink to="/contract-farming" className="btn ghost">{t('home.ctaFarmerPartner')}</LocaleLink>
              </div>
              <div className="hero-stats" style={{ '--i': 5 } as CSSProperties}>
                <div><span className="n">{t('home.statBreedsN')}</span><small>{t('home.statBreedsSub')}</small></div>
                <div><span className="n">{t('home.statModelsN')}</span><small>{t('home.statModelsSub')}</small></div>
                <div><span className="n">{t('home.statEndToEndN')}</span><small>{t('home.statEndToEndSub')}</small></div>
              </div>
            </div>
            <div className="hero-art hero-art-in">
              <SprintingHen />
              <div className="float-badge fb-1"><span className="dot">⚡</span> {t('home.floatBadge1')}</div>
              <div className="float-badge fb-2"><span className="dot">🤝</span> {t('home.floatBadge2')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              {marquee.map((m) => <span key={m}>{m}</span>)}
            </span>
          ))}
        </div>
      </div>

      {/* WHAT WE DO */}
      <section>
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('home.whatWeDo.eyebrow')}</span>
            <h2>{t('home.whatWeDo.heading')}</h2>
            <p>{t('home.whatWeDo.text')}</p>
          </MReveal>
          <MStagger className="features features-5">
            {WHAT_WE_DO_META.map((m, i) => (
              <MItem key={m.to} className="feature feature-link">
                <LocaleLink to={m.to}>
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      {m.icon}
                    </svg>
                  </div>
                  <h3>{whatWeDoItems[i].title}</h3>
                  <p>{whatWeDoItems[i].text}</p>
                  <span className="feature-more">{t('home.whatWeDo.explore')}</span>
                </LocaleLink>
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

      {/* ECOSYSTEM */}
      <section className="alt">
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('home.ecosystem.eyebrow')}</span>
            <h2>{t('home.ecosystem.heading')}</h2>
            <p>{t('home.ecosystem.text')}</p>
          </MReveal>
          <MStagger className="eco-grid">
            {ecosystemItems.map((e, i) => (
              <MItem key={e.title} className="eco-card">
                <span className="eco-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </MItem>
            ))}
          </MStagger>
        </div>
      </section>

      {/* BREED SHOWCASE */}
      <section>
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('home.breedsSection.eyebrow')}</span>
            <h2>{t('home.breedsSection.headingPre')}<span className="script">{t('home.breedsSection.headingScript')}</span></h2>
            <p>{t('home.breedsSection.text')}</p>
          </MReveal>
          <MStagger className="breed-minis">
            {BREEDS.map(([name, img]) => (
              <MItem key={name} variants={pop}>
                <LocaleLink to="/birds" className="breed-mini">
                  <div className="bm-img"><img src={img} alt={`${name} bird`} loading="lazy" /></div>
                  <h3>{name}</h3>
                </LocaleLink>
              </MItem>
            ))}
          </MStagger>
          <MReveal className="chip-row" delay={0.15}>
            <LocaleLink to="/rate-card" className="btn">{t('home.breedsSection.cta')}</LocaleLink>
          </MReveal>
        </div>
      </section>

      {/* CHOOSE YOUR PATH */}
      <section className="alt">
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('home.paths.eyebrow')}</span>
            <h2>{t('home.paths.heading')}</h2>
            <p>{t('home.paths.text')}</p>
          </MReveal>
          <MStagger className="cards-4" gap={0.12}>
            {pathItems.map((p, i) => (
              <MItem key={p.title}>
                <LocaleLink to={PATH_LINKS[i]} className="breed-card path-card">
                  <span className="eyebrow">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <span className="panel-link">{p.cta}</span>
                </LocaleLink>
              </MItem>
            ))}
          </MStagger>
        </div>
      </section>

      {/* WHY ENERGY EGGS */}
      <section className="values">
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow" style={{ color: 'var(--orange-light)' }}>{t('home.why.eyebrow')}</span>
            <h2>{t('home.why.heading')}</h2>
          </MReveal>
          <MStagger className="vgrid vgrid-3">
            {whyItems.map((w, i) => (
              <MItem key={w.title} className="value">
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </MItem>
            ))}
          </MStagger>
        </div>
      </section>

      {/* BRAND PROMISE */}
      <section className="alt brand-strip">
        <div className="wrap">
          <MReveal className="about-copy">
            <span className="script" style={{ fontSize: '1.5rem' }}>{t('home.brandPromise.script')}</span>
            <p>{t('home.brandPromise.text')}</p>
            <div className="chips" style={{ justifyContent: 'center' }}>
              {brandValues.map((v) => <span key={v} className="pill">{v}</span>)}
            </div>
            <p><LocaleLink to="/about" className="panel-link">{t('home.brandPromise.readStory')}</LocaleLink></p>
          </MReveal>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="closing" style={{ paddingTop: 90 }}>
        <div className="wrap">
          <MReveal className="cta-band">
            <span className="script" style={{ color: '#fff', fontSize: '1.3rem' }}>
              {t('home.closing.script')}
            </span>
            <h2>{t('home.closing.heading')}</h2>
            <p>{t('home.closing.text')}</p>
            <div className="hero-cta" style={{ justifyContent: 'center' }}>
              <LocaleLink to="/rate-card" className="btn">{t('home.ctaPricing')}</LocaleLink>
              <EnquiryButton className="btn ghost light" source="Become a Farmer Partner">{t('home.closing.becomeFarmerPartner')}</EnquiryButton>
              <CallButton className="btn ghost light call-btn" />
            </div>
          </MReveal>
        </div>
      </section>
    </>
  )
}
