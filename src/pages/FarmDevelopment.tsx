import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'
import EnquiryButton from '../components/EnquiryButton'
import pastureFarmImg from '../assets/pasture-farm.jpeg'
import deepLitterImg from '../assets/deep-litter-farm.png'

const FARM_STEPS = [
  ['01', 'Site Planning', 'Understand the land, capacity and intended farming model.'],
  ['02', 'Farm Layout', 'Plan sheds, movement areas, brooding, feeding, drinking and operational zones.'],
  ['03', 'Construction', 'Develop poultry infrastructure according to the farm requirement.'],
  ['04', 'Equipment', 'Install suitable feeding, drinking and brooding systems.'],
  ['05', 'Pasture Planning', 'For applicable pasture-based models, plan outdoor areas, bird movement, shade and pasture zones.'],
  ['06', 'Farm Ready', 'Prepare the farm for the selected production programme.'],
]

const DELIVERABLES = [
  ['Farm Design & Layout', 'Site assessment and a complete farm plan — sheds, zones, movement and utilities — before anything is built.'],
  ['Shed Construction', 'Poultry shed construction to the approved design, sized to your capacity and farming model.'],
  ['Equipment Installation', 'Feeding, drinking and brooding systems installed as part of the build, not bolted on later.'],
  ['Pasture Planning', 'For pasture-based models — outdoor zones, shade, shelter and bird movement designed in from the start.'],
  ['Biosecurity Planning', 'Farm hygiene, access control and operational movement planned into the layout.'],
  ['Programme Alignment', 'Farms built for Energy Eggs schemes follow the approved design — construction starts only after design approval.'],
]

const REFERENCE_FARMS: [title: string, points: string[], img: string, alt: string][] = [
  ['Pasture-Raised Reference Farm', [
    'Land: approx. 5 acres, including a dedicated pasture area',
    'Shed: approx. 8,000 sq. ft.',
    'Capacity: 5,000 birds per batch',
    'Outdoor zones, shade and movement areas designed in',
  ], pastureFarmImg, 'Pasture-raised reference farm layout — 8,000 sq ft coop with a 5-acre bio-secured pasture area'],
  ['Deep Litter Reference Farm', [
    'Land: approx. 25,000 sq. ft.',
    'Shed: approx. 8,000 sq. ft.',
    'Capacity: 5,000 birds per batch',
    'Litter management and ventilation planned into the layout',
  ], deepLitterImg, 'Deep litter reference farm layout — 8,000 sq ft shed on 25,000 sq ft of land for 5,000 birds'],
]

const WHY_BUILD = [
  ['Design Before Construction', 'No guesswork builds — every farm starts with a design and technical plan, and construction follows approval.'],
  ['Built For The Programme', 'Farms are designed for the production model they will run — deep litter or pasture-raised — not adapted afterwards.'],
  ['One Partner Throughout', 'Design, construction, equipment, feed and birds from a single ecosystem — no coordination headaches.'],
  ['A Market After The Build', 'A farm built with Energy Eggs can plug into contract farming and B2B supply — infrastructure with a path to income.'],
]

const FAQ: [q: string, a: string][] = [
  ['How much land do I need?', 'As a reference: the pasture-raised model uses approximately 5 acres including pasture area, while the deep-litter model needs around 25,000 sq. ft. — both with a shed of approximately 8,000 sq. ft. for a 5,000-bird batch. Your site assessment confirms what fits your land.'],
  ['Do I have to join contract farming to build with you?', 'No. Farm development is available on its own. If you do want to join an Energy Eggs scheme, your farm must follow the approved farm design — so building with us keeps that door open.'],
  ['Who pays for the construction?', 'Land and construction are the farm owner’s investment. Under the contract farming schemes this is defined upfront in the model terms, alongside the support Energy Eggs provides.'],
  ['What does farm development include?', 'Site planning, farm layout and design, shed construction, equipment installation, and pasture planning where applicable — through to a farm that is ready for its production programme.'],
  ['What happens once the farm is ready?', 'The farm moves into its production programme — birds are placed, and if you are a contract farming partner, procurement and market linkage follow the scheme terms.'],
]

