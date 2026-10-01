import { useTranslation } from 'react-i18next'
import { LocaleLink as Link } from '../components/LocaleLink'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'
import EnquiryButton from '../components/EnquiryButton'
import pastureFarmImg from '../assets/pasture-farm.webp'
import deepLitterImg from '../assets/deep-litter-farm.webp'

// Images are static (not translatable) — merged by index with the
// translated title/points/alt arrays from i18n at render time.
const REFERENCE_IMAGES = [pastureFarmImg, deepLitterImg]

type StepItem = { title: string; text: string }
type ReferenceFarm = { title: string; points: string[]; alt: string }
type FaqItem = { q: string; a: string }

export default function FarmDevelopment() {
  const { t } = useTranslation()
  const steps = t('farmDevelopment.steps.items', { returnObjects: true }) as StepItem[]
  const deliverables = t('farmDevelopment.deliverables.items', { returnObjects: true }) as StepItem[]
  const referenceFarms = t('farmDevelopment.reference.farms', { returnObjects: true }) as ReferenceFarm[]
  const pasturePoints = t('farmDevelopment.pasture.points', { returnObjects: true }) as string[]
  const whyBuild = t('farmDevelopment.whyBuild.items', { returnObjects: true }) as StepItem[]
  const faqItems = t('farmDevelopment.faq.items', { returnObjects: true }) as FaqItem[]

  return (
    <>
      <PageHero eyebrow={t('farmDevelopment.hero.eyebrow')} title={<>{t('farmDevelopment.hero.titlePre')}<span>{t('farmDevelopment.hero.titleSpan')}</span></>}>
        <p>{t('farmDevelopment.hero.text')}</p>
      </PageHero>

      {/* FARM DEVELOPMENT STEPS */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('farmDevelopment.steps.eyebrow')}</span>
            <h2>{t('farmDevelopment.steps.heading')}</h2>
          </Reveal>
          <div className="steps">
            {steps.map((s, i) => (
              <Reveal key={s.title} className="step">
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
          <MiniCta center title={t('farmDevelopment.miniCta1.title')} cta={t('farmDevelopment.miniCta1.cta')} source="Farm Development" />
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('farmDevelopment.deliverables.eyebrow')}</span>
            <h2>{t('farmDevelopment.deliverables.heading')}</h2>
          </Reveal>
          <div className="features features-3">
            {deliverables.map((d) => (
              <Reveal key={d.title} className="feature">
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REFERENCE FARMS */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('farmDevelopment.reference.eyebrow')}</span>
            <h2>{t('farmDevelopment.reference.heading')}</h2>
            <p>{t('farmDevelopment.reference.text')}</p>
          </Reveal>
          <div className="cards-2">
            {referenceFarms.map((f, i) => (
              <Reveal key={f.title} className="panel">
                <a className="farm-visual" href={REFERENCE_IMAGES[i]} target="_blank" rel="noreferrer" title="Open full-size layout">
                  <img src={REFERENCE_IMAGES[i]} alt={f.alt} loading="lazy" />
                </a>
                <h3>{f.title}</h3>
                <ul className="story-list">
                  {f.points.map((p) => (
                    <li key={p}><span className="chk">✓</span> {p}</li>
                  ))}
                </ul>
                <Link to="/contract-farming" className="panel-link">{t('farmDevelopment.reference.link')}</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PASTURE-BASED */}
      <section className="alt">
        <div className="wrap">
          <div className="split">
            <Reveal className="story-art">
              <svg className="barn" viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M20 70L100 30l80 40v70H20z" />
                <path d="M75 140v-45h50v45" />
                <path d="M20 70h160M100 30v-14" />
                <path d="M30 150h140" strokeWidth={4} />
              </svg>
            </Reveal>
            <Reveal>
              <span className="eyebrow">{t('farmDevelopment.pasture.eyebrow')}</span>
              <h2>{t('farmDevelopment.pasture.heading')}</h2>
              <p style={{ color: 'var(--brown-soft)', marginTop: 14 }}>{t('farmDevelopment.pasture.text')}</p>
              <ul className="story-list cols-2">
                {pasturePoints.map((p) => (
                  <li key={p}><span className="chk">✓</span> {p}</li>
                ))}
              </ul>
              <span style={{ marginTop: 30, display: 'inline-block' }}>
                <EnquiryButton className="btn" source="Enquire About Pasture Farming">{t('farmDevelopment.pasture.enquireBtn')}</EnquiryButton>
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY BUILD WITH US */}
      <section className="values">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow" style={{ color: 'var(--orange-light)' }}>{t('farmDevelopment.whyBuild.eyebrow')}</span>
            <h2>{t('farmDevelopment.whyBuild.heading')}</h2>
          </Reveal>
          <div className="vgrid">
            {whyBuild.map((w, i) => (
              <Reveal key={w.title} className="value">
                <div className="num">0{i + 1}</div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('farmDevelopment.faq.eyebrow')}</span>
            <h2>{t('farmDevelopment.faq.heading')}</h2>
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
            title={t('farmDevelopment.cta.title')}
            text={t('farmDevelopment.cta.text')}
            cta={t('farmDevelopment.cta.cta')}
            source="Farm Development"
          />
        </div>
      </section>
    </>
  )
}
