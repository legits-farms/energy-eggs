import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'
import LockGate from '../components/LockGate'
import pastureFarmImg from '../assets/pasture-farm.jpeg'
import deepLitterImg from '../assets/deep-litter-farm.png'
import contractHeroImg from '../assets/contract-hero.jpg'

const MODEL_IMAGES: Record<string, [src: string, alt: string]> = {
  'pasture-raised': [pastureFarmImg, 'Pasture-raised farm layout — 8,000 sq ft coop with a 5-acre bio-secured pasture area for 5,000 birds'],
  'deep-litter': [deepLitterImg, 'Deep litter farm layout — 8,000 sq ft shed on 25,000 sq ft of land for 5,000 birds'],
}

const MODELS = [
  {
    id: 'pasture-raised',
    label: 'Pasture-Raised',
    name: 'Sonali Pasture-Raised Contract Farming Model',
    tag: 'Designed for premium Sonali egg production under a pasture-based farming system.',
    specs: [
      ['Land Requirement', 'Approximately 5 acres, including a dedicated pasture area.'],
      ['Shed Requirement', 'Approximately 8,000 sq. ft., with construction to commence after approval of the farm design by Energy Eggs Pvt Ltd.'],
      ['Batch Size', '5,000 birds per batch'],
      ['Rearing Cycle', 'Approximately 11–12 months'],
      ['Bird Cost', '₹550 per bird for 18-week-old ready-to-lay birds.'],
      ['Egg Procurement', '₹9 per A-grade egg under the proposed fixed-price model.'],
      ['Payment', 'Payments will be processed every 15 days from the invoice, subject to the agreed quality and procurement terms.'],
      ['Flock Replacement / Buyback', 'At the completion of each batch, the flock will be taken back at the agreed rate of ₹250/kg, subject to the terms and conditions of the final agreement.'],
      ['Energy Eggs Pvt Ltd Contribution', '₹100 per bird as a contribution/subsidy under the scheme.'],
      ['Contract Period', '1 year, renewable by mutual agreement'],
    ],
    farmer: [
      'Land and pasture development',
      'Shed construction',
      'Feed costs',
      'Electricity',
      'Labour',
      'Other farm operating expenses',
      'Insurance',
      'Statutory approvals/licences, where applicable',
      'Day-to-day farm management as per Energy Eggs Pvt Ltd guidelines',
    ],
    support: [
      'Farm design and technical planning',
      'Farming SOPs',
      'Training',
      'Technology and technical guidance',
      'Veterinary supervision',
      'Flock-management guidance',
      'Egg collection/pickup logistics',
      'Quality standards and monitoring',
    ],
  },
  {
    id: 'deep-litter',
    label: 'Deep Litter',
    name: 'Sonali Deep Litter Contract Farming Model',
    tag: 'Suitable if you prefer to operate the farm without the larger pasture requirement. Birds are reared under a deep-litter system, following Energy Eggs Pvt Ltd approved farming, management and biosecurity protocols.',
    specs: [
      ['Land Requirement', 'Approximately 25,000 sq. ft.'],
      ['Shed Requirement', 'Approximately 8,000 sq. ft., with construction to commence after approval of the farm design by Energy Eggs Pvt Ltd.'],
      ['Batch Size', '5,000 birds per batch'],
      ['Rearing Cycle', 'Approximately 11–12 months'],
      ['Bird Cost', '₹550 per bird for 18-week-old ready-to-lay birds.'],
      ['Egg Procurement', '₹7 per A-grade egg under the proposed fixed-price model.'],
      ['Payment', 'Payments will be processed every 15 days from the invoice, subject to the agreed quality and procurement terms.'],
      ['Flock Replacement / Buyback', 'At the end of the production cycle, the birds can be taken back at the agreed rate of ₹200/kg, subject to the final contract terms.'],
      ['Energy Eggs Pvt Ltd Contribution', '₹100 per bird as a contribution/subsidy under the scheme.'],
      ['Contract Period', '1 year, renewable by mutual agreement'],
    ],
    farmer: [
      'Land',
      'Shed construction',
      'Feed',
      'Labour',
      'Electricity',
      'Water and litter',
      'Farm maintenance',
      'Other miscellaneous operating expenses',
      'Insurance',
      'Required approvals and licences',
      'Day-to-day flock management',
    ],
    support: [
      'Farm and shed design',
      'Technical training',
      'Farming SOPs',
      'Production and flock-management protocols',
      'Veterinary supervision',
      'Technical monitoring',
      'Egg quality standards',
      'Egg pickup/logistics support',
      'Guidance throughout the production cycle',
    ],
  },
]

