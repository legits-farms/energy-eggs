import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'
import VolumeCommitment from '../components/VolumeCommitment'
import slideEggs from '../assets/slide-eggs.jpg'
import slideBirds from '../assets/slide-birds.jpg'
import slideFeed from '../assets/slide-feed.jpg'
import slideEquipment from '../assets/slide-equipment.jpg'
import slideFarm from '../assets/slide-farm.jpg'

const HERO_SLIDES = [
  { src: slideEggs, pos: 'center 58%' },
  { src: slideBirds, pos: 'center 40%' },
  { src: slideFeed, pos: 'center 55%' },
  { src: slideEquipment, pos: 'center 60%' },
  { src: slideFarm, pos: 'center 55%' },
]

const SERVE = [
  ['Restaurants', 'Reliable poultry and egg supply for daily kitchen requirements.'],
  ['Hotels & Resorts', 'Scheduled supply with defined specifications.'],
  ['QSR Chains', 'Predictable volumes and standardized procurement.'],
  ['Meat Retailers', 'Whole birds and specialty desi poultry.'],
  ['Distributors', 'Wholesale supply for regional markets.'],
  ['Caterers', 'Bulk requirements for events and institutional catering.'],
  ['Supermarkets', 'Egg and poultry programmes according to retail requirements.'],
  ['Food Businesses', 'Structured procurement for recurring poultry requirements.'],
]

const SUPPLY_RANGE: [name: string, text: string, to: string][] = [
  ['Desi Birds', 'Sonali, Aseel, Kadaknath and Fiyoumi — live birds supplied at B2B scale.', '/birds'],
  ['Desi Eggs', 'Graded specialty eggs with tiered ex-farm pricing and processing options.', '/eggs'],
  ['Poultry Feed', 'Feed programmes to support consistent bird performance.', '/feed'],
  ['Equipment', 'Poultry equipment for farm setup and expansion.', '/equipment'],
  ['Farm Development', 'End-to-end support for developing productive desi poultry farms.', '/farm-development'],
]

const PROCUREMENT_STEPS = [
  ['01', 'Select', 'Birds / Eggs / Equipment / Farm Development'],
  ['02', 'Define', 'Quantity • Breed • Specifications • Farming model • Location'],
  ['03', 'Plan', 'Daily / Weekly / Monthly / Contract requirement'],
  ['04', 'Quote', 'Our B2B team develops a commercial proposal.'],
  ['05', 'Supply', 'Scheduled procurement and delivery according to the agreed programme.'],
]

const ENGAGEMENT: [name: string, tag: string, text: string][] = [
  ['Spot Orders', 'Start here', 'One-time bulk orders at published rate-card prices. Minimum order quantities apply — a straightforward way to evaluate our quality and service.'],
  ['Scheduled Supply', 'Grow with us', 'Recurring daily, weekly or monthly deliveries against an agreed schedule, specification and price. Built for kitchens and retailers that depend on consistency.'],
  ['Volume Commitment', 'Best pricing', 'Commit a monthly volume and unlock a preferential price slab with priority supply assurance. Our deepest partnership model for serious buyers.'],
]

const QUALITY = [
  ['Source', 'Understanding where birds and eggs originate.'],
  ['Production', 'Defined farming and production programmes.'],
  ['Quality Control', 'Documented handling and quality processes applicable to the product.'],
  ['Batch Visibility', 'Maintaining source and batch information where supported.'],
  ['Supply', 'Structured procurement and delivery programmes.'],
]

const WHY_PARTNER = [
  ['Ecosystem Depth', 'Birds, eggs, feed, equipment and farm development — one partner across the desi poultry chain.'],
  ['Transparent Pricing', 'Published rate cards for birds and eggs, so you always know where your price comes from.'],
  ['Supply Assurance', 'Committed volumes let us plan production — and protect your supply when markets tighten.'],
  ['B2B-First Design', 'No retail catalogue mindset. Programmes are structured around your specification, volume and delivery.'],
]

const FAQ: [q: string, a: string][] = [
  ['What are the minimum order quantities?', 'For country chicken, the minimum order is 10 birds — orders below 10 birds are billed per kg at the applicable breed rate. Egg programmes start from a monthly commitment of 5,000 eggs.'],
  ['How does egg pricing work?', 'Egg prices are ex-farm, per egg, and tiered by your monthly commitment — from 5,000 eggs per month up to 100,000+, where pricing is fully custom. Processing add-ons (washing, grading, packing) are charged per egg on top.'],
  ['Which breeds do you supply?', 'We focus on four desi categories: Sonali, Aseel, Kadaknath and Fiyoumi, plus quail. Live bird rates are published by age from day-old chicks to fully grown birds, for both male and female.'],
  ['Can you do custom packing or private label?', 'Yes. Custom packing, branding and private label options are available for bulk orders. Washed, graded and packed eggs are supplied retail-ready.'],
  ['What is the Volume Commitment program?', 'You commit a monthly purchase volume and receive a preferential price slab with priority supply. Tolerance is 90%, and a 25% Commitment Advance is collected against the agreed volume. If we cannot fulfil your committed volume, your agreed price remains protected.'],
  ['How do I get a commercial quote?', 'Send us your requirement — product, quantity, breed or grade, processing and packing needs, delivery frequency and location. Our B2B team responds with a structured commercial proposal.'],
]

