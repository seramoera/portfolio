import { useEffect, useRef } from 'react'

/**
 * Pulls its child a few pixels toward the pointer. The kind of detail you
 * notice on a button without being able to say why.
 */
export default function Magnetic({ strength = 0.28, max = 9, className = '', children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let raf = 0

    const frame = () => {
      current.x += (target.x - current.x) * 0.18
      current.y += (target.y - current.y) * 0.18
      el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`

      const settled =
        Math.abs(target.x - current.x) < 0.05 && Math.abs(target.y - current.y) < 0.05
      raf = settled ? 0 : requestAnimationFrame(frame)
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      target.x = Math.max(-max, Math.min(max, dx * strength))
      target.y = Math.max(-max, Math.min(max, dy * strength))
      start()
    }

    const onLeave = () => {
      target.x = 0
      target.y = 0
      start()
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.style.transform = ''
    }
  }, [strength, max])

  return (
    <span ref={ref} className={`magnetic${className ? ` ${className}` : ''}`}>
      {children}
    </span>
  )
}
