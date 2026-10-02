import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ModalShell from './ModalShell'
import { submitEnquiry } from '../lib/enquiryApi'
import { nameError, onlyDigits, phoneError } from '../lib/validation'
import { phoneDisplay, telHref, useSiteSettings } from '../lib/siteSettings'

// Canonical (English) values sent to the backend — stay stable regardless of
// UI language so the admin dashboard's data is always consistent. Labels come
// from i18n arrays in the same order.
const SHED_TYPE_VALUES = ['Open-sided', 'Closed / environment-controlled', 'Deep litter', 'Cage system', 'Free-range / pasture', 'Mixed']
const BREED_VALUES = ['Sonali', 'Aseel', 'Kadaknath', 'Fiyoumi', 'Broiler', 'Layer', 'Quail', 'Other']

type FlockRow = { id: number; breed: string; count: string }
let nextRowId = 1
const newRow = (breed = BREED_VALUES[0]): FlockRow => ({ id: nextRowId++, breed, count: '' })
const STATUS_VALUES = ['Running now', 'Partly running', 'Closed / idle']
const EQUIPMENT_VALUES = [
  'Feeders', 'Drinkers / nipple lines', 'Brooders', 'Incubator / hatchery',
  'Egg trays / storage', 'Feed store room', 'Electricity connection', 'Power backup / generator',
  'Water source (borewell)', 'Fencing / boundary wall', 'Worker room / quarters', 'Road access for trucks',
]
const DURATION_VALUES = ['1 year', '2–3 years', '5 years or more', 'Open to discuss']

