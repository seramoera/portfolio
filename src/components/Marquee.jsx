import { useEffect, useRef } from 'react'

const items = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Dart',
  'SQL',
  'React',
  'Flutter',
  'Figma',
  'OCR',
  'HTML / CSS',
  'Supabase',
  'API testing',
  'LLM APIs',
  'Git',
  'Godot',
]

function Row({ hidden = false }) {
  return (
    <div className="ticker__row" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item}>
          <b>{item}</b>
          <s aria-hidden="true">·</s>
        </span>
      ))}
    </div>
  )
}

/**
 * The station ident: a narrow black band between the hero and the work,
 * moving slowly, pausing on hover. Duplicated once for a seamless loop.
 */
export default function Marquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let last = window.scrollY
    let target = 0
    let current = 0

    const frame = () => {
      current += (target - current) * 0.12
      target *= 0.9
      el.style.setProperty('--skew', `${current.toFixed(2)}deg`)
      raf =
        Math.abs(current) > 0.01 || Math.abs(target) > 0.01
          ? requestAnimationFrame(frame)
          : 0
    }

    const onScroll = () => {
      const now = window.scrollY
      target = Math.max(-2.5, Math.min(2.5, (now - last) * 0.035))
      last = now
      if (!raf) raf = requestAnimationFrame(frame)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="ticker" aria-hidden="true">
      <span className="ticker__tag">
        <i />
        On air
      </span>

      <div className="ticker__view">
        <div className="ticker__track" ref={trackRef}>
          <Row />
          <Row hidden />
        </div>
      </div>

      <span className="ticker__end">
        PAL <b>60</b>
      </span>
    </div>
  )
}
