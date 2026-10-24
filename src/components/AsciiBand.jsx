import { useEffect, useRef } from 'react'

const GLYPHS = '01<>[]{}/\\|=+*#%$@&;:·•░▒▓'
const FADE = ' .:-=+*#%@'

function makeRng(seed) {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

/**
 * A band of live ASCII noise, in the spirit of the reference site's static
 * strips. Drawn at ~9fps, paused off screen, and static when reduced motion
 * is requested. `tone="dark"` inverts it for a black section.
 */
export default function AsciiBand({
  tone = 'light',
  height = 118,
  label = 'TRANSMISSION',
  meta = 'SIGNAL 98%',
  seed = 11,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ink = tone === 'dark' ? '242, 238, 228' : '22, 24, 29'
    const rng = makeRng(seed)

    let cols = 0
    let rows = 0
    let cellW = 10
    let cellH = 13
    let dpr = 1
    let raf = 0
    let last = 0
    let visible = true
    let frame = 0

    // A stable random field gives the band its texture; the wave moves through
    // it so it reads as a signal rather than TV snow.
    const noise = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const w = Math.max(1, rect.width)
      const h = Math.max(1, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)

      cellH = w < 640 ? 11 : 12
      cellW = cellH * 0.62
      cols = Math.max(18, Math.ceil(w / cellW))
      rows = Math.max(3, Math.ceil(h / cellH))

      noise.length = 0
      for (let i = 0; i < cols * rows; i++) {
        noise.push({
          r: rng(),
          glyph: GLYPHS[Math.floor(rng() * GLYPHS.length)],
          phase: rng() * Math.PI * 2,
        })
      }
    }

    const draw = (time = 0) => {
      if (!cols || !rows) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${cellH.toFixed(1)}px "JetBrains Mono", ui-monospace, monospace`
      ctx.textBaseline = 'top'

      const t = time / 1000

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cell = noise[y * cols + x]
          if (!cell) continue

          const wave =
            Math.sin(x * 0.16 + t * 0.7 + y * 0.55) * 0.5 +
            Math.sin((x + y * 3) * 0.07 - t * 0.35) * 0.5
          const density = cell.r * 0.55 + (wave + 1) * 0.28

          if (density < 0.42) continue

          const level = Math.min(9, Math.max(1, Math.floor(density * 9)))
          const alpha =
            (tone === 'dark' ? 0.22 : 0.16) + level * (tone === 'dark' ? 0.065 : 0.05)

          ctx.fillStyle = `rgba(${ink}, ${alpha.toFixed(3)})`
          const glyph =
            (frame + Math.floor(cell.phase * 7)) % 17 === 0
              ? FADE[level]
              : cell.glyph
          ctx.fillText(glyph, x * cellW, y * cellH)
        }
      }
    }

    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      if (now - last < 110) return
      last = now
      frame += 1
      draw(now)
    }

    resize()
    draw(0)

    const onResize = () => {
      resize()
      draw(performance.now())
    }

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

    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null
    observer?.observe(canvas)

    if (!reduced) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
      io?.disconnect()
    }
  }, [tone, seed])

  return (
    <div
      className={`band band--${tone}`}
      style={{ '--band-h': `${height}px` }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="band__canvas" />
      <span className="band__edge band__edge--l" />
      <span className="band__edge band__edge--r" />
      <span className="band__tag">{label}</span>
      <span className="band__meta">{meta}</span>
    </div>
  )
}
