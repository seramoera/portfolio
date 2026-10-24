import { useEffect, useRef, useState } from 'react'
import ProjectArt from './ProjectArt.jsx'
import { ArrowLeft, ArrowRight } from './Icons.jsx'

/**
 * A CRT television used as the project navigator. Each project is a channel:
 * switching fires a burst of static, the tube warms up when it scrolls into
 * view, and the dial turns with every change.
 */
export default function CrtTv({ projects, active, onChange }) {
  const caseRef = useRef(null)
  const [powered, setPowered] = useState(false)
  const [switching, setSwitching] = useState(false)

  const project = projects[active]
  const count = projects.length
  const reduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Warm the tube the first time it is actually on screen.
  useEffect(() => {
    const el = caseRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setPowered(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPowered(true)
            io.disconnect()
          }
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Static between channels.
  useEffect(() => {
    if (!powered || reduced()) return
    setSwitching(true)
    const timer = setTimeout(() => setSwitching(false), 460)
    return () => clearTimeout(timer)
  }, [active, powered])

  const step = (direction) => onChange((active + direction + count) % count)

  return (
    <div
      className={`tv${powered ? ' is-on' : ''}${switching ? ' is-switching' : ''}`}
      ref={caseRef}
    >
      <div className="tv__case">
        <div className="tv__screen">
          <div className="tv__content" key={project.id}>
            <div className="tv__art">
              <ProjectArt kind={project.art} />
            </div>

            <span className="tv__av">AV-1</span>

            <div className="tv__osd">
              <span className="tv__osd-ch">CH {project.num}</span>
              <span className="tv__osd-title">{project.title}</span>
              <span className="tv__osd-meta">
                {project.category} · {project.year}
              </span>
            </div>

            <span className="tv__rec">
              <i aria-hidden="true" />
              REC
            </span>
          </div>

          <div className="tv__scanlines" aria-hidden="true" />
          <div className="tv__roll" aria-hidden="true" />
          <div className="tv__glare" aria-hidden="true" />
          <div className="tv__static" aria-hidden="true" />
        </div>

        <p className="sr-only" aria-live="polite">
          Channel {project.num}: {project.title}
        </p>

        <div className="tv__panel">
          <span className="tv__brand">
            JFM·64
            <small>Solid state</small>
          </span>

          <div className="tv__channels" role="group" aria-label="Channels">
            {projects.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === active ? 'is-active' : undefined}
                aria-current={index === active ? 'true' : undefined}
                aria-label={`Channel ${item.num}: ${item.title}`}
                onClick={() => onChange(index)}
              >
                {item.num}
              </button>
            ))}
          </div>

          <div className="tv__dials">
            <button
              type="button"
              className="tv__btn"
              onClick={() => step(-1)}
              aria-label="Previous channel"
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              className="tv__btn"
              onClick={() => step(1)}
              aria-label="Next channel"
            >
              <ArrowRight />
            </button>

            <span
              className="tv__knob"
              style={{ transform: `rotate(${active * 62}deg)` }}
              aria-hidden="true"
            />
            <span className="tv__led" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  )
}