const BENEFITS = [
  ['Assured Procurement', 'Energy Eggs procures your A-grade eggs at a fixed price — you farm, we handle the market.'],
  ['Timely Payments', 'Payments processed every 15 days from invoice, against agreed quality and procurement terms.'],
  ['Bird Contribution', '₹100 per bird contribution/subsidy from Energy Eggs Pvt Ltd under the scheme.'],
  ['Flock Buyback', 'At the end of each cycle, the flock is taken back at an agreed per-kg rate.'],
  ['Technical Backbone', 'Farm design, SOPs, training, veterinary supervision and monitoring throughout the cycle.'],
  ['Pickup Logistics', 'Egg collection and pickup logistics supported from your farm gate.'],
]

const JOURNEY = [
  ['01', 'Enquire', 'Share your land details, location and preferred farming model with our team.'],
  ['02', 'Farm Design', 'Energy Eggs prepares the farm design and technical plan. Construction begins only after design approval.'],
  ['03', 'Build & Setup', 'Construct the shed (approx. 8,000 sq. ft.) and set up equipment as per the approved design.'],
  ['04', 'Bird Placement', '18-week-old ready-to-lay Sonali birds are placed at ₹550 per bird, with a ₹100 per bird contribution.'],
  ['05', 'Produce & Supply', 'Run production under Energy Eggs SOPs. A-grade eggs are procured at the fixed price, paid every 15 days.'],
  ['06', 'Buyback & Renew', 'At the end of the 11–12 month cycle, the flock is bought back and the contract can renew for the next batch.'],
]

const COMPARE: [param: string, pasture: string, deepLitter: string][] = [
  ['Land Requirement', 'Approx. 5 acres, incl. pasture area', 'Approx. 25,000 sq. ft.'],
  ['Shed Requirement', 'Approx. 8,000 sq. ft.', 'Approx. 8,000 sq. ft.'],
  ['Batch Size', '5,000 birds', '5,000 birds'],
  ['Egg Procurement', '₹9 per A-grade egg', '₹7 per A-grade egg'],
  ['Flock Buyback', '₹250 per kg', '₹200 per kg'],
  ['Rearing Cycle', '11–12 months', '11–12 months'],
  ['Contract Period', '1 year, renewable', '1 year, renewable'],
]

const FAQ: [q: string, a: string][] = [
  ['What do I need to get started?', 'Suitable land — approximately 5 acres for the pasture-raised model or 25,000 sq. ft. for deep litter — plus the ability to construct a shed of around 8,000 sq. ft. after your farm design is approved, and a willingness to operate as per Energy Eggs SOPs.'],
  ['Who buys my eggs, and at what price?', 'Energy Eggs procures your A-grade eggs under a proposed fixed-price model — ₹9 per egg on the pasture-raised model and ₹7 per egg on the deep-litter model — with pickup logistics supported.'],
  ['How and when do I get paid?', 'Payments are processed every 15 days from the invoice, subject to the agreed quality and procurement terms.'],
  ['What happens at the end of a batch?', 'The flock is taken back under the buyback arrangement — at ₹250/kg on the pasture-raised model or ₹200/kg on deep litter, subject to final contract terms — and the 1-year contract can be renewed by mutual agreement for the next batch.'],
  ['What support does Energy Eggs provide?', 'Farm and shed design, farming SOPs, technical training, veterinary supervision, flock-management guidance, quality standards and monitoring, and egg pickup logistics — throughout the production cycle.'],
  ['Are these figures guaranteed?', 'All terms, rates and figures are indicative and subject to a final, legally binding bilateral agreement between Energy Eggs Pvt Ltd and the farmer, with continued eligibility linked to adherence to the prescribed SOPs and quality benchmarks.'],
]

const PARTNER_FLOW = [
  'Farm Design', 'Construction', 'Equipment', 'Bird Programme', 'Farming Model',
  'Technical Support', 'Procurement / Market Linkage',
]

const TERMS = [
  'All terms, guidelines, rates, and figures mentioned herein are indicative and subject to the execution of a final, legally binding bilateral agreement between Energy Eggs Pvt Ltd and the farmer.',
  'Continued eligibility under this scheme is contingent upon strict adherence to standard operating procedures (SOPs), quality benchmarks, and management guidelines prescribed by Energy Eggs Pvt Ltd from time to time.',
  'Energy Eggs Pvt Ltd reserves the right to amend, update, or modify the scheme terms, technical specifications, and operational parameters with prior notice.',
]

