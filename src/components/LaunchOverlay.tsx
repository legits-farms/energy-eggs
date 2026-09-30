import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'

const API_URL: string = import.meta.env.VITE_EE_API_URL || 'https://ee-dashboard-server.vercel.app'
const POLL_MS = 20000

type LaunchState = { live: boolean; launchAt: string | null; serverNow: string }

async function fetchLaunch(): Promise<LaunchState> {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 8000)
  try {
    const res = await fetch(`${API_URL}/api/launch`, { cache: 'no-store', signal: ctrl.signal })
    if (!res.ok) throw new Error(`${res.status}`)
    return await res.json()
  } finally {
    clearTimeout(t)
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

// Pre-launch countdown covering the whole site. The dashboard sets the launch
// time (or removes the overlay); the server decides whether we're live, and the
// countdown runs on server-corrected time so a wrong device clock doesn't matter.
export default function LaunchOverlay() {
  const [phase, setPhase] = useState<'loading' | 'locked' | 'open'>('loading')
  const [target, setTarget] = useState<number | null>(null)
  const [offset, setOffset] = useState(0) // serverNow - device now
  const [now, setNow] = useState(() => Date.now())
  const isOpen = phase === 'open'
  const [wasLocked, setWasLocked] = useState(false)
  const [gone, setGone] = useState(false)

  // Fetch now and keep polling while locked, so "Remove overlay now" in the
  // dashboard reaches visitors who already have the page open.
  useEffect(() => {
    if (isOpen) return
    let alive = true
    const check = () =>
      fetchLaunch()
        .then((s) => {
          if (!alive) return
          if (s.live || !s.launchAt) return setPhase('open')
          setOffset(Date.parse(s.serverNow) - Date.now())
          setTarget(Date.parse(s.launchAt))
          setWasLocked(true)
          setPhase('locked')
        })
        .catch(() => {
          // Fail open: an API outage must never hide the site.
          if (alive) setPhase((p) => (p === 'loading' ? 'open' : p))
        })
    check()
    const t = setInterval(check, POLL_MS)
    return () => {
      alive = false
      clearInterval(t)
    }
  }, [isOpen])

  // Client-side tick: opens the site the moment the countdown hits zero.
  useEffect(() => {
    if (phase !== 'locked' || target === null) return
    const tick = () => {
      const n = Date.now() + offset
      setNow(n)
      if (n >= target) setPhase('open')
    }
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [phase, target, offset])

  // Fade the overlay out when the countdown ends (only if it was showing; a
  // visitor arriving after launch never sees it).
  useEffect(() => {
    if (phase !== 'open') return
    const t = setTimeout(() => setGone(true), wasLocked ? 900 : 0)
    return () => clearTimeout(t)
  }, [phase, wasLocked])

  useEffect(() => {
    if (gone) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [gone])

  if (gone || (phase === 'open' && !wasLocked)) return null

  const left = target === null ? null : Math.max(0, Math.floor((target - now) / 1000))
  const parts = left === null ? null : ([
    ['Days', Math.floor(left / 86400)],
    ['Hours', Math.floor((left % 86400) / 3600)],
    ['Minutes', Math.floor((left % 3600) / 60)],
    ['Seconds', left % 60],
  ] as const).filter(([label, v]) => label !== 'Days' || v > 0)

  return (
    <div
      className={`launch${phase === 'open' ? ' out' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Energy Eggs is launching soon"
    >
      <div className="launch-bg" aria-hidden="true">
        <span className="launch-blob b1" />
        <span className="launch-blob b2" />
        <span className="launch-blob b3" />
        <span className="launch-grid" />
      </div>

      <div className="launch-inner">
        <img src={logo} alt="Energy Eggs" className="launch-logo" />
        {parts && (
          <>
            <p className="launch-pill"><i />Launching soon</p>
            <h1 className="launch-title">
              Something fresh is <em>hatching</em>
            </h1>
            <div className="launch-count" aria-live="off">
              {parts.map(([label, v], i) => (
                <div key={label} className="launch-unit-wrap">
                  {i > 0 && <span className="launch-sep" aria-hidden="true">:</span>}
                  <div className="launch-unit">
                    <span key={v} className="launch-num">{pad(v)}</span>
                    <small>{label}</small>
                  </div>
                </div>
              ))}
            </div>
            {target !== null && (
              <p className="launch-when">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3.5" y="5" width="17" height="15" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4" />
                </svg>
                {new Date(target).toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
