import { useEffect, useState } from 'react'
import logo from '../assets/logo.webp'

// Full-page brand splash shown on first load of a session, then fades to reveal the site.
export default function Splash() {
  const seen = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('ee-splash') === '1'
  const [out, setOut] = useState(seen)
  const [gone, setGone] = useState(seen)

  useEffect(() => {
    if (seen) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const hold = reduce ? 600 : 2000
    const t1 = setTimeout(() => setOut(true), hold)
    return () => clearTimeout(t1)
  }, [seen])

  useEffect(() => {
    if (!out || gone) return
    const t2 = setTimeout(() => {
      setGone(true)
      try { sessionStorage.setItem('ee-splash', '1') } catch { /* ignore */ }
    }, 650)
    return () => clearTimeout(t2)
  }, [out, gone])

  if (gone) return null

  return (
    <div className={`splash${out ? ' out' : ''}`} role="status" aria-label="Loading Energy Eggs">
      <div className="splash-inner">
        <img src={logo} alt="Energy Eggs" className="splash-logo" />
        <div className="splash-bar"><span /></div>
      </div>
    </div>
  )
}
