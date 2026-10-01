import { useEffect, useRef, useState } from 'react'
import ModalShell from './ModalShell'
import { submitEnquiry } from '../lib/enquiryApi'
import { emailError, nameError, onlyDigits, phoneError } from '../lib/validation'

export type QuoteKind = 'birds' | 'eggs' | 'equipment'

const OPTIONS: Record<QuoteKind, string[]> = {
  birds: ['Sonali Birds', 'Aseel Birds', 'Kadaknath Birds', 'Fiyoumi Birds', 'Quail'],
  eggs: ['Sonali Eggs', 'Kadaknath Eggs', 'Aseel Eggs'],
  equipment: ['Feeders', 'Drinkers & Watering', 'Brooding Systems', 'Handling & Transport', 'Tools & Accessories', 'Husk & Litter', 'Complete Farm Setup'],
}

const COPY: Record<QuoteKind, [eyebrow: string, title: string]> = {
  birds: ['Live Bird Order', 'Get the Birds'],
  eggs: ['Egg Supply Order', 'Get the Eggs'],
  equipment: ['Equipment Order', 'Get the Equipment'],
}

const QTY_PLACEHOLDER: Record<QuoteKind, string> = {
  birds: 'e.g. 100 birds, weekly',
  eggs: 'e.g. 10,000 eggs / month',
  equipment: 'e.g. setup for a 5,000-bird shed',
}

function QuoteForm({ kind, initialInterest, options, onClose }: { kind: QuoteKind; initialInterest?: string; options?: string[]; onClose: () => void }) {
  const optionList = options && options.length ? options : OPTIONS[kind]
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState<string[]>(
    initialInterest && optionList.includes(initialInterest) ? [initialInterest] : [optionList[0]],
  )
  const [quantity, setQuantity] = useState('')
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const errors = { name: nameError(name), phone: phoneError(phone), email: emailError(email) }
  const isValid = !errors.name && !errors.phone && !errors.email

  const toggleInterest = (o: string) =>
    setInterests((prev) => (prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]))

  const interest = interests.join(', ')

  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setPickerOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async () => {
    setTouched({ name: true, phone: true, email: true })
    if (!isValid) return
    setStatus('sending')
    const ok = await submitEnquiry({
      source: COPY[kind][0],
      name,
      phone,
      email,
      details: { 'Interested in': interest, Quantity: quantity },
    })
    setStatus(ok ? 'sent' : 'error')
  }

  if (status === 'sent') {
    return (
      <div className="modal-form modal-sent">
        <h4>Enquiry received ✓</h4>
        <p>Thanks{name ? `, ${name}` : ''}! Our B2B team will get back to you shortly.</p>
        <div className="modal-actions">
          <button type="button" className="btn" onClick={onClose}>Done</button>
        </div>
      </div>
    )
  }

  return (
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
      <label>
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
      <div className="full multi" ref={pickerRef}>
        <span className="multi-label">Interested In</span>
        <button
          type="button"
          className={`multi-field ${pickerOpen ? 'open' : ''}`}
          onClick={() => setPickerOpen((v) => !v)}
          aria-expanded={pickerOpen}
          aria-haspopup="listbox"
        >
          {interests.length === 0 && <span className="multi-ph">Select products…</span>}
          {interests.map((i) => (
            <span key={i} className="multi-tag">
              {i}
              <span
                role="button"
                aria-label={`Remove ${i}`}
                onClick={(e) => { e.stopPropagation(); toggleInterest(i) }}
              >
                ✕
              </span>
            </span>
          ))}
          <span className="multi-caret" aria-hidden="true">▾</span>
        </button>
        {pickerOpen && (
          <ul className="multi-menu" role="listbox" aria-multiselectable="true">
            {optionList.map((o) => {
              const on = interests.includes(o)
              return (
                <li key={o}>
                  <button type="button" role="option" aria-selected={on} className={on ? 'on' : ''} onClick={() => toggleInterest(o)}>
                    <span className="multi-check" aria-hidden="true">{on ? '✓' : ''}</span>
                    {o}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <label className="full">
        Quantity
        <input
          type="text"
          value={quantity}
          placeholder={QTY_PLACEHOLDER[kind]}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>
      <div className="full modal-actions">
        <button type="submit" className="btn" disabled={status === 'sending' || interests.length === 0 || (Object.values(touched).some(Boolean) && !isValid)}>
          {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
        </button>
        <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
      </div>
      {status === 'error' && (
        <p className="full enq-error">Something went wrong sending your enquiry. Please try again, or call us directly.</p>
      )}
    </form>
  )
}

export default function GetQuoteModal({ kind, interest, options, onClose }: { kind: QuoteKind | null; interest?: string; options?: string[]; onClose: () => void }) {
  useEffect(() => {
    if (!kind) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [kind, onClose])

  return (
    <ModalShell open={!!kind} onClose={onClose} label={kind ? `${COPY[kind][1]} enquiry` : 'Enquiry'}>
      {kind && (
        <>
          <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>✕</button>
          <span className="eyebrow">{COPY[kind][0]}</span>
          <h3>{COPY[kind][1]}</h3>
          <p className="modal-sub">
            Share your details — our B2B team will get back with availability and a structured quote.
          </p>
          <QuoteForm key={kind} kind={kind} initialInterest={interest} options={options} onClose={onClose} />
        </>
      )}
    </ModalShell>
  )
}
