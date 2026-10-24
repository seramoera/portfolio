import { site } from '../data/projects.js'
import { resume } from '../data/resume.js'
import AsciiField from './AsciiField.jsx'
import { ArrowRight, Download } from './Icons.jsx'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__lead">
          <div className="hero__top">
            <span className="hero__status">
              <i aria-hidden="true" />
              {site.availability}
            </span>
            <span className="hero__plate">
              JFM-64 <b>·</b> SYSTEM ONLINE
              <span className="blink" aria-hidden="true" />
            </span>
          </div>

          <p className="hero__kicker">
            <span>Portfolio</span>
            <span className="hero__kicker-rule" aria-hidden="true" />
            <span>2026</span>
            <span className="hero__kicker-dim">/ 01</span>
          </p>

          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">
              <span>Software with</span>
            </span>
            <span className="hero__line hero__line--second">
              <span>
                a point <em>of view.</em>
                <i className="hero__cursor" aria-hidden="true" />
              </span>
            </span>
          </h1>

          <p className="hero__sub">
            I&apos;m <strong>Jasmine F. Magtanong</strong>, a computer science
            undergraduate at Holy Angel University. I build web and mobile
            software, and I care as much about whether it holds up under
            pressure as whether it looks right.
          </p>

          <div className="hero__actions">
            <a className="key key--dark" href="#work">
              <span>See selected work</span>
              <ArrowRight />
            </a>
            <a className="key key--ghost" href={resume.href} download>
              <span>Résumé</span>
              <Download />
            </a>
          </div>
        </div>

        <div className="hero__side">
          <AsciiField />

          <dl className="hero__meta">
            <div>
              <dt>Based in</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt>Studying</dt>
              <dd>BS Computer Science, 2023 — present</dd>
            </div>
            <div>
              <dt>Working on</dt>
              <dd>ViVy — receipt verification for GCash</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="wrap hero__foot">
        <ul className="hero__stats">
          <li>
            <span className="label">Education</span>
            <b>BS CS &apos;27</b>
          </li>
          <li>
            <span className="label">Focus</span>
            <b>Build + secure</b>
          </li>
          <li>
            <span className="label">Currently learning</span>
            <b>Game development</b>
          </li>
          <li>
            <span className="label">Status</span>
            <b className="hero__stat-live">
              <i aria-hidden="true" />
              Open to 2026
            </b>
          </li>
        </ul>

        <a className="hero__scroll" href="#work">
          <span className="label">Scroll to inspect</span>
          <span className="hero__scroll-line" aria-hidden="true">
            <i />
          </span>
          <span className="label">01 / 06</span>
        </a>
      </div>
    </section>
  )
}
