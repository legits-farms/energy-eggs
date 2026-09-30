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

  useEffect(() => {
    if (phase === 'open') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [phase])

  if (phase === 'open') return null

  const left = target === null ? null : Math.max(0, Math.floor((target - now) / 1000))
  const parts = left === null ? null : [
    ['Days', Math.floor(left / 86400)],
    ['Hours', Math.floor((left % 86400) / 3600)],
    ['Minutes', Math.floor((left % 3600) / 60)],
    ['Seconds', left % 60],
  ] as const

  return (
    <div className="launch" role="dialog" aria-modal="true" aria-label="Energy Eggs is launching soon">
      <div className="launch-inner">
        <img src={logo} alt="Energy Eggs" className="launch-logo" />
        {parts && (
          <>
            <p className="launch-kicker">Launching soon</p>
            <div className="launch-count" aria-live="off">
              {parts.filter(([label, v]) => label !== 'Days' || v > 0).map(([label, v]) => (
                <div key={label} className="launch-unit">
                  <span>{pad(v)}</span>
                  <small>{label}</small>
                </div>
              ))}
            </div>
            {target !== null && (
              <p className="launch-when">
                {new Date(target).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
