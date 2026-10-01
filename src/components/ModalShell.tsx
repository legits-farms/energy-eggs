import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

// Backdrop + dialog box with a CSS enter/exit transition (see .modal-backdrop
// in index.css). While closing it keeps showing the last content it was given,
// so callers can pass `null` children once closed without the box going blank
// mid-animation.
const EXIT_MS = 220

export default function ModalShell({ open, onClose, label, className = 'modal', children }: {
  open: boolean
  onClose: () => void
  label: string
  className?: string
  children: ReactNode
}) {
  const [mounted, setMounted] = useState(open)
  const [shown, setShown] = useState(false)
  const last = useRef<ReactNode>(children)
  if (open) last.current = children

  useEffect(() => {
    if (open) {
      setMounted(true)
      // two frames: mount with the hidden styles first, then transition in
      let raf2 = 0
      const raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(() => setShown(true)) })
      return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2) }
    }
    setShown(false)
    const t = setTimeout(() => setMounted(false), EXIT_MS)
    return () => clearTimeout(t)
  }, [open])

  if (!mounted) return null

  return (
    <div className={`modal-backdrop${shown ? ' is-open' : ''}`} onClick={onClose}>
      <div
        className={`${className}${shown ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
      >
        {open ? children : last.current}
      </div>
    </div>
  )
}
