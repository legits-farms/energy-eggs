import type { ReactNode } from 'react'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'
import RateActions from '../components/RateActions'
import EggMark from '../components/EggMark'
import { EGG_RATES, PROCESSING_CHARGES } from '../data/rates'

const EGG_CATEGORIES: [name: string, text: string, shell: string][] = [
  ['Sonali Eggs', 'For businesses looking for consistent supply of Sonali eggs.', '#F0D5AC'],
  ['Kadaknath Eggs', 'Specialty eggs for premium and desi poultry programmes.', '#4a4547'],
  ['Aseel Eggs', 'Specialty Aseel egg supply according to customer requirements.', '#E2B489'],
]

const PROGRAMMES = ['Daily requirements', 'Weekly requirements', 'Monthly requirements', 'Contract requirements']

const EGG_VALUES: [title: string, text: string, icon: ReactNode][] = [
  ['Natural Nutrition', 'Wholesome eggs for healthier lives.',
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19C5 9 12 4 20 4c0 8-5 15-15 15z" /><path d="M5 19c3-6 7-9 11-11" /></svg>],
  ['Quality Assured', 'Graded for consistency and freshness.',
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>],
  ['Reliable Supply', 'Consistent volumes for your business.',
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="12" height="9" rx="1.5" /><path d="M14 10h4l4 3.5V16h-8" /><circle cx="7" cy="18.5" r="1.7" /><circle cx="17.5" cy="18.5" r="1.7" /></svg>],
  ['B2B Focus', 'Partnering with farms, retailers, food service and institutions.',
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3" /><path d="M3 19c0-3.2 2.8-5 6-5s6 1.8 6 5" /><circle cx="17" cy="9" r="2.4" /><path d="M17.5 14c2.2.4 3.5 2 3.5 4.5" /></svg>],
]

export default function Eggs() {
  return (
    <>
      <PageHero eyebrow="Desi Eggs" title={<>Specialty eggs. <span>Reliable supply.</span></>}>
        <p>Energy Eggs supplies desi eggs to B2B customers across food, retail and hospitality.</p>
      </PageHero>

      <RateActions title="Egg Rate Card" />

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Available Categories</span>
            <h2>Specialty desi egg supply</h2>
          </Reveal>
          <div className="cards-3">
            {EGG_CATEGORIES.map(([name, text, shell]) => (
              <Reveal key={name} className="breed-card egg-card">
                <div className="egg-badge"><EggMark shell={shell} /></div>
                <h3>{name}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="chip-row">
            <h4>Bulk B2B Programmes</h4>
            <div className="chips">
              {PROGRAMMES.map((p) => <span key={p} className="pill">{p}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Egg Rate Card</span>
            <h2>Ex-farm prices, per egg</h2>
            <p>
              <span className="script">Premium quality eggs for a healthier tomorrow</span> — rates
              tiered by your monthly commitment. The more you commit, the better the rate.
            </p>
          </Reveal>

          <div className="tier-list">
            {EGG_RATES.map(([commitment, a, ab, b]) => {
              const custom = commitment.includes('+')
              return (
                <Reveal key={commitment} className={`tier${custom ? ' custom' : ''}`}>
                  <div className="tier-range">
                    <small>Monthly commitment</small>
                    <strong>{commitment}</strong>
                    <span>eggs / month</span>
                  </div>
                  <div className="tier-prices">
                    <div className="tp"><small>A-Grade</small><b>{a}</b></div>
                    <div className="tp"><small>A + B Grade</small><b>{ab}</b></div>
                    <div className="tp"><small>B Grade</small><b>{b}</b></div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal className="sub-head">
            <span className="eyebrow">Processing &amp; Add-On Charges</span>
            <h3>Choose how your eggs arrive</h3>
          </Reveal>
          <div className="addon-grid">
            {PROCESSING_CHARGES.map(([service, charge, note], i) => (
              <Reveal key={service} className="addon">
                <span className="addon-step">{String(i + 1).padStart(2, '0')}</span>
                <h3>{service}</h3>
                <div className="addon-price">{charge}{charge.startsWith('₹') && <small>/egg</small>}</div>
                <p>{note}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="chip-row">
            <div className="chips">
              <span className="pill">Custom packing for bulk orders</span>
              <span className="pill">Branding options</span>
              <span className="pill">Private label available</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why Our Eggs</span>
            <h2>Good eggs, <span className="script">greater possibilities.</span></h2>
          </Reveal>
          <div className="features features-4">
            {EGG_VALUES.map(([title, text, icon]) => (
              <Reveal key={title} className="feature">
                <div className="ic">{icon}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
          <MiniCta
            title="We structure supply around your business"
            text="Specify your quantity, product requirements, delivery frequency and location — we build the programme around it."
            cta="Get Egg Pricing"
            source="Eggs Enquiry"
          />
        </div>
      </section>
    </>
  )
}