const PASTURE_POINTS = [
  'Outdoor access', 'Bird movement', 'Pasture areas', 'Shade and shelter', 'Feeding zones',
  'Drinking systems', 'Farm hygiene', 'Operational movement', 'Breed and production requirements',
]

export default function FarmDevelopment() {
  return (
    <>
      <PageHero eyebrow="Farm Construction" title={<>Build your desi poultry farm with <span>Energy Eggs.</span></>}>
        <p>
          From an empty piece of land to a functioning poultry farm — we help farmers plan their
          desi poultry infrastructure around the intended production model.
        </p>
      </PageHero>

      {/* FARM DEVELOPMENT STEPS */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Farm Development</span>
            <h2>From land to poultry, step by step</h2>
          </Reveal>
          <div className="steps">
            {FARM_STEPS.map(([num, title, text]) => (
              <Reveal key={num} className="step">
                <div className="num">{num}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
          <MiniCta center title="One partner. From land to poultry." cta="Build My Farm" source="Farm Development" />
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What We Deliver</span>
            <h2>Everything between land and livestock</h2>
          </Reveal>
          <div className="features features-3">
            {DELIVERABLES.map(([name, text]) => (
              <Reveal key={name} className="feature">
                <h3>{name}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REFERENCE FARMS */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Reference Farm Specifications</span>
            <h2>What a programme-ready farm looks like</h2>
            <p>
              These are the reference specifications used in the Energy Eggs contract farming
              models — a useful starting point for sizing your own build.
            </p>
          </Reveal>
          <div className="cards-2">
            {REFERENCE_FARMS.map(([title, points, img, alt]) => (
              <Reveal key={title} className="panel">
                <a className="farm-visual" href={img} target="_blank" rel="noreferrer" title="Open full-size layout">
                  <img src={img} alt={alt} loading="lazy" />
                </a>
                <h3>{title}</h3>
                <ul className="story-list">
                  {points.map((p) => (
                    <li key={p}><span className="chk">✓</span> {p}</li>
                  ))}
                </ul>
                <Link to="/contract-farming" className="panel-link">See the full model terms →</Link>
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
              <span className="eyebrow">Pasture-Based Desi Poultry</span>
              <h2>Designing farms around the bird</h2>
              <p style={{ color: 'var(--brown-soft)', marginTop: 14 }}>
                Pasture-based poultry requires more than simply providing outdoor space. Energy Eggs
                develops farm layouts around the full picture — our objective is a practical farm
                environment that works for both the farmer and the birds.
              </p>
              <ul className="story-list cols-2">
                {PASTURE_POINTS.map((p) => (
                  <li key={p}><span className="chk">✓</span> {p}</li>
                ))}
              </ul>
              <span style={{ marginTop: 30, display: 'inline-block' }}>
                <EnquiryButton className="btn" source="Enquire About Pasture Farming">Enquire About Pasture Farming</EnquiryButton>
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY BUILD WITH US */}
      <section className="values">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow" style={{ color: 'var(--orange-light)' }}>Why Build With Energy Eggs</span>
            <h2>Infrastructure with a plan behind it</h2>
          </Reveal>
          <div className="vgrid">
            {WHY_BUILD.map(([name, text], i) => (
              <Reveal key={name} className="value">
                <div className="num">0{i + 1}</div>
                <h3>{name}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common Questions</span>
            <h2>Farm development, answered</h2>
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
            title="Have land? Let's assess it."
            text="Share your land size, location and the model you're considering — our team will help you understand what your site can support."
            cta="Start With a Site Assessment"
            source="Farm Development"
          />
        </div>
      </section>
    </>
  )
}
