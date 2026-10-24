import { resume } from '../data/resume.js'
import Barcode from './Barcode.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import { ArrowUpRight, Download } from './Icons.jsx'

export default function Resume() {
  return (
    <section
      className="section resume"
      id="resume"
      data-num="05"
      aria-labelledby="resume-title"
    >
      <div className="wrap">
        <SectionHead
          num="05"
          label="Résumé"
          meta={`PDF · ${resume.pages} · Updated ${resume.updated}`}
        />

        <div className="resume__intro">
          <Reveal as="h2" id="resume-title" className="display" variant="clip">
            One page<span className="display__dot">.</span>
            <br />
            <em>No filler.</em>
          </Reveal>

          <Reveal className="resume__intro-copy" delay={80}>
            <p>{resume.summary}</p>

            <div className="resume__actions">
              <a className="key key--accent" href={resume.href} download>
                <Download />
                <span>Download PDF</span>
              </a>
              <a
                className="resume__preview-link"
                href={resume.href}
                target="_blank"
                rel="noreferrer"
              >
                Open preview
                <ArrowUpRight />
              </a>
            </div>

            <p className="resume__status">
              <i aria-hidden="true" />
              Print ready · 01 / 01
              <span className="resume__status-dim">· one page</span>
            </p>
          </Reveal>
        </div>

        <div className="resume__layout">
          <Reveal className="seeking" variant="left" delay={60}>
            <div className="seeking__bar">
              <span className="seeking__dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>JOB REQUEST / 2026</span>
              <span className="seeking__live">
                <i aria-hidden="true" />
                OPEN
              </span>
            </div>

            <div className="seeking__body">
              <h3>What I&apos;m looking for</h3>

              <dl className="seeking__list">
                {resume.seeking.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="seeking__glance">
                <span className="label">At a glance</span>
                <ul>
                  {resume.glance.map((item) => (
                    <li key={item.label}>
                      <span className="label">{item.label}</span>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="seeking__note">
                Full project notes live in the work section above.
              </p>
            </div>
          </Reveal>

          <Reveal className="sheet-wrap" variant="right" delay={100}>
            <a
              className="sheet"
              href={resume.href}
              download
              aria-label="Download Jasmine Magtanong's résumé as a one-page PDF"
            >
              <span className="sheet__holes sheet__holes--l" aria-hidden="true" />
              <span className="sheet__holes sheet__holes--r" aria-hidden="true" />

              <div className="sheet__head" aria-hidden="true">
                <span className="sheet__tag">CURRICULUM VITAE / 2026</span>
                <h3>Jasmine F. Magtanong</h3>
                <p>CS undergraduate · web, mobile &amp; verification</p>
                <span className="sheet__contact">
                  jasminemagtanong04@gmail.com · Pampanga, PH · GitHub / LinkedIn
                </span>
              </div>

              <div className="sheet__rule" aria-hidden="true" />

              <div className="sheet__preview" aria-hidden="true">
                <section className="sheet__sec">
                  <h4>Education</h4>
                  <div className="sheet__row">
                    <span>BS Computer Science, Holy Angel University</span>
                    <span>2023—present</span>
                  </div>
                  <div className="sheet__row sheet__row--sub">
                    <span>Dean&apos;s List · Pampanga, Philippines</span>
                  </div>
                </section>

                <section className="sheet__sec">
                  <h4>Selected projects</h4>
                  <div className="sheet__row">
                    <span>ViVy — receipt verification (Flutter, Python, OCR)</span>
                    <span>2025</span>
                  </div>
                  <div className="sheet__row">
                    <span>Cardbound — trading ledger (React, JavaScript)</span>
                    <span>2025</span>
                  </div>
                  <div className="sheet__row">
                    <span>Glide — org membership (Flutter, Firebase)</span>
                    <span>2025</span>
                  </div>
                  <div className="sheet__row">
                    <span>Jeep Box Hero — narrative game (Godot)</span>
                    <span>2025</span>
                  </div>
                </section>

                <section className="sheet__sec">
                  <h4>Skills</h4>
                  <p className="sheet__line">
                    JavaScript · Python · Java · Dart · SQL · React · Flutter ·
                    Firebase · Git · Figma
                  </p>
                </section>

                <section className="sheet__sec">
                  <h4>Certifications</h4>
                  <p className="sheet__line">
                    Responsive Web Design · Intro to Cybersecurity · AWS Cloud
                    Foundations · ITF+
                  </p>
                </section>

                <section className="sheet__sec">
                  <h4>Currently</h4>
                  <p className="sheet__line">
                    Learning game development — Godot 4 and GDScript.
                  </p>
                </section>
              </div>

              <div className="sheet__foot" aria-hidden="true">
                <Barcode value="JASMINE-MAGTANONG-CV-2026" height={28} />
                <span>1 / 1</span>
                <span className="sheet__print-state">Print ready</span>
              </div>

              <span className="sheet__printhead" aria-hidden="true" />
              <span className="sheet__stamp" aria-hidden="true">
                PDF
              </span>
            </a>

            <span className="sheet__caption label">
              <span>Preview / 01</span>
              <span>Click the sheet to download</span>
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
