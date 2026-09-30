import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'
import RateActions from '../components/RateActions'
import LockGate from '../components/LockGate'
import { BIRD_RATE_CARDS as RATE_CARDS } from '../data/rates'
import sonaliImg from '../assets/sonali.jpg'
import aseelImg from '../assets/aseel.png'
import kadaknathImg from '../assets/kadaknath.png'
import fiyoumiImg from '../assets/fiyoumi.png'

// Name/image are static (proper nouns, assets) — merged by index with the
// translated description text from i18n at render time.
const BREED_META = [
  ['Sonali', sonaliImg],
  ['Aseel', aseelImg],
  ['Kadaknath', kadaknathImg],
  ['Fiyoumi', fiyoumiImg],
]

type BreedItem = { text: string }

export default function Birds() {
  const { t } = useTranslation()
  const breedItems = t('birds.breeds.items', { returnObjects: true }) as BreedItem[]
  const customers = t('birds.breeds.customers', { returnObjects: true }) as string[]
  const chips = t('birds.rateCard.chips', { returnObjects: true }) as string[]

  const [active, setActive] = useState(0)
  const card = RATE_CARDS[active]

  return (
    <>
      <PageHero eyebrow={t('birds.hero.eyebrow')} title={<>{t('birds.hero.titlePre')}<span>{t('birds.hero.titleSpan')}</span></>}>
        <p>{t('birds.hero.text')}</p>
      </PageHero>

      <RateActions title={t('birds.rateCardTitle')} />

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('birds.breeds.eyebrow')}</span>
            <h2>{t('birds.breeds.heading')}</h2>
            <p>{t('birds.breeds.text')}</p>
          </Reveal>
          <div className="cards-2">
            {BREED_META.map(([name, img], i) => (
              <Reveal key={name} className="breed-card has-img">
                <div className="breed-img">
                  <img src={img} alt={`${name} bird`} loading="lazy" />
                </div>
                <div>
                  <h3>{name}</h3>
                  <p>{breedItems[i].text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="chip-row">
            <h4>{t('birds.breeds.customersHeading')}</h4>
            <div className="chips">
              {customers.map((c) => <span key={c} className="pill">{c}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('birds.rateCard.eyebrow')}</span>
            <h2>{t('birds.rateCard.heading')}</h2>
            <p>{t('birds.rateCard.text')}</p>
          </Reveal>

          <Reveal className="rate-tabs">
            {RATE_CARDS.map((c, i) => (
              <button
                key={c.name}
                type="button"
                className={`rate-tab${i === active ? ' on' : ''}`}
                onClick={() => setActive(i)}
              >
                {c.name}
              </button>
            ))}
          </Reveal>

          <LockGate
            storageKey="ee-rates-unlocked"
            source="Rate Card Download"
            interest="Rate Card"
            heading={t('rateCardPage.locked.heading')}
            text={t('rateCardPage.locked.text')}
          >
          <Reveal className="rate-card model">
            <div className="model-top">
              <h3>{card.name}</h3>
              <p>{t('birds.rateCard.ratePerBird', { perKg: card.perKg })}</p>
            </div>
            <div className="rate-table-wrap">
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>{t('birds.rateCard.tableWeek')}</th>
                    <th>{t('birds.rateCard.tableAge')}</th>
                    <th>{t('birds.rateCard.tableMale')}</th>
                    <th>{t('birds.rateCard.tableFemale')}</th>
                  </tr>
                </thead>
                <tbody>
                  {card.rows.map(([week, age, male, female]) => (
                    <tr key={week}>
                      <td>{week}</td>
                      <td>{age}</td>
                      <td>{male}</td>
                      <td>{female}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          </LockGate>

          <Reveal className="chip-row">
            <div className="chips">
              {chips.map((c) => <span key={c} className="pill">{c}</span>)}
            </div>
          </Reveal>

          <MiniCta
            title={t('birds.cta.title')}
            text={t('birds.cta.text')}
            cta={t('birds.cta.cta')}
            source="Birds Enquiry"
          />
        </div>
      </section>
    </>
  )
}
