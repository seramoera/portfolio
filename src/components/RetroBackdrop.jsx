import { useEffect, useRef } from 'react'

/**
 * Retro print backdrop: graph paper, a striped sun, and a printer's ruler.
 * One fixed layer above the shader canvas and below the page. The scroll
 * listener only writes a CSS variable, so it never re-renders React.
 */
export default function RetroBackdrop() {
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
    <div className="retro" ref={ref} aria-hidden="true">
      <div className="retro__grid" />
      <div className="retro__sun" />
      <div className="retro__ruler" />
    </div>
  )
}
