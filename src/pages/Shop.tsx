import { useMemo, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { LocaleLink as Link } from '../components/LocaleLink'
import { MotionConfig } from 'framer-motion'
import { MItem, MReveal, MStagger } from '../components/Motion'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'
import GetQuoteModal, { type QuoteKind } from '../components/GetQuoteModal'
import { useLiveProducts } from '../lib/productsApi'
import sonaliImg from '../assets/sonali.jpg'
import aseelImg from '../assets/aseel.png'
import kadaknathImg from '../assets/kadaknath.png'
import fiyoumiImg from '../assets/fiyoumi.png'

const BREED_IMAGES: Record<string, string> = {
  Sonali: sonaliImg,
  Aseel: aseelImg,
  Kadaknath: kadaknathImg,
  Fiyoumi: fiyoumiImg,
}

const EGG_SHELLS: Record<string, string> = {
  'Sonali Eggs': '#F0D5AC',
  'Kadaknath Eggs': '#4a4547',
  'Aseel Eggs': '#E2B489',
}
const DEFAULT_SHELL = '#F0D5AC'

// Static fallbacks — shown instantly and used if the API is unreachable.
const BIRD_PRODUCTS: [name: string, option: string, note: string, img: string][] = [
  ['Sonali', 'Sonali Birds', 'Day-old chicks to grown birds, priced by age.', sonaliImg],
  ['Aseel', 'Aseel Birds', 'Day-old chicks to grown birds, priced by age.', aseelImg],
  ['Kadaknath', 'Kadaknath Birds', 'Day-old chicks to grown birds, priced by age.', kadaknathImg],
  ['Fiyoumi', 'Fiyoumi Birds', 'Specialty desi breed for premium programmes.', fiyoumiImg],
]

const EGG_PRODUCTS: [name: string, option: string, shell: string, text: string, rate: string][] = [
  ['Sonali Eggs', 'Sonali Eggs', '#F0D5AC', 'Consistent B2B supply of Sonali desi eggs.', 'from ₹10.75'],
  ['Kadaknath Eggs', 'Kadaknath Eggs', '#4a4547', 'Specialty eggs for premium and desi programmes.', 'from ₹40'],
  ['Aseel Eggs', 'Aseel Eggs', '#E2B489', 'Specialty Aseel egg supply to your requirement.', 'from ₹75'],
]

const EQUIPMENT_META: Record<string, { text: string; icon: ReactNode }> = {
  Feeders: {
    text: 'Chick trays to parent feeders for even feed access.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h16l-2 9H6l-2-9z" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>,
  },
  'Drinkers & Watering': {
    text: 'Nipples, drinker sets, pipes and water tanks.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c3.5 4.5 6 7.8 6 11a6 6 0 0 1-12 0c0-3.2 2.5-6.5 6-11z" /></svg>,
  },
  'Brooding Systems': {
    text: 'Gas and electric brooders plus chick guards.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></svg>,
  },
  'Handling & Transport': {
    text: 'Bird and chick transport boxes and egg trays.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" /><path d="M3 8l9 5 9-5M12 13v8" /></svg>,
  },
  'Tools & Accessories': {
    text: 'Vaccination guns, debeakers, hooks and chains.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4L15 12l-3-3 2.7-2.7z" /></svg>,
  },
  'Husk & Litter': {
    text: 'Husk, limestone and shed sanitisation inputs.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-5 9 5-9 5-9-5z" /><path d="M3 14l9 5 9-5" /></svg>,
  },
}
const DEFAULT_EQUIP_ICON = EQUIPMENT_META['Handling & Transport'].icon

const EQUIPMENT_FALLBACK: { name: string; text: string; icon: ReactNode; items: string[] }[] = [
  { name: 'Feeders', ...EQUIPMENT_META.Feeders, items: ['8kg Feeder Set', 'Chick Feeder Set', 'Parent Feeder'] },
  { name: 'Drinkers & Watering', ...EQUIPMENT_META['Drinkers & Watering'], items: ['Classic Drinker Set', 'Jumbo Drinker Set', '8 Manual Drinker Set', '4 Manual Drinker Set', 'Chick Drinker Set', '360° Nipples', 'Drinker Nozzles', 'Blue Drinker Pipe', 'Water Level Tubes', '20 L Water Tank'] },
  { name: 'Brooding Systems', ...EQUIPMENT_META['Brooding Systems'], items: ['Gas Brooder (Single)', 'Gas Brooder (Double)', 'Electric Brooder with Fan', 'Electric Brooder without Fan', 'Chick Guard'] },
  { name: 'Handling & Transport', ...EQUIPMENT_META['Handling & Transport'], items: ['Bird Transportation Box', 'Chick Transport Boxes', 'Egg Trays'] },
  { name: 'Tools & Accessories', ...EQUIPMENT_META['Tools & Accessories'], items: ['S Hooks', 'Adjusting Chains', 'Automatic Vaccination Guns', 'Debeaking Machine', 'Raking Tools', 'Biscuits'] },
  { name: 'Husk & Litter', ...EQUIPMENT_META['Husk & Litter'], items: ['Husk', 'Limestone', 'Formaldehyde', 'Potassium Permanganate'] },
]

type ShopModal = { kind: QuoteKind; interest: string; options?: string[] } | null

export default function Shop() {
  const { t } = useTranslation()
  const heroChips = t('shop.hero.chips', { returnObjects: true }) as string[]
  const [modal, setModal] = useState<ShopModal>(null)
  const live = useLiveProducts()

  const birdProducts = useMemo(() => {
    const birds = live?.filter((p) => p.category === 'Birds' && p.active) ?? []
    const cards = birds
      .map((p) => {
        const display = p.name.replace(/\s+Birds$/i, '')
        const img = BREED_IMAGES[display]
        return img
          ? ([display, p.name, p.notes, img] as (typeof BIRD_PRODUCTS)[number])
          : null
      })
      .filter((c): c is (typeof BIRD_PRODUCTS)[number] => c !== null)
    return cards.length ? cards : BIRD_PRODUCTS
  }, [live])

  const quailPill = useMemo(() => {
    const quail = live?.find((p) => p.category === 'Birds' && p.active && /quail/i.test(p.name))
    if (live && !quail) return null
    return quail ? `${quail.name} also available` : 'Quail also available'
  }, [live])

  const eggProducts = useMemo(() => {
    const eggs = live?.filter((p) => p.category === 'Eggs' && p.active) ?? []
    const cards = eggs.map(
      (p) =>
        [p.name, p.name, EGG_SHELLS[p.name] ?? DEFAULT_SHELL, p.notes, p.rate || 'from ₹10.75'] as (typeof EGG_PRODUCTS)[number],
    )
    return cards.length ? cards : EGG_PRODUCTS
  }, [live])

  const equipmentGroups = useMemo(() => {
    const equip = live?.filter((p) => p.category === 'Equipment' && p.active) ?? []
    if (!equip.length) return EQUIPMENT_FALLBACK
    const bySub = new Map<string, string[]>()
    for (const p of [...equip].sort((a, b) => a.sortOrder - b.sortOrder)) {
      const sub = p.subcategory || 'Other Equipment'
      if (!bySub.has(sub)) bySub.set(sub, [])
      bySub.get(sub)!.push(p.name)
    }
    return [...bySub.entries()].map(([name, items]) => ({
      name,
      text: EQUIPMENT_META[name]?.text ?? 'Farm equipment to your requirement.',
      icon: EQUIPMENT_META[name]?.icon ?? DEFAULT_EQUIP_ICON,
      items,
    }))
  }, [live])

  const equipmentCount = equipmentGroups.reduce((n, g) => n + g.items.length, 0)

  const birdOptions = useMemo(() => {
    const names = live?.filter((p) => p.category === 'Birds' && p.active).map((p) => p.name)
    return names?.length ? names : undefined
  }, [live])

  const eggOptions = useMemo(() => {
    const names = live?.filter((p) => p.category === 'Eggs' && p.active).map((p) => p.name)
    return names?.length ? names : undefined
  }, [live])

  return (
    <MotionConfig reducedMotion="user">
      <PageHero eyebrow={t('shop.hero.eyebrow')} title={<>{t('shop.hero.titlePre')}<span>{t('shop.hero.titleSpan')}</span></>}>
        <p>{t('shop.hero.text')}</p>
        <div className="chips" style={{ justifyContent: 'center', marginTop: 22 }}>
          {heroChips.map((c) => <span key={c} className="pill">{c}</span>)}
        </div>
      </PageHero>

      {/* BIRDS */}
      <section id="shop-birds">
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('shop.birds.eyebrow')}</span>
            <h2>{t('shop.birds.heading')}</h2>
            <p>{t('shop.birds.text')}</p>
          </MReveal>
          <MStagger className="shop-grid">
            {birdProducts.map(([name, option, note, img]) => (
              <MItem key={name} className="shop-card">
                <div className="shop-img">
                  <img src={img} alt={`${name} bird`} loading="lazy" />
                </div>
                <h3>{name}</h3>
                <p>{note}</p>
                <button type="button" className="btn" onClick={() => setModal({ kind: 'birds', interest: option, options: birdOptions })}>
                  {t('shop.birds.orderBtn')}
                </button>
              </MItem>
            ))}
          </MStagger>
          <MReveal className="chip-row">
            <div className="chips">
              {quailPill && <span className="pill">{quailPill}</span>}
              <span className="pill">{t('shop.birds.underTen')}</span>
              <Link to="/rate-card#bird-rates" className="pill">{t('shop.birds.fullRateCard')}</Link>
            </div>
          </MReveal>
        </div>
      </section>

      {/* EGGS */}
      <section className="alt" id="shop-eggs">
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('shop.eggs.eyebrow')}</span>
            <h2>{t('shop.eggs.heading')}</h2>
            <p>{t('shop.eggs.text')}</p>
          </MReveal>
          <MStagger className="shop-grid shop-grid-3">
            {eggProducts.map(([name, option, , text, rate]) => (
              <MItem key={name} className="shop-card">
                <h3>{name}</h3>
                <div className="shop-price">{rate} <small>/egg</small></div>
                <p>{text}</p>
                <button type="button" className="btn" onClick={() => setModal({ kind: 'eggs', interest: option, options: eggOptions })}>
                  {t('shop.eggs.orderBtn')}
                </button>
              </MItem>
            ))}
          </MStagger>
          <MReveal className="chip-row">
            <div className="chips">
              <span className="pill">{t('shop.eggs.washed')}</span>
              <span className="pill">{t('shop.eggs.graded')}</span>
              <span className="pill">{t('shop.eggs.packing')}</span>
              <span className="pill">{t('shop.eggs.packingMaterial')}</span>
              <Link to="/rate-card#egg-rates" className="pill">{t('shop.eggs.fullTiers')}</Link>
            </div>
          </MReveal>
        </div>
      </section>

      {/* FARM EQUIPMENT */}
      <section id="shop-equipment">
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('shop.equipment.eyebrow')}</span>
            <h2>{t('shop.equipment.heading')}</h2>
            <p>{t('shop.equipment.textTemplate', { count: equipmentCount, groups: equipmentGroups.length })}</p>
          </MReveal>
          <MStagger className="shop-grid shop-grid-3">
            {equipmentGroups.map(({ name, text, icon, items }) => (
              <MItem key={name} className="shop-card">
                <div className="shop-img shop-ic">{icon}</div>
                <h3>{name}</h3>
                <div className="shop-price">{t('shop.equipment.productsCount', { count: items.length })}</div>
                <p>{text}</p>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setModal({
                    kind: 'equipment',
                    interest: items[0],
                    options: [...items, t('shop.equipment.allRange', { name })],
                  })}
                >
                  {t('shop.equipment.orderBtn')}
                </button>
              </MItem>
            ))}
          </MStagger>
          <MReveal className="chip-row">
            <div className="chips">
              <span className="pill">{t('shop.equipment.completeSetups')}</span>
              <span className="pill">{t('shop.equipment.recurringHusk')}</span>
              <span className="pill">{t('shop.equipment.setupGuidance')}</span>
              <Link to="/equipment" className="pill">{t('shop.equipment.fullCatalogue')}</Link>
            </div>
          </MReveal>
        </div>
      </section>

      {/* MORE FROM THE ECOSYSTEM */}
      <section className="alt">
        <div className="wrap">
          <MReveal className="sec-head">
            <span className="eyebrow">{t('shop.also.eyebrow')}</span>
            <h2>{t('shop.also.heading')}</h2>
          </MReveal>
          <MStagger className="cards-2" gap={0.15}>
            <MItem className="panel rate-mini">
              <h3>{t('shop.also.farmDevTitle')}</h3>
              <p style={{ color: 'var(--brown-soft)', fontSize: '.94rem' }}>{t('shop.also.farmDevText')}</p>
              <Link to="/farm-development" className="panel-link">{t('shop.also.farmDevLink')}</Link>
            </MItem>
            <MItem className="panel rate-mini">
              <h3>{t('shop.also.feedTitle')}</h3>
              <p style={{ color: 'var(--brown-soft)', fontSize: '.94rem' }}>{t('shop.also.feedText')}</p>
              <Link to="/feed" className="panel-link">{t('shop.also.feedLink')}</Link>
            </MItem>
          </MStagger>
          <MiniCta
            title={t('shop.cta.title')}
            text={t('shop.cta.text')}
            cta={t('shop.cta.cta')}
            source="B2B Supply"
          />
        </div>
      </section>

      <GetQuoteModal kind={modal?.kind ?? null} interest={modal?.interest} options={modal?.options} onClose={() => setModal(null)} />
    </MotionConfig>
  )
}
