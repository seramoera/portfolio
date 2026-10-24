import { useEffect, useRef } from 'react'

/**
 * The paper the whole site is printed on: a barely-there dot matrix, dashed
 * rails, a warm horizon, two dithered patches and a grain pass. No canvas,
 * no repaint on scroll beyond one CSS custom property.
 */
export default function Backdrop() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let y = window.scrollY

    const paint = () => {
      raf = 0
      el.style.setProperty('--scroll', String(y))
    }

    const onScroll = () => {
      y = window.scrollY
      if (!raf) raf = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="bg" ref={ref} aria-hidden="true">
      <div className="bg__grid" />
      <div className="bg__glow" />
      <div className="bg__dither bg__dither--tl" />
      <div className="bg__dither bg__dither--br" />

      <div className="bg__rail bg__rail--l">
        <span className="bg__rail-text">JFM-64 / PORTFOLIO SYSTEM</span>
        <span className="bg__rail-ticks" />
        <span className="bg__rail-text bg__rail-text--low">EST. 2026</span>
      </div>

      <div className="bg__rail bg__rail--r">
        <span className="bg__rail-text">PAL · 60 HZ · SIGNAL OK</span>
        <span className="bg__rail-ticks" />
        <span className="bg__rail-text bg__rail-text--low">P. 00—06</span>
      </div>
    </div>
  )
}
