import { useCallback, useEffect, useRef, useState } from 'react'
import { playSfx } from '../audio/sfx.js'
import { projects } from '../data/projects.js'
import Barcode from './Barcode.jsx'
import CrtTv from './CrtTv.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import Tilt from './Tilt.jsx'
import { ArrowUpRight } from './Icons.jsx'

export default function Work() {
  const [active, setActive] = useState(0)
  const stage = useRef(null)
  const count = projects.length

  const go = useCallback(
    (step) => setActive((i) => (i + step + count) % count),
    [count]
  )

  // Left/right arrows move the dial, but only while the set has focus.
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
    <section
      className="section work"
      id="work"
      data-num="01"
      aria-labelledby="work-title"
    >
      <div className="wrap">
        <SectionHead
          num="01"
          label="Selected work"
          meta={`${String(count).padStart(2, '0')} channels · 2025—2026`}
        />

        <div className="work__intro">
          <Reveal as="h2" id="work-title" className="display" variant="clip">
            Work that had <em>to hold up.</em>
          </Reveal>
          <Reveal className="work__intro-copy" delay={90}>
            <p>
              Three builds, each one a constraint I had to design around. Tune
              the set, then open the case file for the decisions behind it.
            </p>
            <span className="label work__intro-note">
              <i aria-hidden="true" />
              Now showing · channel {project.num}
            </span>
          </Reveal>
        </div>

        <div
          className="work__stage"
          ref={stage}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Selected work. Use the left and right arrow keys to change channel."
        >
          <div className="work__layout">
            <Reveal className="work__media" variant="left">
              <Tilt max={3.5} className="tv-wrap">
                <CrtTv projects={projects} active={active} onChange={setActive} />
              </Tilt>

              <div className="work__under">
                <span className="label">Now showing</span>
                <span className="work__under-title">{project.title}</span>
                <span className="label work__under-ch">
                  CH {project.num} / {String(count).padStart(2, '0')}
                </span>
              </div>
            </Reveal>

            <div className="work__info" key={project.id}>
              <div className="work__crumbs">
                <span className="label">{project.category}</span>
                <span className="label">{project.year}</span>
                <span className="label work__onair">
                  <i aria-hidden="true" />
                  On air
                </span>
              </div>

              <h3 className="work__title">{project.title}</h3>
              <p className="work__summary">{project.summary}</p>
              <p className="work__detail">{project.detail}</p>

              <ul className="chips" aria-label="Built with">
                {project.stack.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>

              <div className="work__links">
                {project.links.map((link) =>
                  link.href === '#' ? (
                    <span key={link.label} className="is-pending">
                      {link.label}
                    </span>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      target={
                        link.href.startsWith('http') ? '_blank' : undefined
                      }
                      rel={
                        link.href.startsWith('http') ? 'noreferrer' : undefined
                      }
                    >
                      {link.label}
                      <ArrowUpRight />
                    </a>
                  )
                )}
                <span className="work__file label">
                  FILE {project.num} / {String(count).padStart(2, '0')}
                </span>
              </div>

              {project.caseStudy ? (
                <details
                  className="ticket"
                  onToggle={(event) => {
                    if (event.currentTarget.open) playSfx('ticket')
                  }}
                >
                  <summary className="ticket__summary">
                    <span className="ticket__badge">
                      CASE
                      <br />
                      STUDY
                    </span>
                    <span className="ticket__summary-main">
                      <span className="ticket__kicker">
                        File {project.num} · {project.year}
                      </span>
                      <span className="ticket__headline">
                        Inside {project.title}
                      </span>
                    </span>
                    <span className="ticket__action">
                      <span className="ticket__action-text">Read the case</span>
                      <span className="ticket__toggle" aria-hidden="true">
                        <i />
                        <i />
                      </span>
                    </span>
                  </summary>

                  <div className="ticket__body">
                    <div className="ticket__tear">
                      <span>✂ tear along dotted line</span>
                    </div>

                    <div className="ticket__paper">
                      <div className="ticket__receipt-head">
                        <span>JFM-64 // CASE FILE</span>
                        <span>
                          NO. {project.num}—{project.year}
                        </span>
                      </div>

                      <p className="ticket__lede">{project.caseStudy.lede}</p>

                      <dl className="ticket__meta">
                        {project.caseStudy.meta.map((item) => (
                          <div key={item.label}>
                            <dt>{item.label}</dt>
                            <dd>{item.value}</dd>
                          </div>
                        ))}
                      </dl>

                      <div className="ticket__blocks">
                        {project.caseStudy.blocks.map((block, index) => (
                          <div className="ticket__block" key={block.label}>
                            <span className="ticket__block-num">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <div>
                              <h4>{block.label}</h4>
                              <p>{block.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="ticket__foot">
                        <Barcode
                          value={`${project.id}-${project.year}`}
                          height={30}
                        />
                        <span className="ticket__thanks">
                          END OF FILE
                          <br />
                          THANK YOU
                        </span>
                        <span className="ticket__stamp">Filed</span>
                      </div>
                    </div>
                  </div>
                </details>
              ) : null}
            </div>
          </div>
        </div>

        <Reveal className="work__guide-head" variant="fade">
          <span className="label">Channel guide</span>
          <span className="label work__hint-keys">
            ← / → to tune · click a row
          </span>
          <span className="label work__hint-touch">Tap a channel</span>
          <span className="label work__guide-meta">No. / Project / Category / Year</span>
        </Reveal>

        <Reveal as="ol" className="guide" delay={80} variant="up">
          {projects.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={index === active ? 'is-active' : undefined}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => setActive(index)}
              >
                <span className="guide__ch">CH {item.num}</span>
                <span className="guide__title">{item.title}</span>
                <span className="guide__leader" aria-hidden="true" />
                <span className="guide__cat">{item.category}</span>
                <span className="guide__year">{item.year}</span>
                <span className="guide__arrow" aria-hidden="true">
                  {index === active ? '▶' : '→'}
                </span>
              </button>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
