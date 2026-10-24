import { useEffect, useRef } from 'react'

/**
 * A ring that trails the pointer and swells over anything interactive.
 * Desktop only — it never renders a moving element on touch devices.
 */
export default function Cursor() {
  const ringRef = useRef(null)

  useEffect(() => {
    const el = ringRef.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { ...target }
    let raf = 0
    let visible = false

    const frame = () => {
      current.x += (target.x - current.x) * 0.16
      current.y += (target.y - current.y) * 0.16
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) scale(var(--cursor-scale, 1))`
      raf = requestAnimationFrame(frame)
    }

    const onMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      if (!visible) {
        visible = true
        el.classList.add('is-visible')
      }
    }

    const onOver = (event) => {
      const hit = event.target instanceof Element ? event.target.closest('a, button, [data-cursor]') : null
      el.classList.toggle('is-over', Boolean(hit))
    }

    const onLeaveWindow = () => {
      visible = false
      el.classList.remove('is-visible')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', onLeaveWindow)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeaveWindow)
    }
  }, [])

  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
}
