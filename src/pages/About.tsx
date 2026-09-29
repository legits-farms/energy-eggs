import { useTranslation } from 'react-i18next'
import { LocaleLink as Link } from '../components/LocaleLink'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import MiniCta from '../components/MiniCta'
import VolumeCommitment from '../components/VolumeCommitment'
import aboutHeroImg from '../assets/about-hero.jpg'

// Static per-item routes (not translatable) — merged by index with the
// translated title/text arrays from i18n at render time.
const PILLAR_LINKS = ['/birds', '/eggs', '/equipment', '/feed', '/farm-development', '/contract-farming']

type TextPair = { title: string; text: string }
type StatItem = { n: string; label: string }

export default function About() {
  const { t } = useTranslation()
  const stats = t('about.stats', { returnObjects: true }) as StatItem[]
  const whyDesiItems = t('about.whyDesi.items', { returnObjects: true }) as TextPair[]
  const pillars = t('about.whatWeDo.items', { returnObjects: true }) as TextPair[]
  const farmersItems = t('about.howWeWork.farmersItems', { returnObjects: true }) as string[]
  const buyersItems = t('about.howWeWork.buyersItems', { returnObjects: true }) as string[]
  const values = t('about.values.items', { returnObjects: true }) as TextPair[]
  const taglines = t('about.brandPromise.taglines', { returnObjects: true }) as string[]

  return (
    <>
      <PageHero eyebrow={t('about.hero.eyebrow')} title={<>{t('about.hero.titlePre')}<span>{t('about.hero.titleSpan')}</span></>} bg={aboutHeroImg} bgPosition="center 30%" />

      {/* OUR STORY */}
      <section>
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
              <span className="eyebrow">{t('about.story.eyebrow')}</span>
              <h2>{t('about.story.heading')}</h2>
              <p style={{ color: 'var(--brown-soft)', marginTop: 14 }}>{t('about.story.p1')}</p>
              <p style={{ color: 'var(--brown-soft)', marginTop: 14 }}>{t('about.story.p2')}</p>
              <p style={{ color: 'var(--brown-soft)', marginTop: 14 }}>{t('about.story.p3')}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="alt">
        <div className="wrap">
          <div className="cards-2">
            <Reveal className="breed-card">
              <span className="eyebrow">{t('about.mission.eyebrow')}</span>
              <h3>{t('about.mission.heading')}</h3>
              <p>{t('about.mission.text')}</p>
            </Reveal>
            <Reveal className="breed-card">
              <span className="eyebrow">{t('about.vision.eyebrow')}</span>
              <h3>{t('about.vision.heading')}</h3>
              <p>{t('about.vision.text')}</p>
            </Reveal>
          </div>
          <Reveal className="hero-stats about-stats">
            {stats.map((s) => (
              <div key={s.label}><span className="n">{s.n}</span><small>{s.label}</small></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHY DESI */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('about.whyDesi.eyebrow')}</span>
            <h2>{t('about.whyDesi.headingPre')}<span className="script">{t('about.whyDesi.headingScript')}</span></h2>
            <p>{t('about.whyDesi.text')}</p>
          </Reveal>
          <div className="features features-4">
            {whyDesiItems.map((w) => (
              <Reveal key={w.title} className="feature">
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('about.whatWeDo.eyebrow')}</span>
            <h2>{t('about.whatWeDo.heading')}</h2>
            <p>{t('about.whatWeDo.text')}</p>
          </Reveal>
          <div className="features features-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} className="feature feature-link">
                <Link to={PILLAR_LINKS[i]}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('about.howWeWork.eyebrow')}</span>
            <h2>{t('about.howWeWork.heading')}</h2>
            <p>{t('about.howWeWork.text')}</p>
          </Reveal>
          <div className="cards-2">
            <Reveal className="panel">
              <h3>{t('about.howWeWork.farmersTitle')}</h3>
              <ul className="story-list">
                {farmersItems.map((f) => (
                  <li key={f}><span className="chk">✓</span> {f}</li>
                ))}
              </ul>
              <Link to="/contract-farming" className="panel-link">{t('about.howWeWork.farmersLink')}</Link>
            </Reveal>
            <Reveal className="panel">
              <h3>{t('about.howWeWork.buyersTitle')}</h3>
              <ul className="story-list">
                {buyersItems.map((f) => (
                  <li key={f}><span className="chk">✓</span> {f}</li>
                ))}
              </ul>
              <Link to="/b2b-supply" className="panel-link">{t('about.howWeWork.buyersLink')}</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow" style={{ color: 'var(--orange-light)' }}>{t('about.values.eyebrow')}</span>
            <h2>{t('about.values.heading')}</h2>
          </Reveal>
          <div className="vgrid vgrid-3">
            {values.map((v, i) => (
              <Reveal key={v.title} className="value">
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND PROMISE */}
      <section className="alt">
        <div className="wrap">
          <Reveal className="about-copy">
            <span className="script" style={{ fontSize: '1.5rem' }}>{t('about.brandPromise.script')}</span>
            <p>{t('about.brandPromise.text')}</p>
            <div className="chips" style={{ justifyContent: 'center' }}>
              {taglines.map((tg) => <span key={tg} className="pill">{tg}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="wrap">
          <MiniCta
            title={t('about.cta.title')}
            text={t('about.cta.text')}
            cta={t('about.cta.cta')}
            source="General Enquiry"
          />
        </div>
      </section>

      <VolumeCommitment alt />
    </>
  )
}
