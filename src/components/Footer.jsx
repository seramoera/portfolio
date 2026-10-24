import { resume } from '../data/resume.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <a className="footer__brand" href="#top">
          <span className="footer__sig">JFM-64</span>
          <span className="label">© 2026 Jasmine F. Magtanong</span>
        </a>

        <span className="footer__status">
          <i aria-hidden="true" />
          System ok · 60 hz
        </span>

        <nav className="footer__links" aria-label="Footer">
          <a className="label" href="#work">
            Work
          </a>
          <a className="label" href="#about">
            About
          </a>
          <a className="label" href="#notes">
            Notes
          </a>
          <a className="label" href={resume.href} download>
            Résumé
          </a>
          <a className="label" href="#contact">
            Contact
          </a>
        </nav>

        <a className="footer__top" href="#top">
          Top
          <span aria-hidden="true">↑</span>
        </a>
      </div>

      <div className="wrap footer__micro">
        <span>Built with React + Vite · no animation library</span>
        <span className="footer__micro-mid" aria-hidden="true">
          ░▒▓█ ░▒▓█ ░▒▓█
        </span>
        <span>Set in Instrument Sans + JetBrains Mono + VT323</span>
      </div>
    </footer>
  )
}
