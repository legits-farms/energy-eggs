import { useTranslation } from 'react-i18next'
import { LocaleLink as Link } from '../components/LocaleLink'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'

// Static per-item routes (not translatable) — merged by index with the
// translated tag/title/text/cta arrays from i18n at render time.
const ECOSYSTEM_LINKS = ['/birds', '/equipment', '/contract-farming']

type TextPair = { title: string; text: string }
type StepItem = { title: string; text: string }
type EcosystemItem = { tag: string; title: string; text: string; cta: string }
type FaqItem = { q: string; a: string }

export default function Feed() {
  const { t } = useTranslation()
  const products = t('feed.products.items', { returnObjects: true }) as TextPair[]
  const stages = t('feed.stages', { returnObjects: true }) as string[]
  const approach = t('feed.approach.items', { returnObjects: true }) as TextPair[]
  const steps = t('feed.supply.steps', { returnObjects: true }) as StepItem[]
  const buyers = t('feed.supply.buyers', { returnObjects: true }) as string[]
  const ecosystemItems = t('feed.ecosystem.items', { returnObjects: true }) as EcosystemItem[]
  const faqItems = t('feed.faq.items', { returnObjects: true }) as FaqItem[]

  return (
    <>
      <PageHero eyebrow={t('feed.hero.eyebrow')} title={<>{t('feed.hero.titlePre')}<span>{t('feed.hero.titleSpan')}</span></>}>
        <p>{t('feed.hero.text')}</p>
      </PageHero>

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('feed.products.eyebrow')}</span>
            <h2>{t('feed.products.heading')}</h2>
            <p>{t('feed.products.text')}</p>
          </Reveal>
          <div className="features features-5">
            {products.map((p) => (
              <Reveal key={p.title} className="feature">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="chain wrap-chain" style={{ marginTop: 56 }}>
            {stages.map((s, i) => (
              <span key={s} className="chain-item">
                <span>{s}</span>
                {i < stages.length - 1 && <span className="ar">→</span>}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('feed.approach.eyebrow')}</span>
            <h2>{t('feed.approach.heading')}</h2>
          </Reveal>
          <div className="features features-4">
            {approach.map((a) => (
              <Reveal key={a.title} className="feature">
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('feed.supply.eyebrow')}</span>
            <h2>{t('feed.supply.heading')}</h2>
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
          <Reveal className="chip-row">
            <h4>{t('feed.supply.buyersHeading')}</h4>
            <div className="chips">
              {buyers.map((b) => <span key={b} className="pill">{b}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('feed.ecosystem.eyebrow')}</span>
            <h2>{t('feed.ecosystem.heading')}</h2>
            <p>{t('feed.ecosystem.text')}</p>
          </Reveal>
          <div className="cards-3">
            {ecosystemItems.map((e, i) => (
              <Reveal key={e.title} className="in">
                <Link to={ECOSYSTEM_LINKS[i]} className="breed-card path-card">
                  <span className="eyebrow">{e.tag}</span>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                  <span className="panel-link">{e.cta}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('feed.faq.eyebrow')}</span>
            <h2>{t('feed.faq.heading')}</h2>
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
            title={t('feed.cta.title')}
            text={t('feed.cta.text')}
            cta={t('feed.cta.cta')}
            source="Feed Enquiry"
          />
        </div>
      </section>
    </>
  )
}
