import { useTranslation } from 'react-i18next'
import { LocaleLink as Link } from '../components/LocaleLink'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'
import VolumeCommitment from '../components/VolumeCommitment'
import slideEggs from '../assets/slide-eggs.jpg'
import slideBirds from '../assets/slide-birds.jpg'
import slideFeed from '../assets/slide-feed.jpg'
import slideEquipment from '../assets/slide-equipment.jpg'
import slideFarm from '../assets/slide-farm.jpg'

const HERO_SLIDES = [
  { src: slideEggs, pos: 'center 58%' },
  { src: slideBirds, pos: 'center 40%' },
  { src: slideFeed, pos: 'center 55%' },
  { src: slideEquipment, pos: 'center 60%' },
  { src: slideFarm, pos: 'center 55%' },
]

// Static per-item routes (not translatable) — merged by index with the
// translated title/text arrays from i18n at render time.
const SUPPLY_LINKS = ['/birds', '/eggs', '/feed', '/equipment', '/farm-development']

type TextPair = { title: string; text: string }
type StepItem = { title: string; text: string }
type EngagementItem = { tag: string; title: string; text: string }
type FaqItem = { q: string; a: string }

export default function B2BSupply() {
  const { t } = useTranslation()
  const serveItems = t('b2bSupply.serve.items', { returnObjects: true }) as TextPair[]
  const supplyItems = t('b2bSupply.supplyRange.items', { returnObjects: true }) as TextPair[]
  const steps = t('b2bSupply.how.steps', { returnObjects: true }) as StepItem[]
  const engagementItems = t('b2bSupply.engagement.items', { returnObjects: true }) as EngagementItem[]
  const birdsItems = t('b2bSupply.rateSnapshot.birdsItems', { returnObjects: true }) as string[]
  const eggsItems = t('b2bSupply.rateSnapshot.eggsItems', { returnObjects: true }) as string[]
  const whyPartner = t('b2bSupply.whyPartner.items', { returnObjects: true }) as TextPair[]
  const qualityItems = t('b2bSupply.quality.items', { returnObjects: true }) as TextPair[]
  const faqItems = t('b2bSupply.faq.items', { returnObjects: true }) as FaqItem[]

  return (
    <>
      <PageHero eyebrow={t('b2bSupply.hero.eyebrow')} title={<>{t('b2bSupply.hero.titlePre')}<span>{t('b2bSupply.hero.titleSpan')}</span></>} slides={HERO_SLIDES}>
        <p>{t('b2bSupply.hero.text')}</p>
      </PageHero>

      {/* WHO WE SERVE */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('b2bSupply.serve.eyebrow')}</span>
            <h2>{t('b2bSupply.serve.heading')}</h2>
          </Reveal>
          <div className="features features-4">
            {serveItems.map((s) => (
              <Reveal key={s.title} className="feature">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE SUPPLY */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('b2bSupply.supplyRange.eyebrow')}</span>
            <h2>{t('b2bSupply.supplyRange.heading')}</h2>
            <p>{t('b2bSupply.supplyRange.text')}</p>
          </Reveal>
          <div className="features features-5">
            {supplyItems.map((s, i) => (
              <Reveal key={s.title} className="feature feature-link">
                <Link to={SUPPLY_LINKS[i]}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="feature-more">{t('b2bSupply.supplyRange.explore')}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('b2bSupply.how.eyebrow')}</span>
            <h2>{t('b2bSupply.how.heading')}</h2>
          </Reveal>
          <div className="steps steps-5">
            {steps.map((s, i) => (
              <Reveal key={s.title} className="step">
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
          <MiniCta center cta={t('b2bSupply.how.ctaLabel')} source="B2B Supply" />
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('b2bSupply.engagement.eyebrow')}</span>
            <h2>{t('b2bSupply.engagement.heading')}</h2>
            <p>{t('b2bSupply.engagement.text')}</p>
          </Reveal>
          <div className="cards-3">
            {engagementItems.map((e) => (
              <Reveal key={e.title} className="breed-card">
                <span className="eyebrow">{e.tag}</span>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRIORITY SUPPLY & VOLUME COMMITMENT */}
      <VolumeCommitment />

      {/* RATE SNAPSHOT */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('b2bSupply.rateSnapshot.eyebrow')}</span>
            <h2>{t('b2bSupply.rateSnapshot.heading')}</h2>
            <p>{t('b2bSupply.rateSnapshot.text')}</p>
          </Reveal>
          <div className="cards-2">
            <Reveal className="panel">
              <h3>{t('b2bSupply.rateSnapshot.birdsTitle')}</h3>
              <ul className="story-list">
                {birdsItems.map((b) => <li key={b}><span className="chk">✓</span> {b}</li>)}
              </ul>
              <Link to="/birds" className="panel-link">{t('b2bSupply.rateSnapshot.birdsLink')}</Link>
            </Reveal>
            <Reveal className="panel">
              <h3>{t('b2bSupply.rateSnapshot.eggsTitle')}</h3>
              <ul className="story-list">
                {eggsItems.map((e) => <li key={e}><span className="chk">✓</span> {e}</li>)}
              </ul>
              <Link to="/eggs" className="panel-link">{t('b2bSupply.rateSnapshot.eggsLink')}</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="values">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('b2bSupply.whyPartner.eyebrow')}</span>
            <h2>{t('b2bSupply.whyPartner.heading')}</h2>
          </Reveal>
          <div className="vgrid">
            {whyPartner.map((w, i) => (
              <Reveal key={w.title} className="value">
                <div className="num">0{i + 1}</div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('b2bSupply.quality.eyebrow')}</span>
            <h2>{t('b2bSupply.quality.heading')}</h2>
            <p>{t('b2bSupply.quality.text')}</p>
          </Reveal>
          <div className="features features-5">
            {qualityItems.map((q) => (
              <Reveal key={q.title} className="feature">
                <h3>{q.title}</h3>
                <p>{q.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('b2bSupply.faq.eyebrow')}</span>
            <h2>{t('b2bSupply.faq.heading')}</h2>
          </Reveal>
          <Reveal className="faq">
            {faqItems.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </Reveal>
          <MiniCta
            title={t('b2bSupply.finalCta.title')}
            text={t('b2bSupply.finalCta.text')}
            cta={t('b2bSupply.finalCta.cta')}
            source="B2B Supply"
          />
        </div>
      </section>
    </>
  )
}
