// Business details (phone, email, tagline, minimum order)
// edited in the EEdashboard → Settings page.
//
// Two layers so they're both SEO-correct and live:
//  1. Build time: scripts/prerender.mjs fetches /api/settings/public and bakes
//     the values into every prerendered page (and window.__EE_SETTINGS__).
//  2. Run time: SiteSettingsProvider re-fetches on load, so a change in the
//     dashboard reaches visitors without a redeploy.
// DEFAULT_SETTINGS is the last-resort fallback if the API is unreachable.
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import i18n from '../i18n'

export type SiteSettings = {
  businessName: string
  tagline: string
  phone: string
  email: string
  website: string
  minBirdOrder: string
}

export const DEFAULT_SETTINGS: SiteSettings = {
  businessName: 'Energy Eggs',
  tagline: 'Nourishing Lives. Naturally.',
  phone: '7878787226',
  email: 'hello@energyeggs.in',
  website: 'www.energyeggs.in',
  minBirdOrder: '10',
}

const API_URL: string = import.meta.env.VITE_EE_API_URL || 'https://ee-dashboard-server.vercel.app'

/** Keeps only known, non-empty string fields from an API response. */
export function mergeSettings(base: SiteSettings, incoming: unknown): SiteSettings {
  const next = { ...base }
  if (incoming && typeof incoming === 'object') {
    for (const k of Object.keys(DEFAULT_SETTINGS) as (keyof SiteSettings)[]) {
      const v = (incoming as Record<string, unknown>)[k]
      if (typeof v === 'string' && v.trim()) next[k] = v.trim()
    }
  }
  return next
}

export async function fetchPublicSettings(signal?: AbortSignal): Promise<Partial<SiteSettings>> {
  const res = await fetch(`${API_URL}/api/settings/public`, { signal })
  if (!res.ok) throw new Error(`settings ${res.status}`)
  return res.json()
}

// ---- formatting helpers ----

/** Last 10 digits of an Indian mobile number. */
export const phoneDigits = (s: SiteSettings) => s.phone.replace(/\D/g, '').slice(-10)
/** E.164 for tel: links, e.g. +917878787226 */
export const phoneE164 = (s: SiteSettings) => `+91${phoneDigits(s)}`
/** Human format, e.g. +91 78787 87226 */
export const phoneDisplay = (s: SiteSettings) => {
  const d = phoneDigits(s)
  return d.length === 10 ? `+91 ${d.slice(0, 5)} ${d.slice(5)}` : s.phone
}
export const telHref = (s: SiteSettings) => `tel:${phoneE164(s)}`
export const whatsappHref = (s: SiteSettings) => `https://wa.me/91${phoneDigits(s)}`
/**
 * Rate-card notes are typed in the dashboard's Rate Cards editor ("Minimum
 * order: 10 birds", "Orders under 10 birds…"). Settings → Minimum bird order is
 * the source of truth, so swap its value into those phrases when displaying.
 */
export const withMinOrder = (text: string, s: SiteSettings) =>
  text.replace(/((?:minimum order:?|under|less than|below)\s+)\d+(?=\s+birds\b)/gi, `$1${s.minBirdOrder}`)
/** Site address without protocol, for print headers. */
export const websiteDisplay = (s: SiteSettings) => s.website.replace(/^https?:\/\//, '').replace(/\/$/, '')

// ---- i18n: translations use {{phone}}, {{minOrder}}, {{tagline}} placeholders ----

export function applySettingsToI18n(s: SiteSettings) {
  const interpolation = (i18n.options.interpolation ??= {})
  interpolation.defaultVariables = {
    ...interpolation.defaultVariables,
    phone: phoneDisplay(s),
    minOrder: s.minBirdOrder,
    tagline: s.tagline,
    email: s.email,
    businessName: s.businessName,
  }
}

// ---- React context ----

declare global {
  interface Window { __EE_SETTINGS__?: Partial<SiteSettings> }
}

/** Settings the page was built with (baked into the HTML by the prerender). */
export function initialSettings(): SiteSettings {
  const baked = typeof window !== 'undefined' ? window.__EE_SETTINGS__ : undefined
  return mergeSettings(DEFAULT_SETTINGS, baked)
}

const SiteSettingsContext = createContext<SiteSettings>(DEFAULT_SETTINGS)

export function SiteSettingsProvider({ initial, children, live = true }: {
  initial: SiteSettings
  children: ReactNode
  /** false during the build-time prerender (no fetch on the server) */
  live?: boolean
}) {
  const [settings, setSettings] = useState(() => {
    applySettingsToI18n(initial)
    return initial
  })

  useEffect(() => {
    if (!live) return
    const ctrl = new AbortController()
    fetchPublicSettings(ctrl.signal)
      .then((data) => {
        const next = mergeSettings(initial, data)
        if (JSON.stringify(next) === JSON.stringify(initial)) return
        applySettingsToI18n(next)
        setSettings(next)
        // re-render every useTranslation() consumer so {{phone}} etc. refresh
        i18n.emit('languageChanged', i18n.language)
      })
      .catch(() => { /* keep the baked-in values */ })
    return () => ctrl.abort()
  }, [live, initial])

  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>
}

export const useSiteSettings = () => useContext(SiteSettingsContext)
