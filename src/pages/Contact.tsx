import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Reveal from '../components/Reveal'
import PageHero from '../components/PageHero'
import EnquiryForm from '../components/EnquiryForm'
import { LocaleLink as Link } from '../components/LocaleLink'
import { phoneDisplay, telHref, whatsappHref, useSiteSettings, type SiteSettings } from '../lib/siteSettings'

// Contact details come from the dashboard → Settings (see lib/siteSettings)
const channelsFor = (s: SiteSettings): { href: string; key: string; value: string; badgeKey?: string; icon: ReactNode }[] => [
  {
    href: telHref(s),
    key: 'callLabel',
    value: phoneDisplay(s),
    badgeKey: 'callBadge',
    icon: <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  },
  {
    href: whatsappHref(s),
    key: 'whatsappLabel',
    value: phoneDisplay(s),
    icon: (
      <>
        <path d="M12 3a9 9 0 0 0-7.6 13.8L3 21l4.4-1.3A9 9 0 1 0 12 3z" />
        <path d="M9 8.5c0 4 2.5 6.5 6.5 6.5l.5-2-2-1-1 1c-1.2-.6-2-1.4-2.5-2.5l1-1-1-2z" />
      </>
    ),
  },
  {
    href: `mailto:${s.email}`,
    key: 'emailLabel',
    value: s.email,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
]

const CHIP_LINKS = ['/birds', '/eggs', '/contract-farming']

type TextPair = { title: string; text: string }

export default function Contact() {
  const { t } = useTranslation()
  const settings = useSiteSettings()
  const tips = t('contact.side.tips', { returnObjects: true }) as string[]
  const chips = t('contact.side.chips', { returnObjects: true }) as string[]
  const nextSteps = t('contact.nextSteps.items', { returnObjects: true }) as TextPair[]

  return (
    <>
      <PageHero eyebrow={t('contact.hero.eyebrow')} title={<>{t('contact.hero.titlePre')}<span>{t('contact.hero.titleSpan')}</span></>}>
        <p>{t('contact.hero.text')}</p>
      </PageHero>

      <section>
        <div className="wrap">
          <div className="contact-channels">
            {channelsFor(settings).map((c) => (
              <Reveal key={c.key} className="in">
                <a
                  className={`channel${c.badgeKey ? ' featured' : ''}`}
                  href={c.href}
                  {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {c.badgeKey && <span className="channel-badge">{t(`contact.channels.${c.badgeKey}`)}</span>}
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {c.icon}
                    </svg>
                  </span>
                  <span>
                    <small>{t(`contact.channels.${c.key}`)}</small>
                    <b>{c.value}</b>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="contact-grid">
            <Reveal className="panel contact-side">
              <h3>{t('contact.side.heading')}</h3>
              <p className="contact-note">{t('contact.side.note')}</p>
              <h4 className="contact-sub">{t('contact.side.tipsHeading')}</h4>
              <ul className="story-list">
                {tips.map((tip) => (
                  <li key={tip}><span className="chk">✓</span> {tip}</li>
                ))}
              </ul>
              <h4 className="contact-sub">{t('contact.side.beforeHeading')}</h4>
              <div className="chips contact-chips">
                {chips.map((c, i) => (
                  <Link key={c} to={CHIP_LINKS[i]} className="pill">{c}</Link>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">{t('contact.nextSteps.eyebrow')}</span>
            <h2>{t('contact.nextSteps.heading')}</h2>
          </Reveal>
          <div className="steps">
            {nextSteps.map((s, i) => (
              <Reveal key={s.title} className="step">
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
