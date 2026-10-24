import { site } from '../data/projects.js'
import Reveal from './Reveal.jsx'
import { ArrowUpRight } from './Icons.jsx'

export default function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <Reveal className="section__head">
          <h2 className="label" id="contact-title">
            03 — Contact
          </h2>
          <span className="label">{site.availability}</span>
        </Reveal>

        <div className="contact__inner">
          <Reveal>
            <p className="label">Say hello</p>
            <a className="contact__line" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </Reveal>

          <Reveal className="contact__side" delay={100}>
            {site.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                {link.label}
                <ArrowUpRight />
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
