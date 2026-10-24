import { useEffect, useRef } from 'react'

/**
 * Pointer-reactive 3D tilt. Rotates the element a few degrees toward the
 * cursor and exposes --mx / --my so a highlight can follow the pointer.
 *
 * Does nothing on touch devices or when reduced motion is requested.
 */
export default function Tilt({ as: Tag = 'div', max = 8, className = '', children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const target = { rx: 0, ry: 0, mx: 50, my: 50 }
    const current = { rx: 0, ry: 0, mx: 50, my: 50 }
    let raf = 0

    const apply = () => {
      el.style.transform = `rotateX(${current.rx.toFixed(2)}deg) rotateY(${current.ry.toFixed(2)}deg)`
      el.style.setProperty('--mx', `${current.mx.toFixed(1)}%`)
      el.style.setProperty('--my', `${current.my.toFixed(1)}%`)
    }

    const frame = () => {
      current.rx += (target.rx - current.rx) * 0.12
      current.ry += (target.ry - current.ry) * 0.12
      current.mx += (target.mx - current.mx) * 0.12
      current.my += (target.my - current.my) * 0.12
      apply()

      const settled =
        Math.abs(target.rx - current.rx) < 0.02 &&
        Math.abs(target.ry - current.ry) < 0.02 &&
        Math.abs(target.mx - current.mx) < 0.2 &&
        Math.abs(target.my - current.my) < 0.2

      raf = settled ? 0 : requestAnimationFrame(frame)
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height

      target.ry = (px - 0.5) * 2 * max
      target.rx = -(py - 0.5) * 2 * max
      target.mx = px * 100
      target.my = py * 100
      start()
    }

    const onLeave = () => {
      target.rx = 0
      target.ry = 0
      target.mx = 50
      target.my = 50
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
  }, [max])

  return (
    <Tag ref={ref} className={`tilt${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </Tag>
  )
}
