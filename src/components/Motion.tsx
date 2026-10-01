// Scroll-reveal helpers, done with CSS transitions + IntersectionObserver
// (styles: .m-reveal / .m-stagger / .m-item in index.css). These replaced
// framer-motion, whose per-element measuring blocked the main thread for
// seconds on mobile and hurt Core Web Vitals.
import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode, RefObject } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

// Variant names — map to .m-fade-up / .m-pop in CSS
export const fadeUp = 'fade-up'
export const pop = 'pop'
type Variant = typeof fadeUp | typeof pop

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** Runs `onEnter` once, the first time the element is `amount` visible. */
function useEnterOnce(ref: RefObject<HTMLElement | null>, amount: number, onEnter: (el: HTMLElement) => void) {
  const cb = useRef(onEnter)
  cb.current = onEnter
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduceMotion() || typeof IntersectionObserver === 'undefined') {
      cb.current(el)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            cb.current(e.target as HTMLElement)
            io.disconnect()
          }
        }
      },
      { threshold: amount },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, amount])
}

/** Viewport-triggered container that staggers its MItem children. */
export function MStagger({ children, className = '', amount = 0.15, gap = 0.08 }: {
  children: ReactNode
  className?: string
  amount?: number
  gap?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEnterOnce(ref, amount, (el) => {
    // items belong to their nearest stagger container (they needn't be direct children)
    const items = Array.from(el.querySelectorAll<HTMLElement>('.m-item')).filter((n) => n.closest('.m-stagger') === el)
    items.forEach((n, i) => {
      n.style.transitionDelay = `${(i * gap).toFixed(2)}s`
      n.classList.add('in')
    })
    el.classList.add('in') // lets items mounted later (filters, tabs) show immediately
  })
  return <div ref={ref} className={`m-stagger ${className}`}>{children}</div>
}

export function MItem({ children, className = '', variants = fadeUp }: {
  children: ReactNode
  className?: string
  variants?: Variant
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (el?.closest('.m-stagger')?.classList.contains('in')) el.classList.add('in')
  }, [])
  return <div ref={ref} className={`m-item m-${variants} ${className}`}>{children}</div>
}

/** Standalone fade-up reveal on scroll into view. */
export function MReveal({ children, className = '', delay = 0, style }: {
  children: ReactNode
  className?: string
  delay?: number
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEnterOnce(ref, 0.2, (el) => el.classList.add('in'))
  return (
    <div ref={ref} className={`m-reveal ${className}`} style={delay ? { ...style, transitionDelay: `${delay}s` } : style}>
      {children}
    </div>
  )
}

/** Counts a stat like "4" or "100%" up from zero when scrolled into view. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const raf = useRef(0)
  useEnterOnce(ref, 0.5, (el) => {
    const match = value.match(/^(\d+)(.*)$/)
    if (!match || reduceMotion()) return
    const target = Number(match[1])
    const suffix = match[2]
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1100)
      const eased = 1 - Math.pow(1 - t, 3) // easeOut
      el.textContent = `${Math.round(target * eased)}${suffix}`
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  })
  useEffect(() => () => cancelAnimationFrame(raf.current), [])
  return <span ref={ref} className="n">{value}</span>
}
