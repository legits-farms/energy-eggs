import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'
import RateActions from '../components/RateActions'
import LockGate from '../components/LockGate'
import { EGG_RATES, PROCESSING_CHARGES } from '../data/rates'

const EGG_ICONS = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19C5 9 12 4 20 4c0 8-5 15-15 15z" /><path d="M5 19c3-6 7-9 11-11" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="12" height="9" rx="1.5" /><path d="M14 10h4l4 3.5V16h-8" /><circle cx="7" cy="18.5" r="1.7" /><circle cx="17.5" cy="18.5" r="1.7" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3 19c0-3.2 2.8-5 6-5s6 1.8 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M17.5 14c2.2.4 3.5 2 3.5 4.5" /></svg>,
]

type TextPair = { title: string; text: string }
type ProcessingItem = { service: string; note: string }

export default function Eggs() {
  const { t } = useTranslation()
  const categoryItems = t('eggs.categories.items', { returnObjects: true }) as TextPair[]
  const programmes = t('eggs.categories.programmes', { returnObjects: true }) as string[]
  const processingItems = t('eggs.rateCard.processingItems', { returnObjects: true }) as ProcessingItem[]
  const chips = t('eggs.rateCard.chips', { returnObjects: true }) as string[]
  const whyItems = t('eggs.why.items', { returnObjects: true }) as TextPair[]

  return (
    <>
      <PageHero eyebrow={t('eggs.hero.eyebrow')} title={<>{t('eggs.hero.titlePre')}<span>{t('eggs.hero.titleSpan')}</span></>}>
        <p>{t('eggs.hero.text')}</p>
      </PageHero>

      <RateActions title={t('eggs.rateCardTitle')} />

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('eggs.categories.eyebrow')}</span>
            <h2>{t('eggs.categories.heading')}</h2>
          </Reveal>
          <div className="cards-3">
            {categoryItems.map((c) => (
              <Reveal key={c.title} className="breed-card egg-card">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="chip-row">
            <h4>{t('eggs.categories.bulkHeading')}</h4>
            <div className="chips">
              {programmes.map((p) => <span key={p} className="pill">{p}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('eggs.rateCard.eyebrow')}</span>
            <h2>{t('eggs.rateCard.heading')}</h2>
            <p>
              <span className="script">{t('eggs.rateCard.scriptText')}</span>{t('eggs.rateCard.restText')}
            </p>
          </Reveal>

          <LockGate
            storageKey="ee-rates-unlocked"
            source="Rate Card Download"
            interest="Rate Card"
            heading={t('rateCardPage.locked.heading')}
            text={t('rateCardPage.locked.text')}
          >
          <div className="tier-list">
            {EGG_RATES.map(([commitment, a, ab, b, c]) => {
              const custom = commitment.includes('+')
              return (
                <Reveal key={commitment} className={`tier${custom ? ' custom' : ''}`}>
                  <div className="tier-range">
                    <small>{t('eggs.rateCard.monthlyCommitment')}</small>
                    <strong>{commitment}</strong>
                    <span>{t('eggs.rateCard.eggsPerMonth')}</span>
                  </div>
                  <div className="tier-prices">
                    <div className="tp"><small>{t('eggs.rateCard.aGrade')}</small><b>{a}</b></div>
                    <div className="tp"><small>{t('eggs.rateCard.abGrade')}</small><b>{ab}</b></div>
                    <div className="tp"><small>{t('eggs.rateCard.bGrade')}</small><b>{b}</b></div>
                    <div className="tp"><small>{t('eggs.rateCard.cGrade')}</small><b>{c}</b></div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="sub-head">
            <span className="eyebrow">{t('eggs.rateCard.addonEyebrow')}</span>
            <h3>{t('eggs.rateCard.addonHeading')}</h3>
          </Reveal>
          <div className="addon-grid">
            {PROCESSING_CHARGES.map(([, charge], i) => (
              <Reveal key={processingItems[i].service} className="addon">
                <span className="addon-step">{String(i + 1).padStart(2, '0')}</span>
                <h3>{processingItems[i].service}</h3>
                <div className="addon-price">{charge}{charge.startsWith('₹') && <small>/egg</small>}</div>
                <p>{processingItems[i].note}</p>
              </Reveal>
            ))}
          </div>
          </LockGate>

          <Reveal className="chip-row">
            <div className="chips">
              {chips.map((c) => <span key={c} className="pill">{c}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('eggs.why.eyebrow')}</span>
            <h2>{t('eggs.why.headingPre')}<span className="script">{t('eggs.why.headingScript')}</span></h2>
          </Reveal>
          <div className="features features-4">
            {whyItems.map((w, i) => (
              <Reveal key={w.title} className="feature">
                <div className="ic">{EGG_ICONS[i]}</div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </Reveal>
            ))}
          </div>
          <MiniCta
            title={t('eggs.cta.title')}
            text={t('eggs.cta.text')}
            cta={t('eggs.cta.cta')}
            source="Eggs Enquiry"
          />
        </div>
      </section>
    </>
  )
}
