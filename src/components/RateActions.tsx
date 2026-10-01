import logo from '../assets/logo.webp'
import { useEnquiry } from './EnquiryModal'

// Download (print-to-PDF) + Share actions for a rate page, plus a print-only letterhead.
// Place directly after the PageHero. Screen bar hides in print; letterhead shows in print.
export default function RateActions({ title = 'B2B Rate Card' }: { title?: string }) {
  const { open } = useEnquiry()

  const gate = (after: () => void, submitLabel: string) => open({
    source: 'Rate Card Download',
    interest: title,
    title: `Get the ${title}`,
    subtitle: 'Enter your details to view and download our full B2B rates.',
    submitLabel,
    sentText: 'Thanks! Continuing…',
    onSubmitted: after,
  })

  const download = () => gate(() => setTimeout(() => window.print(), 40), 'Get the PDF')

  const doShare = async () => {
    const url = window.location.href
    const data = {
      title: `Energy Eggs — ${title}`,
      text: `Energy Eggs published ${title.toLowerCase()}.`,
      url,
    }
    if (typeof navigator !== 'undefined' && navigator.share) {
      try { await navigator.share(data) } catch { /* cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard')
      } catch {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${data.text} ${url}`)}`, '_blank')
      }
    }
  }

  const share = () => gate(() => { void doShare() }, 'Share the Rate Card')

  return (
    <>
      {/* print-only letterhead */}
      <div className="print-head" aria-hidden="true">
        <img src={logo} alt="Energy Eggs" />
        <div className="print-head-meta">
          <strong>{title}</strong>
          <span>www.energyeggs.in · +91 78787 87226 · hello@energyeggs.in</span>
        </div>
      </div>

      {/* screen actions */}
      <div className="rate-actions-bar">
        <div className="wrap rate-actions">
          <button type="button" className="btn" onClick={download}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12" /><path d="M8 11l4 4 4-4" /><path d="M4 21h16" />
            </svg>
            Download PDF
          </button>
          <button type="button" className="btn ghost" onClick={share}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </>
  )
}
