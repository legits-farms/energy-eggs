import { useEffect, useState, type ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { MItem, MReveal, MStagger } from '../components/Motion'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'
import GetQuoteModal, { type QuoteKind } from '../components/GetQuoteModal'
import { useEnquiry } from '../components/EnquiryModal'
import { useLiveRates } from '../lib/ratesApi'
import logo from '../assets/logo.png'
import sonaliImg from '../assets/sonali.jpg'
import aseelImg from '../assets/aseel.png'
import kadaknathImg from '../assets/kadaknath.png'

const BREED_IMAGES: Record<string, string> = {
  Sonali: sonaliImg,
  Aseel: aseelImg,
  Kadaknath: kadaknathImg,
}

// Print either the bird cards or the egg card by tagging the body, then printing.
function printCard(target: 'birds' | 'eggs') {
  document.body.classList.remove('pm-birds', 'pm-eggs')
  document.body.classList.add(`pm-${target}`)
  setTimeout(() => window.print(), 40)
}

async function shareRateCard(title: string) {
  const url = window.location.href
  const data = { title: `Energy Eggs — ${title}`, text: `Energy Eggs published ${title.toLowerCase()}.`, url }
  if (typeof navigator !== 'undefined' && navigator.share) {
    try { await navigator.share(data) } catch { /* cancelled */ }
  } else {
    try { await navigator.clipboard.writeText(url); alert('Link copied to clipboard') }
    catch { window.open(`https://wa.me/?text=${encodeURIComponent(`${data.text} ${url}`)}`, '_blank') }
  }
}


function Locked({ unlocked, onUnlock, children }: { unlocked: boolean; onUnlock: () => void; children: ReactNode }) {
  if (unlocked) return <>{children}</>
  return (
    <div className="rate-lock">
      <div className="rate-lock-content" aria-hidden="true">{children}</div>
      <div className="rate-lock-veil">
        <div className="rate-lock-card">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4.5" y="10.5" width="15" height="10" rx="2" /><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
          </svg>
          <h4>View our live B2B rates</h4>
          <p>Enter a few details to unlock the full rate card and download the PDF.</p>
          <button type="button" className="btn" onClick={onUnlock}>View the Rates</button>
        </div>
      </div>
    </div>
  )
}

export default function RateCard() {
  const { birdCards, birdNotes, eggRates, processing } = useLiveRates()
  const [active, setActive] = useState(0)
  const [modal, setModal] = useState<QuoteKind | null>(null)
  const { open } = useEnquiry()
  const card = birdCards[Math.min(active, birdCards.length - 1)]

  const [unlocked, setUnlocked] = useState(
    typeof sessionStorage !== 'undefined' && sessionStorage.getItem('ee-rates-unlocked') === '1',
  )
  const unlock = () => {
    setUnlocked(true)
    try { sessionStorage.setItem('ee-rates-unlocked', '1') } catch { /* ignore */ }
  }

  // Open the lead popup to unlock the rates (view + download).
  const requestUnlock = (after?: () => void) => open({
    source: 'Rate Card Download',
    interest: 'Rate Card',
    title: 'Unlock the live rate card',
    subtitle: 'Enter your details to view and download our full B2B rates.',
    submitLabel: 'View the Rates',
    sentText: 'Rates unlocked — you can now view and download the full rate card.',
    onSubmitted: () => { unlock(); after?.() },
  })

  // Download: if already unlocked, print straight away; otherwise collect details first.
  const gatedDownload = (target: 'birds' | 'eggs') => {
    if (unlocked) { printCard(target); return }
    requestUnlock(() => printCard(target))
  }

  // Share: same lead gate — collect details first, then open the share sheet.
  const gatedShare = (label: string) => {
    if (unlocked) { void shareRateCard(label); return }
    requestUnlock(() => { void shareRateCard(label) })
  }

  useEffect(() => {
    const clean = () => document.body.classList.remove('pm-birds', 'pm-eggs')
    window.addEventListener('afterprint', clean)
    return () => { window.removeEventListener('afterprint', clean); clean() }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <PageHero eyebrow="Published Rate Card" title={<>Every rate. <span>One page.</span></>}>
        <p>
          All our B2B prices, published and transparent — live bird rates by breed and age,
          and ex-farm egg prices tiered by monthly commitment. No guesswork, no negotiation maze.
        </p>
        <div className="chips" style={{ justifyContent: 'center', marginTop: 22 }}>
          <span className="pill">Bird rates by age</span>
          <span className="pill">Egg tiers by commitment</span>
          <span className="pill">Processing add-ons</span>
        </div>
      </PageHero>

      {/* Print-only letterheads */}
      <div className="print-head print-head-birds" aria-hidden="true">
        <img src={logo} alt="Energy Eggs" />
        <div className="print-head-meta">
          <strong>Bird Rate Card</strong>
          <span>www.energyeggs.in · +91 78787 87226 · hello@energyeggs.in</span>
        </div>
      </div>
      <div className="print-head print-head-eggs" aria-hidden="true">
        <img src={logo} alt="Energy Eggs" />
        <div className="print-head-meta">
          <strong>Egg Rate Card</strong>
          <span>www.energyeggs.in · +91 78787 87226 · hello@energyeggs.in</span>
        </div>
      </div>

      {/* BIRD RATES */}
      <section id="bird-rates">
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">Live Bird Rate Card</span>
            <h2>Bird rates by age</h2>
            <p>Per-bird rates from day-old chicks to fully grown birds, for male and female.</p>
          </MReveal>

          <MReveal className="rate-tabs">
            {birdCards.map((c, i) => (
              <button
                key={c.name}
                type="button"
                className={`rate-tab rate-tab-img${i === active ? ' on' : ''}`}
                onClick={() => setActive(i)}
              >
                {BREED_IMAGES[c.name] && <img src={BREED_IMAGES[c.name]} alt="" />}
                {c.name}
              </button>
            ))}
          </MReveal>

          <MReveal className="card-cta card-cta-actions" style={{ maxWidth: 860 }}>
            <button type="button" className="btn ghost rate-icon-btn" onClick={() => gatedDownload('birds')} title="Download bird rate card as PDF">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12" /><path d="M8 11l4 4 4-4" /><path d="M4 21h16" /></svg>
              Download PDF
            </button>
            <button type="button" className="btn ghost rate-icon-btn" onClick={() => gatedShare('Bird Rate Card')} title="Share the bird rate card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>
              Share
            </button>
            <button type="button" className="btn" onClick={() => setModal('birds')}>
              Get the Birds
            </button>
          </MReveal>

          {/* Print-only: all breed rate cards */}
          <div className="print-birds" aria-hidden="true">
            {birdCards.map((c) => (
              <div key={c.name} className="rate-card model">
                <div className="model-top">
                  <h3>{c.name}</h3>
                  <p>Rate (₹) per bird · For orders less than 10 birds: {c.perKg}</p>
                </div>
                <table className="spec-table">
                  <thead>
                    <tr><th>Week</th><th>Age (Days)</th><th>Male (₹)</th><th>Female (₹)</th></tr>
                  </thead>
                  <tbody>
                    {c.rows.map(([week, age, male, female]) => (
                      <tr key={week}><td>{week}</td><td>{age}</td><td>{male}</td><td>{female}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            <div className="chips print-notes">
              {birdNotes.map((n) => <span key={n} className="pill">{n}</span>)}
            </div>
          </div>

          <Locked unlocked={unlocked} onUnlock={() => requestUnlock()}>
          <MReveal className="rate-card model screen-only">
            <div className="model-top model-top-flex">
              <div>
                <h3>{card.name}</h3>
                <p>Rate (₹) per bird · For orders less than 10 birds: {card.perKg}</p>
              </div>
              {BREED_IMAGES[card.name] && (
                <div className="model-top-bird">
                  <img src={BREED_IMAGES[card.name]} alt={`${card.name} bird`} />
                </div>
              )}
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
          </MReveal>
          </Locked>

          <MReveal className="chip-row">
            <div className="chips">
              {birdNotes.map((n) => <span key={n} className="pill">{n}</span>)}
            </div>
          </MReveal>
        </div>
      </section>

      {/* EGG RATES */}
      <section className="alt" id="egg-rates">
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">Egg Rate Card</span>
            <h2>Ex-farm prices, per egg</h2>
            <p>
              Rates tiered by your monthly commitment — the more you commit, the better the rate.
            </p>
          </MReveal>

          <MReveal className="card-cta card-cta-actions" style={{ maxWidth: 920 }}>
            <button type="button" className="btn ghost rate-icon-btn" onClick={() => gatedDownload('eggs')} title="Download egg rate card as PDF">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12" /><path d="M8 11l4 4 4-4" /><path d="M4 21h16" /></svg>
              Download PDF
            </button>
            <button type="button" className="btn ghost rate-icon-btn" onClick={() => gatedShare('Egg Rate Card')} title="Share the egg rate card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>
              Share
            </button>
            <button type="button" className="btn" onClick={() => setModal('eggs')}>
              Get the Eggs
            </button>
          </MReveal>

          <Locked unlocked={unlocked} onUnlock={() => requestUnlock()}>
          <MStagger className="tier-list" gap={0.08} amount={0.1}>
            {eggRates.map(([commitment, a, ab, b]) => {
              const custom = commitment.includes('+')
              return (
                <MItem key={commitment} className={`tier${custom ? ' custom' : ''}`}>
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
                </MItem>
              )
            })}
          </MStagger>

          <MReveal className="sub-head">
            <span className="eyebrow">Processing &amp; Add-On Charges</span>
            <h3>Choose how your eggs arrive</h3>
          </MReveal>
          <MStagger className="addon-grid" gap={0.12}>
            {processing.map(([service, charge, note], i) => (
              <MItem key={service} className="addon">
                <span className="addon-step">{String(i + 1).padStart(2, '0')}</span>
                <h3>{service}</h3>
                <div className="addon-price">{charge}{charge.startsWith('₹') && <small>/egg</small>}</div>
                <p>{note}</p>
              </MItem>
            ))}
          </MStagger>
          </Locked>

          <MReveal className="chip-row">
            <div className="chips">
              <span className="pill">Custom packing for bulk orders</span>
              <span className="pill">Branding options</span>
              <span className="pill">Private label available</span>
            </div>
          </MReveal>
        </div>
      </section>

      {/* MORE DETAIL + CTA */}
      <section>
        <div className="wrap">
          <MiniCta
            title="Ready to order at these rates?"
            text="Tell us your product, volumes and delivery requirement — our B2B team responds with a structured commercial proposal."
            cta="Talk to Our B2B Team"
            source="B2B Supply"
          />
        </div>
      </section>

      <GetQuoteModal kind={modal} onClose={() => setModal(null)} />
    </MotionConfig>
  )
}
