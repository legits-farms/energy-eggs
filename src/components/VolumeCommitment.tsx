import { useTranslation } from 'react-i18next'
import Reveal from './Reveal'
import MiniCta from './MiniCta'

export default function VolumeCommitment({ alt = false }: { alt?: boolean }) {
  const { t } = useTranslation()
  const items = t('volumeCommitment.items', { returnObjects: true }) as string[]

  return (
    <section id="volume-commitment" className={alt ? 'alt' : ''}>
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="eyebrow">{t('volumeCommitment.eyebrow')}</span>
          <h2>{t('volumeCommitment.heading')}</h2>
          <p>{t('volumeCommitment.text')}</p>
        </Reveal>
        <Reveal className="panel narrow">
          <h3>{t('volumeCommitment.underHeading')}</h3>
          <ul className="story-list">
            {items.map((c) => (
              <li key={c}><span className="chk">✓</span> {c}</li>
            ))}
          </ul>
        </Reveal>
        <MiniCta
          title={t('volumeCommitment.cta.title')}
          text={t('volumeCommitment.cta.text')}
          cta={t('volumeCommitment.cta.cta')}
        />
      </div>
    </section>
  )
}
