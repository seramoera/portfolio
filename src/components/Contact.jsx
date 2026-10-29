import { useEffect, useRef, useState } from 'react'
import { site } from '../data/projects.js'
import { resume } from '../data/resume.js'
import Magnetic from './Magnetic.jsx'
import Reveal from './Reveal.jsx'
import RoundBadge from './RoundBadge.jsx'
import SectionHead from './SectionHead.jsx'
import { ArrowUpRight, Download } from './Icons.jsx'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard blocked (older browser, insecure context) — just open mail.
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <section
      className="section contact"
      id="contact"
      data-num="06"
      aria-labelledby="contact-title"
    >
      <div className="wrap">
        <SectionHead
          num="06"
          label="Contact"
          meta="NODE 01 · PAMPANGA, PH"
        />

        <Reveal className="bbs" variant="scale">
          <div className="bbs__bar">
            <span className="bbs__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="bbs__title">JFM-BBS // NODE 01</span>
            <span className="bbs__baud">300 BAUD</span>
            <span className="bbs__live">
              <i aria-hidden="true" />
              ONLINE
            </span>
          </div>

          <div className="bbs__grid">
            <div className="bbs__main">
              <p className="bbs__prompt">
                C:\&gt; CONTACT --EMAIL
                <span className="bbs__cursor" aria-hidden="true" />
              </p>

              <h2 id="contact-title" className="bbs__heading">
                Let&apos;s talk<span>.</span>
              </h2>

              <p className="bbs__copy">
                I&apos;m looking for a team to learn from for my required OJT —
                frontend, mobile, QA, or backend work. Direct line is below.
              </p>

              <Magnetic max={12} strength={0.16} className="bbs__magnet">
                <a className="bbs__email" href={`mailto:${site.email}`}>
                  <span
                    className="bbs__email-text"
                    style={{ '--chars': site.email.length }}
                  >
                    {site.email}
                  </span>
                  <span className="bbs__email-cursor" aria-hidden="true" />
                </a>
              </Magnetic>

              <div className="bbs__actions">
                <button
                  type="button"
                  className={`key key--acid${copied ? ' is-copied' : ''}`}
                  onClick={copyEmail}
                >
                  {copied ? 'Copied ✓' : 'Copy address'}
                </button>
                <span className="bbs__avail">
                  <i aria-hidden="true" />
                  {site.availability}
                </span>
              </div>

              <span className="sr-only" role="status" aria-live="polite">
                {copied ? 'Email address copied to clipboard' : ''}
              </span>
            </div>

            <aside className="bbs__side">
              <div className="bbs__channels">
                <span className="label">Channels</span>
                <ul>
                  {site.links.map((link, index) => {
                    const inner = (
                      <>
                        <span className="bbs__ch-num">0{index + 1}</span>
                        <span className="bbs__ch-label">{link.label}</span>
                        <span className="bbs__ch-leader" aria-hidden="true" />
                        {link.href === '#' ? (
                          <span className="bbs__ch-soon">soon</span>
                        ) : (
                          <ArrowUpRight />
                        )}
                      </>
                    )

                    return (
                      <li key={link.label}>
                        {link.href === '#' ? (
                          <span className="bbs__ch-pending">{inner}</span>
                        ) : (
                          <a
                            href={link.href}
                            target={
                              link.href.startsWith('http')
                                ? '_blank'
                                : undefined
                            }
                            rel={
                              link.href.startsWith('http')
                                ? 'noreferrer'
                                : undefined
                            }
                          >
                            {inner}
                          </a>
                        )}
                      </li>
                    )
                  })}
                  <li>
                    <a href={resume.href} download>
                      <span className="bbs__ch-num">
                        0{site.links.length + 1}
                      </span>
                      <span className="bbs__ch-label">Résumé</span>
                      <span className="bbs__ch-leader" aria-hidden="true" />
                      <Download />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bbs__badge">
                <RoundBadge text="OPEN TO OJT · 2026 · " />
              </div>
            </aside>
          </div>

          <div className="bbs__foot">
            <span>NODE 01 · PAMPANGA, PH</span>
            <span className="bbs__wave" aria-hidden="true">
              ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░ ░▒▓█▓▒░
            </span>
            <span>NO CARRIER</span>
          </div>

          <span className="bbs__scan" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  )
}