export default function ContractFarming() {
  return (
    <>
      <PageHero eyebrow="Contract Farming" title={<>Grow with <span>Energy Eggs.</span></>} bg={contractHeroImg} bgPosition="center 45%">
        <p>
          We partner with farmers to create a structured desi poultry production network. Instead of
          every farmer working independently, Energy Eggs can provide a defined production framework
          and market linkage.
        </p>
      </PageHero>

      {/* WHY CONTRACT FARMING */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why Farm With Us</span>
            <h2>You focus on the farm. <span className="script">We handle the rest.</span></h2>
            <p>
              A structured production scheme with defined procurement, payment and buyback terms —
              so your effort goes into farming, not finding buyers.
            </p>
          </Reveal>
          <div className="features features-3">
            {BENEFITS.map(([name, text]) => (
              <Reveal key={name} className="feature">
                <h3>{name}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

     

      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Two Core Production Models</span>
            <h2>Choose your farming model</h2>
            <p>
              Choose the model that fits your land and how you want to run your farm. Both are
              structured Sonali egg production schemes with defined procurement, payment and buyback
              terms.
            </p>
          </Reveal>

          <Reveal className="model compare-model">
            <div className="model-top">
              <h3>The two models at a glance</h3>
              <p>Same birds, same batch size — the difference is land, system and rates.</p>
            </div>
            <div className="rate-table-wrap">
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Pasture-Raised</th>
                    <th>Deep Litter</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(([param, pasture, deep]) => (
                    <tr key={param}>
                      <td>{param}</td>
                      <td>{pasture}</td>
                      <td>{deep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {MODELS.map((m, i) => (
            <div key={m.id} id={m.id} className="model-block">
              <Reveal className="model-title">
                <h2><span className="mn">{i + 1}.</span> {m.label}</h2>
              </Reveal>
              {MODEL_IMAGES[m.id] && (
                <Reveal>
                  <a className="farm-visual" href={MODEL_IMAGES[m.id][0]} target="_blank" rel="noreferrer" title="Open full-size layout">
                    <img src={MODEL_IMAGES[m.id][0]} alt={MODEL_IMAGES[m.id][1]} loading="lazy" />
                  </a>
                </Reveal>
              )}
              <Reveal className="model">
              <div className="model-top">
                <h3>{m.name}</h3>
                <p>{m.tag}</p>
              </div>
              <LockGate
                storageKey="ee-contract-unlocked"
                source="Contract Farming"
                interest={`${m.label} Contract Model`}
                heading="View the full model details"
                text="Enter a few details to unlock the specifications, responsibilities and support."
              >
              <table className="spec-table">
                <thead>
                  <tr>
                    <th scope="col">Parameter</th>
                    <th scope="col">Specification Details</th>
                  </tr>
                </thead>
                <tbody>
                  {m.specs.map(([param, detail]) => (
                    <tr key={param}>
                      <td>{param}</td>
                      <td>{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="model-grid">
                <div>
                  <h4>Farmer's Responsibilities</h4>
                  <ul className="story-list">
                    {m.farmer.map((p) => (
                      <li key={p}><span className="chk">✓</span> {p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Energy Eggs Pvt Ltd Support</h4>
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
            <h4>Terms &amp; Conditions</h4>
            <ul>
              {TERMS.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

       {/* PARTNERSHIP JOURNEY */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The Partnership Journey</span>
            <h2>From enquiry to your first buyback</h2>
          </Reveal>
          <div className="steps">
            {JOURNEY.map(([num, title, text]) => (
              <Reveal key={num} className="step">
                <div className="num">{num}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="farmer-partners">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Farmer Partners</span>
            <h2>Your land. Our ecosystem.</h2>
            <p>Have land and want to enter desi poultry farming? Energy Eggs can help you explore:</p>
          </Reveal>
          <Reveal className="chain wrap-chain">
            {PARTNER_FLOW.map((s, i) => (
              <span key={s} className="chain-item">
                <span>{s}</span>
                {i < PARTNER_FLOW.length - 1 && <span className="ar">→</span>}
              </span>
            ))}
          </Reveal>
          <MiniCta
            title="Who can partner?"
            text="Farmers with suitable land who are willing to operate according to the production, welfare, biosecurity and quality requirements of the applicable Energy Eggs programme."
            cta="Become a Farmer Partner"
            source="Farmer Partnership"
          />
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common Questions</span>
            <h2>Contract farming, answered</h2>
          </Reveal>
          <Reveal className="faq">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </Reveal>
          <MiniCta
            title="Ready to explore a partnership?"
            text="Tell us about your land, location and preferred model — our team will assess the fit and walk you through the scheme in detail."
            cta="Apply for Contract Farming"
            source="Farmer Partnership"
          />
        </div>
      </section>
    </>
  )
}
