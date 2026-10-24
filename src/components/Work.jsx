import { useCallback, useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects.js'
import ProjectArt from './ProjectArt.jsx'
import Reveal from './Reveal.jsx'
import { ArrowLeft, ArrowRight, ArrowUpRight } from './Icons.jsx'

export default function Work() {
  const [active, setActive] = useState(0)
  const stage = useRef(null)
  const count = projects.length

  const go = useCallback(
    (step) => setActive((i) => (i + step + count) % count),
    [count]
  )

  // Left/right arrows move the carousel, but only while it has focus.
  useEffect(() => {
    const el = stage.current
    if (!el) return

    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        go(1)
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        go(-1)
      }
    }

    el.addEventListener('keydown', onKeyDown)
    return () => el.removeEventListener('keydown', onKeyDown)
  }, [go])

  const project = projects[active]

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <Reveal className="section__head">
          <h2 className="label" id="work-title">
            01 — Selected work
          </h2>
          <span className="label work__count">
            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <div
            className="work__stage"
            ref={stage}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label="Selected work. Use the left and right arrow keys to move between projects."
          >
            <p className="sr-only" aria-live="polite">
              {project.title}, project {active + 1} of {count}
            </p>

            <article className="work__slide" key={project.id}>
              <div className="work__body">
                <div className="work__crumbs">
                  <span className="label">{project.category}</span>
                  <span className="label">{project.year}</span>
                </div>

                <h3 className="work__title">{project.title}</h3>
                <p className="work__summary">{project.summary}</p>
                <p className="work__detail">{project.detail}</p>

                <ul className="work__stack" aria-label="Built with">
                  {project.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>

                <div className="work__links">
                  {project.links.map((link) => (
                    <a key={link.label} href={link.href}>
                      {link.label}
                      <ArrowUpRight />
                    </a>
                  ))}
                </div>
              </div>

              <figure className="work__media">
                <ProjectArt kind={project.art} />
                <figcaption className="work__media-note label">
                  Placeholder — screenshot to come
                </figcaption>
              </figure>
            </article>

            <div className="work__controls">
              <button type="button" onClick={() => go(-1)} aria-label="Previous project">
                <ArrowLeft />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next project">
                <ArrowRight />
              </button>
              <div className="work__progress" aria-hidden="true">
                <span style={{ width: `${((active + 1) / count) * 100}%` }} />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="ul" className="work__index" delay={140}>
          {projects.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={index === active ? 'is-active' : undefined}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => setActive(index)}
              >
                <span className="label">{item.num}</span>
                <span className="work__index-title">{item.title}</span>
                <span className="label">{item.category}</span>
                <span className="label">{item.year}</span>
              </button>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
