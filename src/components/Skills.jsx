import { certifications, learning, skillGroups } from '../data/credentials.js'
import Barcode from './Barcode.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import { ArrowUpRight } from './Icons.jsx'

export default function Skills() {
  return (
    <section
      className="section skills"
      id="skills"
      data-num="03"
      aria-labelledby="skills-title"
    >
      <div className="wrap">
        <SectionHead
          num="03"
          label="Skills & credentials"
          meta={`${String(skillGroups.length + 1).padStart(2, '0')} cartridges · ${String(
            certifications.length
          ).padStart(2, '0')} credentials`}
        />

        <div className="skills__intro">
          <Reveal as="h2" id="skills-title" className="display" variant="clip">
            The kit<span className="display__dot">.</span>
          </Reveal>
          <Reveal className="skills__intro-copy" delay={80}>
            <p>
              Tools I reach for, grouped the way I actually use them. The last
              cartridge is still loading.
            </p>
            <span className="label">
              <i aria-hidden="true" />
              Cartridge bay / 05 slots
            </span>
          </Reveal>
        </div>

        <div className="carts">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.id}
              className="cart"
              delay={index * 60}
              variant={index % 2 === 0 ? 'left' : 'up'}
            >
              <div className="cart__spine">
                <span className="cart__num">0{index + 1}</span>
                <span className="cart__spine-label">{group.label}</span>
              </div>

              <div className="cart__body">
                <div className="cart__top">
                  <h3 className="cart__label">{group.label}</h3>
                  <span className="cart__led" aria-hidden="true" />
                </div>
                <p className="cart__note">{group.note}</p>

                <ul className="cart__items">
                  {group.items.map((item) => (
                    <li key={item}>
                      <i aria-hidden="true">▸</i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="cart__pins" aria-hidden="true" />
              <span className="cart__slot label" aria-hidden="true">
                SLOT 0{index + 1}
              </span>
            </Reveal>
          ))}

          <Reveal className="cart cart--learn" delay={140} variant="scale">
            <div className="cart__spine cart__spine--hot">
              <span className="cart__num">05</span>
              <span className="cart__spine-label">Now loading</span>
            </div>

            <div className="cart__body">
              <div className="cart__top">
                <span className="label cart__learn-label">
                  <i aria-hidden="true" />
                  Currently learning
                </span>
                <span className="cart__led cart__led--hot" aria-hidden="true" />
              </div>

              <h3 className="cart__big">
                {learning.title}
                <span className="cart__cursor" aria-hidden="true" />
              </h3>

              <p className="cart__learn-detail">{learning.detail}</p>

              <div className="cart__learn-foot">
                <span className="label">{learning.since}</span>
                <span className="cart__load" aria-hidden="true">
                  <i />
                </span>
                <span className="label">Godot 4 · GDScript</span>
              </div>
            </div>

            <span className="cart__pins cart__pins--hot" aria-hidden="true" />
            <span className="cart__slot label" aria-hidden="true">
              SLOT 05 · IN USE
            </span>
          </Reveal>
        </div>

        <Reveal className="printout" delay={100}>
          <div className="printout__perf printout__perf--l" aria-hidden="true" />
          <div className="printout__perf printout__perf--r" aria-hidden="true" />

          <header className="printout__head">
            <span className="label">Certification record</span>
            <span className="label">Issuer · Year</span>
            <span className="label">Status</span>
          </header>

          <ul className="printout__list">
            {certifications.map((cert, index) => (
              <li className="cert" key={cert.id}>
                <span className="cert__num">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="cert__body">
                  <h4 className="cert__title">{cert.title}</h4>
                  <p className="cert__note">{cert.note}</p>
                </div>

                <span className="cert__issuer">
                  {cert.issuer} · {cert.year}
                </span>

                <span className="cert__status">Recorded</span>

                {cert.href !== '#' ? (
                  <a
                    className="cert__link"
                    href={cert.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Verify ${cert.title} credential`}
                  >
                    Verify
                    <ArrowUpRight />
                  </a>
                ) : (
                  <span className="cert__link cert__link--muted" aria-hidden="true">
                    —
                  </span>
                )}
              </li>
            ))}
          </ul>

          <footer className="printout__foot">
            <Barcode value="CERT-RECORD-JFM-2026" height={26} />
            <span className="label">
              End of record · {certifications.length} entries
            </span>
            <span className="printout__stamp" aria-hidden="true">
              Verified
            </span>
          </footer>
        </Reveal>
      </div>
    </section>
  )
}
