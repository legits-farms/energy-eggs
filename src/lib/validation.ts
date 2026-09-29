// Shared form validation — keeps garbage like "515251511" as a name or
// "dfcdc" as a phone number out of the enquiry forms.

const NAME_RE = /^(?=.*[A-Za-z])[A-Za-z .'-]{2,80}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const INDIAN_MOBILE_RE = /^[6-9]\d{9}$/

// Strips everything but digits — use in a phone input's onChange so only
// numbers can ever be typed/pasted in.
export function onlyDigits(v: string): string {
  return String(v || '').replace(/\D/g, '')
}

// "+91 98765-43210" -> "9876543210"
export function normalizePhone(v: string): string {
  let digits = String(v || '').replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return digits
}

export function isValidName(v: string): boolean {
  return NAME_RE.test(String(v || '').trim())
}

export function isValidPhone(v: string): boolean {
  return INDIAN_MOBILE_RE.test(normalizePhone(v))
}

export function isValidEmail(v: string): boolean {
  return EMAIL_RE.test(String(v || '').trim())
}

export const nameError = (v: string) =>
  isValidName(v) ? '' : 'Enter a valid name (letters only)'

export const phoneError = (v: string) =>
  isValidPhone(v) ? '' : 'Enter a valid 10-digit mobile number'

export const emailError = (v: string) =>
  !v || isValidEmail(v) ? '' : 'Enter a valid email address'
