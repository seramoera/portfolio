import { playSfx } from '../audio/sfx.js'
import { notes } from '../data/notes.js'
import Barcode from './Barcode.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'

export default function Notes() {
  return (
    <section
      className="section notes"
      id="notes"
      data-num="04"
      aria-labelledby="notes-title"
    >
      <div className="wrap">
        <SectionHead
          num="04"
          label="Field notes"
          meta={`${String(notes.length).padStart(2, '0')} entries · 2026`}
        />

        <div className="notes__intro">
          <Reveal as="h2" id="notes-title" className="display" variant="clip">
            Field notes<span className="display__dot">.</span>
          </Reveal>
          <Reveal className="notes__intro-copy" delay={80}>
            <p>
              Short write-ups about things I had to work out the hard way:
              verification, admin tools, and designing for a phone in bad light.
              Pull a ticket.
            </p>
            <span className="label notes__hint">
              <i aria-hidden="true" />
              Open a ticket · no. 01—0{notes.length}
            </span>
          </Reveal>
        </div>

        <div className="ntickets">
          {notes.map((note, index) => (
            <Reveal key={note.id} delay={index * 70} variant="up">
              <details
                className="nticket"
                onToggle={(event) => {
                  if (event.currentTarget.open) playSfx('ticket')
                }}
              >
                <summary className="nticket__summary">
                  <span className="nticket__stub">
                    <span className="nticket__serial">{note.num}</span>
                    <span className="nticket__date">{note.date}</span>
                    <span className="nticket__admit" aria-hidden="true">
                      Admit one
                    </span>
                  </span>

                  <span className="nticket__main">
                    <span className="nticket__tag">{note.tag}</span>
                    <span className="nticket__title">{note.title}</span>
                    <span className="nticket__excerpt">{note.excerpt}</span>
                  </span>

                  <span className="nticket__action">
                    <span className="label nticket__read">{note.read}</span>
                    <span className="nticket__toggle" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                  </span>
                </summary>

                <div className="nticket__body">
                  <div className="nticket__tear">
                    <span>✂ keep this stub</span>
                  </div>

                  <div className="receipt">
                    <div className="receipt__head">
                      <span>JFM-64 // FIELD NOTE</span>
                      <span>
                        {note.num} · {note.date}
                      </span>
                    </div>

                    <p className="receipt__excerpt">{note.excerpt}</p>

                    <div className="receipt__copy">
                      {note.body.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="receipt__stars" aria-hidden="true">
                      * &nbsp;* &nbsp;*
                    </div>

                    <div className="receipt__foot">
                      <Barcode value={`${note.id}-${note.date}`} height={30} />
                      <span className="receipt__meta">
                        FILED UNDER
                        <br />
                        {note.tag}
                      </span>
                      <span className="receipt__thanks">Thank you</span>
                    </div>
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