export default function FarmLeaseModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useTranslation()
  const settings = useSiteSettings()
  const f = (k: string) => t(`contractFarming.farmLease.form.${k}`)
  const list = (k: string) => t(`contractFarming.farmLease.form.${k}`, { returnObjects: true }) as string[]

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [farmArea, setFarmArea] = useState('')
  const [shedCount, setShedCount] = useState('')
  const [shedArea, setShedArea] = useState('')
  const [shedType, setShedType] = useState(SHED_TYPE_VALUES[0])
  const [flock, setFlock] = useState<FlockRow[]>(() => [newRow()])
  const [noBirds, setNoBirds] = useState(false)
  const [farmStatus, setFarmStatus] = useState(STATUS_VALUES[0])
  const [equipment, setEquipment] = useState<string[]>([])
  const [duration, setDuration] = useState(DURATION_VALUES[3])
  const [rent, setRent] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const errors = { name: nameError(name), phone: phoneError(phone) }
  const isValid = !errors.name && !errors.phone

  useEffect(() => {
    if (!isOpen) return
    // reset each time it opens
    setName(''); setPhone(''); setLocation(''); setFarmArea(''); setShedCount(''); setShedArea('')
    setShedType(SHED_TYPE_VALUES[0]); setFlock([newRow()]); setNoBirds(false); setFarmStatus(STATUS_VALUES[0])
    setEquipment([]); setDuration(DURATION_VALUES[3]); setRent(''); setNotes(''); setStatus('idle'); setTouched({})
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  const toggleEquipment = (v: string) =>
    setEquipment((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]))

  const updateRow = (id: number, patch: Partial<FlockRow>) =>
    setFlock((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  const removeRow = (id: number) => setFlock((rows) => rows.filter((r) => r.id !== id))
  const addRow = () =>
    // default the new row to the first breed not already listed
    setFlock((rows) => [...rows, newRow(BREED_VALUES.find((b) => !rows.some((r) => r.breed === b)) ?? BREED_VALUES[0])])

  const totalBirds = flock.reduce((sum, r) => sum + (Number(r.count) || 0), 0)

  const handleSubmit = async () => {
    setTouched({ name: true, phone: true })
    if (!isValid) return
    setStatus('sending')
    const missing = EQUIPMENT_VALUES.filter((v) => !equipment.includes(v))
    const ok = await submitEnquiry({
      source: 'Farm Lease',
      name,
      phone,
      details: {
        'Interested in': 'Lease farm to Energy Eggs',
        Location: location,
        'Total farm area (sq ft)': farmArea,
        'Sheds / coops': shedCount,
        'Total shed area (sq ft)': shedArea,
        'Shed type': shedType,
        'Birds on farm': noBirds
          ? 'No birds currently'
          : flock.map((r) => `${r.breed}: ${r.count || '?'}`).join(', '),
        'Total birds': noBirds ? '0' : totalBirds ? String(totalBirds) : '',
        'Farm status': farmStatus,
        'Equipment available': equipment.join(', ') || 'None selected',
        'Equipment not available': missing.join(', '),
        'Preferred lease duration': duration,
        'Expected monthly rent (₹)': rent,
        'Additional notes': notes,
      },
    })
    setStatus(ok ? 'sent' : 'error')
  }

  const numberInput = (value: string, set: (v: string) => void, placeholder: string) => (
    <input
      type="text"
      inputMode="numeric"
      value={value}
      placeholder={placeholder}
      maxLength={9}
      onChange={(e) => set(onlyDigits(e.target.value))}
    />
  )

  const shedTypeLabels = list('shedTypes')
  const breedLabels = list('breeds')
  const statusLabels = list('statuses')
  const equipmentLabels = list('equipment')
  const durationLabels = list('durations')

  return (
    <ModalShell open={isOpen} onClose={onClose} label={f('title')} className="modal modal-wide">
      {isOpen && (
        <>
          <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>✕</button>

          {status === 'sent' ? (
            <div className="modal-form modal-sent">
              <h4>{f('sentTitle')}</h4>
              <p>{t('contractFarming.farmLease.form.sentText', { namePart: name ? `, ${name}` : '' })}</p>
              <div className="modal-actions">
                <button type="button" className="btn" onClick={onClose}>{f('done')}</button>
              </div>
            </div>
          ) : (
            <>
              <span className="eyebrow">{f('eyebrow')}</span>
              <h3>{f('title')}</h3>
              <p className="modal-sub">{f('subtitle')}</p>
              <form className="field-grid modal-form" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                <p className="full lease-group">{f('groupContact')}</p>
                <label>
                  {f('name')}
                  <input
                    type="text"
                    value={name}
                    placeholder={f('namePlaceholder')}
                    required
                    className={touched.name && errors.name ? 'field-invalid' : ''}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((x) => ({ ...x, name: true }))}
                  />
                  {touched.name && errors.name && <span className="field-error">{errors.name}</span>}
                </label>
                <label>
                  {f('phone')}
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    placeholder="+91 …"
                    required
                    maxLength={13}
                    className={touched.phone && errors.phone ? 'field-invalid' : ''}
                    onChange={(e) => setPhone(onlyDigits(e.target.value))}
                    onBlur={() => setTouched((x) => ({ ...x, phone: true }))}
                  />
                  {touched.phone && errors.phone && <span className="field-error">{errors.phone}</span>}
                </label>
                <label className="full">
                  {f('location')}
                  <input type="text" value={location} placeholder={f('locationPlaceholder')} onChange={(e) => setLocation(e.target.value)} />
                </label>

                <p className="full lease-group">{f('groupFarm')}</p>
                <label>
                  {f('farmArea')}
                  {numberInput(farmArea, setFarmArea, f('farmAreaPlaceholder'))}
                </label>
                <label>
                  {f('farmStatus')}
                  <select value={farmStatus} onChange={(e) => setFarmStatus(e.target.value)}>
                    {STATUS_VALUES.map((v, i) => <option key={v} value={v}>{statusLabels[i]}</option>)}
                  </select>
                </label>
                <label>
                  {f('shedCount')}
                  {numberInput(shedCount, setShedCount, f('shedCountPlaceholder'))}
                </label>
                <label>
                  {f('shedArea')}
                  {numberInput(shedArea, setShedArea, f('shedAreaPlaceholder'))}
                </label>
                <label className="full">
                  {f('shedType')}
                  <select value={shedType} onChange={(e) => setShedType(e.target.value)}>
                    {SHED_TYPE_VALUES.map((v, i) => <option key={v} value={v}>{shedTypeLabels[i]}</option>)}
                  </select>
                </label>

                <p className="full lease-group">{f('groupBirds')}</p>
                <div className="full lease-flock">
                  <label className={`check ${noBirds ? 'on' : ''}`}>
                    <input type="checkbox" checked={noBirds} onChange={() => setNoBirds((v) => !v)} />
                    {f('noBirds')}
                  </label>
                  {!noBirds && (
                    <>
                      <p className="lease-hint">{f('birdsHint')}</p>
                      {flock.map((r) => (
                        <div key={r.id} className={`flock-row ${flock.length > 1 ? 'has-remove' : ''}`}>
                          <label>
                            {f('breed')}
                            <select value={r.breed} onChange={(e) => updateRow(r.id, { breed: e.target.value })}>
                              {BREED_VALUES.map((v, i) => <option key={v} value={v}>{breedLabels[i]}</option>)}
                            </select>
                          </label>
                          <label>
                            {f('birdCount')}
                            {numberInput(r.count, (v) => updateRow(r.id, { count: v }), f('birdCountPlaceholder'))}
                          </label>
                          {flock.length > 1 && (
                            <button type="button" className="flock-remove" aria-label={f('removeBreed')} title={f('removeBreed')} onClick={() => removeRow(r.id)}>✕</button>
                          )}
                        </div>
                      ))}
                      <div className="flock-foot">
                        <button type="button" className="btn ghost sm" onClick={addRow}>{f('addBreed')}</button>
                        {flock.length > 1 && totalBirds > 0 && (
                          <span className="flock-total">{f('totalBirds')}: <b>{totalBirds.toLocaleString('en-IN')}</b></span>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <fieldset className="full lease-equipment">
                  <legend className="lease-group">{f('groupEquipment')}</legend>
                  <p className="lease-hint">{f('equipmentHint')}</p>
                  <div className="check-grid">
                    {EQUIPMENT_VALUES.map((v, i) => (
                      <label key={v} className={`check ${equipment.includes(v) ? 'on' : ''}`}>
                        <input type="checkbox" checked={equipment.includes(v)} onChange={() => toggleEquipment(v)} />
                        {equipmentLabels[i]}
                      </label>
                    ))}
                  </div>
                  <div className="lease-reassure">
                    <span className="lease-reassure-ic" aria-hidden="true">✓</span>
                    <div>
                      <strong>{f('reassureTitle')}</strong>
                      <p>{f('reassureText')}</p>
                    </div>
                  </div>
                </fieldset>

                <p className="full lease-group">{f('groupLease')}</p>
                <label>
                  {f('duration')}
                  <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                    {DURATION_VALUES.map((v, i) => <option key={v} value={v}>{durationLabels[i]}</option>)}
                  </select>
                </label>
                <label>
                  {f('rent')}
                  {numberInput(rent, setRent, f('rentPlaceholder'))}
                </label>
                <label className="full">
                  {f('notes')}
                  <textarea rows={3} value={notes} placeholder={f('notesPlaceholder')} onChange={(e) => setNotes(e.target.value)} />
                </label>

                <div className="full modal-actions">
                  <button type="submit" className="btn" disabled={status === 'sending' || (Object.values(touched).some(Boolean) && !isValid)}>
                    {status === 'sending' ? f('sending') : f('submit')}
                  </button>
                  <button type="button" className="btn ghost" onClick={onClose}>{f('cancel')}</button>
                </div>
                {status === 'error' && <p className="full enq-error">{f('error')}</p>}
              </form>
              <p className="modal-call lease-call">
                <span>{f('preferCall')}</span>
                <a href={telHref(settings)}>📞 {phoneDisplay(settings)}</a>
              </p>
            </>
          )}
        </>
      )}
    </ModalShell>
  )
}
