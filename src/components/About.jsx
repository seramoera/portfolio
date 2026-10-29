import Barcode from './Barcode.jsx'
import Reveal from './Reveal.jsx'
import SectionHead from './SectionHead.jsx'
import Tilt from './Tilt.jsx'

export default function About() {
  return (
    <section
      className="section about"
      id="about"
      data-num="02"
      aria-labelledby="about-title"
    >
      <div className="wrap">
        <SectionHead
          num="02"
          label="Personnel file"
          meta="Pampanga, PH · UTC+8"
        />

        <div className="about__grid">
          <div className="about__main">
            <Reveal as="h2" id="about-title" className="display" variant="clip">
              Close to <em>the problem.</em>
            </Reveal>

            <Reveal className="about__lead" delay={80}>
              <p>
                I like the point where a design decision turns into an engineering
                constraint — and the work of making both of them{' '}
                <em>hold together.</em>
              </p>
            </Reveal>

            <div className="about__log">
              <Reveal className="about__entry" variant="left">
                <span className="about__entry-num">01</span>
                <div>
                  <h3>The short version</h3>
                  <p>
                    I&apos;m an undergraduate Computer Science student at Holy Angel
                    University, currently on the Dean&apos;s List. Most of what I
                    know comes from building things that had to work for someone
                    else: a trading ledger that has to stay readable on a phone at
                    a card table, an org membership app that replaced a spreadsheet
                    three people were editing badly.
                  </p>
                </div>
              </Reveal>

              <Reveal className="about__entry" variant="left" delay={60}>
                <span className="about__entry-num">02</span>
                <div>
                  <h3>Between design and security</h3>
                  <p>
                    My work sits between how an interface reads at a glance and
                    what happens when someone tries to fake their way through it.
                    ViVy came from that second question: a seller holding a bag,
                    a stranger holding up a screenshot, and a receipt that is only
                    a picture of a transaction.
                  </p>
                </div>
              </Reveal>

              <Reveal className="about__entry" variant="left" delay={120}>
                <span className="about__entry-num">03</span>
                <div>
                  <h3>AI on purpose</h3>
                  <p>
                    I work with AI deliberately rather than by default: writing
                    prompts that narrow a problem, reading the output critically,
                    and keeping only what survives a test. The tool is not the
                    point — the judgement is.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal className="about__currently" variant="scale" delay={80}>
              <span className="about__currently-label">
                <i aria-hidden="true" />
                Currently learning
              </span>
              <p>
                <strong>Game development</strong> — Unity with C++ and C#. I am
                learning the engine and scripting workflow for future game
                projects, with a focus on gameplay systems and small, finished
                loops.
              </p>
            </Reveal>

            <Reveal className="about__sign" variant="fade" delay={120}>
              <span className="about__sign-name">Jasmine F. Magtanong</span>
              <span className="label">Builder · Pampanga, PH</span>
            </Reveal>
          </div>

          <Tilt max={7} className="idcard-tilt">
            <aside className="idcard" aria-label="Personnel ID card">
              <div className="idcard__top">
                <span>Personnel file</span>
                <span>NO. 02—2026</span>
              </div>

              <div className="idcard__photo">
                <span className="idcard__photo-grid" aria-hidden="true" />
                <span className="idcard__initials" aria-hidden="true">
                  JFM
                </span>
                <span className="idcard__pending">Image pending</span>
                <span className="idcard__scan" aria-hidden="true" />
                <span className="idcard__stamp">Active</span>
                <span className="idcard__corner" aria-hidden="true" />
              </div>

              <div className="idcard__body">
                <span className="label idcard__type">Student · developer</span>
                <h3>Jasmine F. Magtanong</h3>
                <p className="idcard__role">
                  CS undergraduate at Holy Angel University. Building web, mobile
                  and the occasional small game.
                </p>

                <dl className="idcard__facts">
                  <div>
                    <dt>Based</dt>
                    <dd>Pampanga, PH</dd>
                  </div>
                  <div>
                    <dt>Education</dt>
                    <dd>BS CS, HAU · 2023—present</dd>
                  </div>
                  <div>
                    <dt>Standing</dt>
                    <dd>Dean&apos;s List</dd>
                  </div>
                  <div>
                    <dt>Focus</dt>
                    <dd>Web, mobile, verification</dd>
                  </div>
                  <div>
                    <dt>Currently</dt>
                    <dd>Game development · Unity</dd>
                  </div>
                </dl>
              </div>

              <div className="idcard__foot">
                <Barcode value="JASMINE-F-MAGTANONG-2026" height={30} />
                <span className="idcard__valid">Valid thru 2026</span>
              </div>
            </aside>
          </Tilt>
        </div>
      </div>
    </section>
  )
}
