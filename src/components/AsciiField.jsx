import { useEffect, useRef } from 'react'

// Density ramp, sparse to solid. Paired with the colour ramp below: low cells
// are a whisper of navy, mid cells go blue, the crests go orange.
const RAMP = ' .:-=+*#%@'

const COLORS = [
  'rgba(242, 238, 228, 0)',
  'rgba(242, 238, 228, 0.1)',
  'rgba(242, 238, 228, 0.2)',
  'rgba(242, 238, 228, 0.32)',
  'rgba(242, 238, 228, 0.46)',
  'rgba(242, 238, 228, 0.6)',
  'rgba(242, 238, 228, 0.76)',
  'rgba(228, 85, 43, 0.86)',
  'rgba(255, 138, 92, 0.96)',
  'rgba(199, 244, 100, 1)',
]

/**
 * A live ASCII field. Character density comes from a slow interference pattern;
 * moving the pointer through it adds a ripple. Runs at ~25fps, pauses off
 * screen, and draws a single still frame when reduced motion is requested.
 */
export default function AsciiField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0.5, y: 1.5, active: false }
    const smooth = { x: 0.5, y: 1.5 }

    let cols = 0
    let rows = 0
    let cellW = 0
    let cellH = 0
    let dpr = 1
    let levels = null
    let raf = 0
    let visible = true
    let last = 0
    const start = performance.now()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const w = Math.max(1, rect.width)
      const h = Math.max(1, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)

      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)

      cellH = w < 420 ? 12 : 13.5
      cellW = cellH * 0.63
      cols = Math.max(10, Math.floor(w / cellW))
      rows = Math.max(5, Math.floor(h / cellH))
      levels = new Uint8Array(cols * rows)
    }

    const draw = (now) => {
      if (!levels) return

      const t = (now - start) / 1000
      // Ease the pointer so the ripple glides instead of snapping.
      smooth.x += (pointer.x - smooth.x) * 0.1
      smooth.y += (pointer.y - smooth.y) * 0.1
      const px = smooth.x
      const py = smooth.y

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${(cellH * 1.02).toFixed(2)}px "JetBrains Mono", ui-monospace, monospace`
      ctx.textBaseline = 'top'

      const tt = t * 0.55

      for (let y = 0; y < rows; y++) {
        const ny = y / rows
        for (let x = 0; x < cols; x++) {
          const nx = x / cols

          let v =
            Math.sin(nx * 7.0 + tt * 1.15) * 0.55 +
            Math.sin(ny * 8.5 - tt * 0.8) * 0.42 +
            Math.sin((nx + ny) * 5.0 + tt * 0.6) * 0.35 +
            Math.sin(Math.hypot(nx - 0.62, ny - 0.55) * 12 - tt * 1.6) * 0.4

          if (pointer.active) {
            const dx = (nx - px) * 1.4
            const dy = ny - py
            const d = Math.hypot(dx, dy)
            v += Math.sin(d * 26 - t * 2.4) * Math.exp(-d * 5.5) * 1.5
          }

          const raw = (v + 1.6) / 3.1
          // Push the low end down to empty paper so the crests read as crests.
          const u = Math.pow(Math.max(0, raw - 0.26) / 0.74, 1.2)
          levels[y * cols + x] = Math.min(9, Math.floor(u * 10))
        }
      }

      for (let lvl = 1; lvl < 10; lvl++) {
        ctx.fillStyle = COLORS[lvl]
        for (let y = 0; y < rows; y++) {
          const row = y * cols
          for (let x = 0; x < cols; x++) {
            if (levels[row + x] === lvl) {
              ctx.fillText(RAMP[lvl], x * cellW, y * cellH)
            }
          }
        }
      }
    }

    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      // ~25fps is plenty for characters this size and keeps the fans quiet.
      if (now - last < 40) return
      last = now
      draw(now)
    }

    resize()
    draw(performance.now())
    if (!reduced) raf = requestAnimationFrame(loop)

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = (event.clientX - rect.left) / rect.width
      pointer.y = (event.clientY - rect.top) / rect.height
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
      pointer.x = 0.5
      pointer.y = 1.5
    }

    const onResize = () => {
      resize()
      draw(performance.now())
    }

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(onResize)
        : null
    observer?.observe(canvas)

    let io = null
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            visible = entry.isIntersecting
            if (visible) draw(performance.now())
          }
        },
        { threshold: 0 }
      )
      io.observe(canvas)
    }

    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
      io?.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <figure className="ascii" aria-hidden="true">
      <div className="ascii__bar">
        <span className="ascii__tag">
          <i />
          Live feed
        </span>
        <span className="ascii__ch">CH 01</span>
        <span className="ascii__dots">
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className="ascii__screen">
        <div className="ascii__grid" />
        <canvas ref={canvasRef} className="ascii__canvas" data-cursor />
        <span className="ascii__scan" />
        <span className="ascii__corner ascii__corner--tl" />
        <span className="ascii__corner ascii__corner--br" />
      </div>

      <figcaption className="ascii__cap">
        <span>ASCII FIELD / 04</span>
        <span>MOVE TO DISTURB</span>
      </figcaption>
    </figure>
  )
}
