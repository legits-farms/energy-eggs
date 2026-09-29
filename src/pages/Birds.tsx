import { useState } from 'react'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'
import RateActions from '../components/RateActions'
import { BIRD_RATE_CARDS as RATE_CARDS } from '../data/rates'
import sonaliImg from '../assets/sonali.jpg'
import aseelImg from '../assets/aseel.png'
import kadaknathImg from '../assets/kadaknath.png'
import fiyoumiImg from '../assets/fiyoumi.png'

const BREEDS = [
  ['Sonali', '₹500 /kg', 'A commercially relevant coloured-bird category for broader poultry programmes.', sonaliImg],
  ['Aseel', '₹700 /kg', 'A distinctive desi poultry category with strong traditional and culinary positioning.', aseelImg],
  ['Kadaknath', '₹750 /kg', 'An indigenous breed positioned for specialty and premium poultry markets.', kadaknathImg],
  ['Fiyoumi', '₹1,500 /kg', 'A rare specialty breed for premium and niche poultry programmes.', fiyoumiImg],
]

const BIRD_CUSTOMERS = [
  'Meat retailers', 'Restaurants', 'Hotels', 'QSRs', 'Caterers', 'Distributors',
  'Poultry businesses', 'Institutional buyers', 'Food businesses',
]

export default function Birds() {
  const [active, setActive] = useState(0)
  const card = RATE_CARDS[active]

  return (
    <>
      <PageHero eyebrow="Whole Bird Supply" title={<>Desi birds. At <span>B2B scale.</span></>}>
        <p>
          Energy Eggs supplies whole birds to B2B customers looking for reliable access to
          specialty desi poultry.
        </p>
      </PageHero>

      <RateActions title="Bird Rate Card" />

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Our Breeds</span>
            <h2>Four focused desi categories</h2>
            <p>Traditionally raised. Naturally stronger. Exceptionally nutritious.</p>
          </Reveal>
          <div className="cards-2">
            {BREEDS.map(([name, rate, text, img]) => (
              <Reveal key={name} className="breed-card has-img">
                <div className="breed-img">
                  <img src={img} alt={`${name} bird`} loading="lazy" />
                </div>
                <div>
                  <h3>{name} <span className="breed-rate">{rate}</span></h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="chip-row">
            <h4>B2B Customers</h4>
            <div className="chips">
              {BIRD_CUSTOMERS.map((c) => <span key={c} className="pill">{c}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Country Chicken Rate Card</span>
            <h2>Live bird rates by age</h2>
            <p>Per-bird rates from day-old chicks to fully grown birds, for male and female.</p>
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

          <Reveal className="rate-card model">
            <div className="model-top">
              <h3>{card.name}</h3>
              <p>Rate (₹) per bird · For orders less than 10 birds: {card.perKg}</p>
            </div>
            <div className="rate-table-wrap">
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>Week</th>
                    <th>Age (Days)</th>
                    <th>Male (₹)</th>
                    <th>Female (₹)</th>
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

          <Reveal className="chip-row">
            <div className="chips">
              <span className="pill">Minimum order: 10 birds</span>
              <span className="pill">Orders under 10 birds billed per kg</span>
              <span className="pill">Fiyoumi: ₹1,500 per kg</span>
              <span className="pill">Quail (male): ₹200 per piece</span>
            </div>
          </Reveal>

          <MiniCta
            title="Need regular supply?"
            text="Tell us your requirement and our B2B team can develop a supply programme around your volume and specifications."
            cta="Request B2B Pricing"
            source="Birds Enquiry"
          />
        </div>
      </section>
    </>
  )
}
