import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { submitEnquiry } from '../lib/enquiryApi'
import { nameError, onlyDigits, phoneError } from '../lib/validation'

// Canonical (English) values sent to the backend — stay stable regardless of
// UI language so the admin dashboard's data is always consistent.
const INTEREST_VALUES = [
  'Whole Birds', 'Desi Eggs', 'Poultry Feed', 'Poultry Equipment', 'Farm Construction',
  'Contract Farming', 'Farmer Partnership', 'B2B Distribution',
]
const PRODUCT_VALUES = [
  'Sonali Birds', 'Aseel Birds', 'Kadaknath Birds', 'Fiyoumi Birds', 'Quail',
  'Sonali Eggs', 'Kadaknath Eggs', 'Aseel Eggs',
  'Poultry Feed', 'Farm Equipment', 'Not Applicable', 'Other',
]
const QUANTITY_VALUES = ['Daily', 'Weekly', 'Monthly', 'Contract']

export default function EnquiryForm() {
  const { t } = useTranslation()
  const interestLabels = t('contact.form.interests', { returnObjects: true }) as string[]
  const productLabels = t('contact.form.products', { returnObjects: true }) as string[]
  const quantityLabels = t('contact.form.quantities', { returnObjects: true }) as string[]

  const [interests, setInterests] = useState<string[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [product, setProduct] = useState('Sonali Birds')
  const [quantity, setQuantity] = useState('Weekly')
  const [location, setLocation] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const errors = { name: nameError(name), phone: phoneError(phone) }
  const isValid = !errors.name && !errors.phone

  const toggleInterest = (i: string) =>
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))

  const handleSubmit = async () => {
    setTouched({ name: true, phone: true })
    if (!isValid) return
    setStatus('sending')
    const ok = await submitEnquiry({
      source: 'B2B Enquiry',
      name,
      phone,
      details: {
        'Interested in': interests.join(', '),
        Product: product,
        Quantity: quantity,
        Location: location,
        'Business type': businessType,
        'Additional requirements': notes,
      },
    })
    setStatus(ok ? 'sent' : 'error')
  }

  if (status === 'sent') {
    return (
      <div className="enquiry enquiry-sent">
        <h3>{t('contact.form.sentTitle')}</h3>
        <p>{t('contact.form.sentText', { namePart: name ? `, ${name}` : '' })}</p>
      </div>
    )
  }

  return (
    <form className="enquiry" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
      <fieldset className="enq-block">
        <legend>{t('contact.form.interestedIn')}</legend>
        <div className="check-grid">
          {INTEREST_VALUES.map((i, idx) => (
            <label key={i} className={`check ${interests.includes(i) ? 'on' : ''}`}>
              <input
                type="checkbox"
                checked={interests.includes(i)}
                onChange={() => toggleInterest(i)}
              />
              {interestLabels[idx]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="enq-block">
        <legend>{t('contact.form.myRequirement')}</legend>
        <div className="field-grid">
          <label>
            {t('contact.form.yourName')}
            <input
              type="text"
              value={name}
              placeholder={t('contact.form.fullName')}
              required
              className={touched.name && errors.name ? 'field-invalid' : ''}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((t2) => ({ ...t2, name: true }))}
            />
            {touched.name && errors.name && <span className="field-error">{errors.name}</span>}
          </label>
          <label>
            {t('contact.form.phone')}
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              placeholder="+91 …"
              required
              maxLength={13}
              className={touched.phone && errors.phone ? 'field-invalid' : ''}
              onChange={(e) => setPhone(onlyDigits(e.target.value))}
              onBlur={() => setTouched((t2) => ({ ...t2, phone: true }))}
            />
            {touched.phone && errors.phone && <span className="field-error">{errors.phone}</span>}
          </label>
          <label>
            {t('contact.form.product')}
            <select value={product} onChange={(e) => setProduct(e.target.value)}>
              {PRODUCT_VALUES.map((p, idx) => <option key={p} value={p}>{productLabels[idx]}</option>)}
            </select>
          </label>
          <label>
            {t('contact.form.quantity')}
            <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
              {QUANTITY_VALUES.map((q, idx) => <option key={q} value={q}>{quantityLabels[idx]}</option>)}
            </select>
          </label>
          <label>
            {t('contact.form.location')}
            <input type="text" value={location} placeholder={t('contact.form.locationPlaceholder')} onChange={(e) => setLocation(e.target.value)} />
          </label>
          <label>
            {t('contact.form.businessType')}
            <input type="text" value={businessType} placeholder={t('contact.form.businessTypePlaceholder')} onChange={(e) => setBusinessType(e.target.value)} />
          </label>
          <label className="full">
            {t('contact.form.additionalRequirements')}
            <textarea rows={4} value={notes} placeholder={t('contact.form.additionalPlaceholder')} onChange={(e) => setNotes(e.target.value)} />
          </label>
        </div>
      </fieldset>

      <button type="submit" className="btn btn-lg" disabled={status === 'sending' || (Object.values(touched).some(Boolean) && !isValid)}>
        {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
      </button>
      {status === 'error' && (
        <p className="enq-error">{t('contact.form.error')}</p>
      )}
    </form>
  )
}
