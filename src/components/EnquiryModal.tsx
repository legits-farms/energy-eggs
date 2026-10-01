import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import ModalShell from './ModalShell'
import { submitEnquiry } from '../lib/enquiryApi'
import { emailError, nameError, onlyDigits, phoneError } from '../lib/validation'
import { CALL_DISPLAY, CALL_NUMBER } from './CallButton'

type OpenOpts = {
  source?: string   // where the enquiry came from (button/section)
  interest?: string // pre-filled interest line
  title?: string    // modal heading
  subtitle?: string
  submitLabel?: string     // custom submit button text
  sentText?: string        // custom thank-you body
  onSubmitted?: () => void // called after a successful submit (e.g. start a download)
}

type Ctx = { open: (opts?: OpenOpts) => void }
const EnquiryContext = createContext<Ctx | null>(null)

export function useEnquiry() {
  const ctx = useContext(EnquiryContext)
  if (!ctx) throw new Error('useEnquiry must be used within EnquiryProvider')
  return ctx
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [opts, setOpts] = useState<OpenOpts | null>(null)

  const open = useCallback((o?: OpenOpts) => setOpts(o ?? {}), [])
  const close = useCallback(() => setOpts(null), [])

  return (
    <EnquiryContext.Provider value={{ open }}>
      {children}
      <EnquiryDialog opts={opts} onClose={close} />
    </EnquiryContext.Provider>
  )
}

function EnquiryDialog({ opts, onClose }: { opts: OpenOpts | null; onClose: () => void }) {
  const isOpen = opts !== null
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const errors = { name: nameError(name), phone: phoneError(phone), email: emailError(email) }
  const isValid = !errors.name && !errors.phone && !errors.email

  useEffect(() => {
    if (!isOpen) return
    // reset each time it opens
    setName(''); setPhone(''); setEmail(''); setMessage(''); setStatus('idle'); setTouched({})
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  const handleSubmit = async () => {
    setTouched({ name: true, phone: true, email: true })
    if (!isValid) return
    setStatus('sending')
    const details: Record<string, string> = {}
    if (opts?.interest) details['Interested in'] = opts.interest
    if (message) details['Message'] = message
    const ok = await submitEnquiry({
      source: opts?.source || 'Website Enquiry',
      name,
      phone,
      email,
      details,
    })
    if (ok) {
      setStatus('sent')
      opts?.onSubmitted?.()
    } else {
      setStatus('error')
    }
  }

  return (
    <ModalShell open={isOpen} onClose={onClose} label={opts?.title || 'Enquiry'}>
      {isOpen && (
        <>
          <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>✕</button>

          {status === 'sent' ? (
            <div className="modal-form modal-sent">
              <h4>Enquiry received ✓</h4>
              <p>{opts?.sentText || `Thanks${name ? `, ${name}` : ''}! Our B2B team will get back to you shortly.`}</p>
              <div className="modal-actions">
                <button type="button" className="btn" onClick={onClose}>Done</button>
              </div>
            </div>
          ) : (
            <>
              <span className="eyebrow">{opts?.source || 'Get in touch'}</span>
              <h3>{opts?.title || 'Send an enquiry'}</h3>
              <p className="modal-sub">
                {opts?.subtitle || 'Share your details and our B2B team will get back with the next steps.'}
              </p>
              <form className="field-grid modal-form" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                <label>
                  Your Name
                  <input
                    type="text"
                    value={name}
                    placeholder="Full name"
                    required
                    className={touched.name && errors.name ? 'field-invalid' : ''}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  />
                  {touched.name && errors.name && <span className="field-error">{errors.name}</span>}
                </label>
                <label>
                  Phone
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    placeholder="+91 …"
                    required
                    maxLength={13}
                    className={touched.phone && errors.phone ? 'field-invalid' : ''}
                    onChange={(e) => setPhone(onlyDigits(e.target.value))}
                    onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                  />
                  {touched.phone && errors.phone && <span className="field-error">{errors.phone}</span>}
                </label>
                <label className="full">
                  Business Email
                  <input
                    type="email"
                    value={email}
                    placeholder="you@business.com"
                    className={touched.email && errors.email ? 'field-invalid' : ''}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  />
                  {touched.email && errors.email && <span className="field-error">{errors.email}</span>}
                </label>
                {opts?.interest && (
                  <label className="full">
                    Interested In
                    <input type="text" value={opts.interest} readOnly />
                  </label>
                )}
                <label className="full">
                  Your Requirement
                  <textarea
                    rows={3}
                    value={message}
                    placeholder="Tell us about your land, volumes, timelines or requirement…"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </label>
                <div className="full modal-actions">
                  <button type="submit" className="btn" disabled={status === 'sending' || (Object.values(touched).some(Boolean) && !isValid)}>
                    {status === 'sending' ? 'Sending…' : (opts?.submitLabel || 'Send Enquiry')}
                  </button>
                  <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
                </div>
                {status === 'error' && (
                  <p className="full enq-error">Something went wrong sending your enquiry. Please try again, or call us directly.</p>
                )}
              </form>
              <p className="modal-call">
                Prefer to talk? Call us at <a href={`tel:${CALL_NUMBER}`}>{CALL_DISPLAY}</a>
              </p>
            </>
          )}
        </>
      )}
    </ModalShell>
  )
}
