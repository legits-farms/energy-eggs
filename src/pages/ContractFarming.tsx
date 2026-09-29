import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'
import LockGate from '../components/LockGate'
import pastureFarmImg from '../assets/pasture-farm.jpeg'
import deepLitterImg from '../assets/deep-litter-farm.png'
import contractHeroImg from '../assets/contract-hero.jpg'

// Static per-model ids/images (not translatable) — merged by index with the
// translated model content from i18n at render time.
const MODEL_IDS = ['pasture-raised', 'deep-litter']
const MODEL_IMAGE_SRC = [pastureFarmImg, deepLitterImg]

type TextPair = { title: string; text: string }
type CompareRow = { param: string; pasture: string; deepLitter: string }
type SpecRow = { param: string; detail: string }
type Model = { label: string; name: string; tag: string; specs: SpecRow[]; farmer: string[]; support: string[] }
type FaqItem = { q: string; a: string }

export default function ContractFarming() {
  const { t } = useTranslation()
  const benefits = t('contractFarming.why.benefits', { returnObjects: true }) as TextPair[]
  const compareRows = t('contractFarming.compareTable.rows', { returnObjects: true }) as CompareRow[]
  const models = t('contractFarming.models', { returnObjects: true }) as Model[]
  const modelImageAlts = t('contractFarming.modelImageAlts', { returnObjects: true }) as string[]
  const termsItems = t('contractFarming.terms.items', { returnObjects: true }) as string[]
  const journeyItems = t('contractFarming.journey.items', { returnObjects: true }) as TextPair[]
  const partnerFlow = t('contractFarming.farmerPartners.flow', { returnObjects: true }) as string[]
  const faqItems = t('contractFarming.faq.items', { returnObjects: true }) as FaqItem[]

  return (
    <>
      <PageHero eyebrow={t('contractFarming.hero.eyebrow')} title={<>{t('contractFarming.hero.titlePre')}<span>{t('contractFarming.hero.titleSpan')}</span></>} bg={contractHeroImg} bgPosition="center 45%">
        <p>{t('contractFarming.hero.text')}</p>
      </PageHero>

      {/* WHY CONTRACT FARMING */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('contractFarming.why.eyebrow')}</span>
            <h2>{t('contractFarming.why.headingPre')}<span className="script">{t('contractFarming.why.headingScript')}</span></h2>
            <p>{t('contractFarming.why.text')}</p>
          </Reveal>
          <div className="features features-3">
            {benefits.map((b) => (
              <Reveal key={b.title} className="feature">
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('contractFarming.modelsSection.eyebrow')}</span>
            <h2>{t('contractFarming.modelsSection.heading')}</h2>
            <p>{t('contractFarming.modelsSection.text')}</p>
          </Reveal>

          <Reveal className="model compare-model">
            <div className="model-top">
              <h3>{t('contractFarming.compareTable.heading')}</h3>
              <p>{t('contractFarming.compareTable.text')}</p>
            </div>
            <div className="rate-table-wrap">
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>{t('contractFarming.compareTable.paramHeader')}</th>
                    <th>{t('contractFarming.compareTable.pastureHeader')}</th>
                    <th>{t('contractFarming.compareTable.deepLitterHeader')}</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((r) => (
                    <tr key={r.param}>
                      <td>{r.param}</td>
                      <td>{r.pasture}</td>
                      <td>{r.deepLitter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {models.map((m, i) => (
            <div key={m.label} id={MODEL_IDS[i]} className="model-block">
              <Reveal className="model-title">
                <h2><span className="mn">{i + 1}.</span> {m.label}</h2>
              </Reveal>
              <Reveal>
                <a className="farm-visual" href={MODEL_IMAGE_SRC[i]} target="_blank" rel="noreferrer" title="Open full-size layout">
                  <img src={MODEL_IMAGE_SRC[i]} alt={modelImageAlts[i]} loading="lazy" />
                </a>
              </Reveal>
              <Reveal className="model">
              <div className="model-top">
                <h3>{m.name}</h3>
                <p>{m.tag}</p>
              </div>
              <LockGate
                storageKey="ee-contract-unlocked"
                source="Contract Farming"
                interest={`${m.label} Contract Model`}
                heading={t('contractFarming.lockGate.heading')}
                text={t('contractFarming.lockGate.text')}
              >
              <table className="spec-table">
                <thead>
                  <tr>
                    <th scope="col">{t('contractFarming.specTable.parameter')}</th>
                    <th scope="col">{t('contractFarming.specTable.details')}</th>
                  </tr>
                </thead>
                <tbody>
                  {m.specs.map((s) => (
                    <tr key={s.param}>
                      <td>{s.param}</td>
                      <td>{s.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="model-grid">
                <div>
                  <h4>{t('contractFarming.farmerResponsibilities')}</h4>
                  <ul className="story-list">
                    {m.farmer.map((p) => (
                      <li key={p}><span className="chk">✓</span> {p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>{t('contractFarming.eeSupport')}</h4>
                  <ul className="story-list">
                    {m.support.map((p) => (
                      <li key={p}><span className="chk">✓</span> {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
              </LockGate>
              </Reveal>
            </div>
          ))}

          <Reveal className="terms">
            <h4>{t('contractFarming.terms.heading')}</h4>
            <ul>
              {termsItems.map((term) => <li key={term}>{term}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* PARTNERSHIP JOURNEY */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('contractFarming.journey.eyebrow')}</span>
            <h2>{t('contractFarming.journey.heading')}</h2>
          </Reveal>
          <div className="steps">
            {journeyItems.map((j, i) => (
              <Reveal key={j.title} className="step">
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="farmer-partners">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('contractFarming.farmerPartners.eyebrow')}</span>
            <h2>{t('contractFarming.farmerPartners.heading')}</h2>
            <p>{t('contractFarming.farmerPartners.text')}</p>
          </Reveal>
          <Reveal className="chain wrap-chain">
            {partnerFlow.map((s, i) => (
              <span key={s} className="chain-item">
                <span>{s}</span>
                {i < partnerFlow.length - 1 && <span className="ar">→</span>}
              </span>
            ))}
          </Reveal>
          <MiniCta
            title={t('contractFarming.farmerPartners.cta.title')}
            text={t('contractFarming.farmerPartners.cta.text')}
            cta={t('contractFarming.farmerPartners.cta.cta')}
            source="Farmer Partnership"
          />
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('contractFarming.faq.eyebrow')}</span>
            <h2>{t('contractFarming.faq.heading')}</h2>
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
            title={t('contractFarming.finalCta.title')}
            text={t('contractFarming.finalCta.text')}
            cta={t('contractFarming.finalCta.cta')}
            source="Farmer Partnership"
          />
        </div>
      </section>
    </>
  )
}
