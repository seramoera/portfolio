import { site } from '../data/projects.js'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div>
          <div className="hero__eyebrow">
            <span className="hero__status">
              <i aria-hidden="true" />
              {site.availability}
            </span>
            <span className="label">Portfolio — 2026</span>
          </div>

          <h1 id="hero-title">
            Software with
            <span>a point of view.</span>
          </h1>

          <p className="hero__sub">
            I&apos;m <strong>Jasmine F. Magtanong</strong>, a computer science
            undergraduate at Holy Angel University. I build web and mobile
            software, and I care as much about whether it holds up under
            pressure as whether it looks right.
          </p>
        </div>

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

      <div className="hero__foot">
        <a className="hero__scroll" href="#work">
          <i aria-hidden="true" />
          <span>Selected work</span>
        </a>
        <span className="label">Scroll to inspect</span>
      </div>
    </section>
  )
}