export default function B2BSupply() {
  return (
    <>
      <PageHero eyebrow="B2B Procurement" title={<>Tell us what you need. We build the supply <span>around it.</span></>} slides={HERO_SLIDES}>
        <p>
          Every business has a different requirement. That's why Energy Eggs is designed around
          commercial procurement rather than a one-size-fits-all catalogue.
        </p>
      </PageHero>

      {/* WHO WE SERVE */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Who We Serve</span>
            <h2>Built for businesses that depend on supply</h2>
          </Reveal>
          <div className="features features-4">
            {SERVE.map(([name, text]) => (
              <Reveal key={name} className="feature">
                <h3>{name}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE SUPPLY */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">What We Supply</span>
            <h2>One partner. The whole ecosystem.</h2>
            <p>Procure across the desi poultry chain through a single B2B relationship.</p>
          </Reveal>
          <div className="features features-5">
            {SUPPLY_RANGE.map(([name, text, to]) => (
              <Reveal key={name} className="feature feature-link">
                <Link to={to}>
                  <h3>{name}</h3>
                  <p>{text}</p>
                  <span className="feature-more">Explore →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">How It Works</span>
            <h2>From requirement to scheduled supply</h2>
          </Reveal>
          <div className="steps steps-5">
            {PROCUREMENT_STEPS.map(([num, title, text]) => (
              <Reveal key={num} className="step">
                <div className="num">{num}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
          <MiniCta center cta="Request a Commercial Quote" source="B2B Supply" />
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Ways To Work With Us</span>
            <h2>Three levels of partnership</h2>
            <p>Start with a spot order, grow into a schedule, commit for the best terms.</p>
          </Reveal>
          <div className="cards-3">
            {ENGAGEMENT.map(([name, tag, text]) => (
              <Reveal key={name} className="breed-card">
                <span className="eyebrow">{tag}</span>
                <h3>{name}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRIORITY SUPPLY & VOLUME COMMITMENT */}
      <VolumeCommitment />

      {/* RATE SNAPSHOT */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Commercial Snapshot</span>
            <h2>Transparent, published pricing</h2>
            <p>Headline numbers from our current rate cards — full details on the product pages.</p>
          </Reveal>
          <div className="cards-2">
            <Reveal className="panel">
              <h3>Desi Birds</h3>
              <ul className="story-list">
                <li><span className="chk">✓</span> Sonali ₹500/kg · Aseel ₹700/kg · Kadaknath ₹750/kg · Fiyoumi ₹1,500/kg</li>
                <li><span className="chk">✓</span> Per-bird rates published by age — day-old chicks to 20+ weeks, male and female.</li>
                <li><span className="chk">✓</span> Minimum order 10 birds; smaller orders billed per kg.</li>
              </ul>
              <Link to="/birds" className="panel-link">View full bird rate card →</Link>
            </Reveal>
            <Reveal className="panel">
              <h3>Desi Eggs</h3>
              <ul className="story-list">
                <li><span className="chk">✓</span> Ex-farm prices from ₹10.75 to ₹12.00 per egg, tiered by monthly commitment.</li>
                <li><span className="chk">✓</span> Processing add-ons from ₹0.00 (unwashed) to ₹1.05 (washed, graded &amp; packed) — plus packing material at cost.</li>
                <li><span className="chk">✓</span> Custom pricing at 100,000+ eggs per month; private label available.</li>
              </ul>
              <Link to="/eggs" className="panel-link">View full egg rate card →</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="values">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Why Energy Eggs</span>
            <h2>A supply partner, not just a supplier</h2>
          </Reveal>
          <div className="vgrid">
            {WHY_PARTNER.map(([name, text], i) => (
              <Reveal key={name} className="value">
                <div className="num">0{i + 1}</div>
                <h3>{name}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Quality &amp; Traceability</span>
            <h2>Quality is a system. Not a slogan.</h2>
            <p>Energy Eggs is building systems around every step of the supply chain.</p>
          </Reveal>
          <div className="features features-5">
            {QUALITY.map(([name, text]) => (
              <Reveal key={name} className="feature">
                <h3>{name}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Common Questions</span>
            <h2>B2B procurement, answered</h2>
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
            title="Still have a question?"
            text="Tell us about your business and requirement — our B2B team will walk you through pricing, programmes and terms."
            cta="Talk to the B2B Team"
            source="B2B Supply"
          />
        </div>
      </section>
    </>
  )
}
