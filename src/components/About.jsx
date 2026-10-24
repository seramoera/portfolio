import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <Reveal className="section__head">
          <h2 className="label" id="about-title">
            02 — About
          </h2>
          <span className="label">Pampanga, PH</span>
        </Reveal>

        <div className="about__grid">
          <Reveal>
            <p className="about__lead">
              I like the point where a design decision turns into an engineering
              constraint — and the work of making both of them{' '}
              <em>hold together.</em>
            </p>
          </Reveal>

          <Reveal className="about__body" delay={100}>
            <p>
              I&apos;m a third-year Computer Science student at Holy Angel
              University, currently on the Dean&apos;s List. Most of what I know
              comes from building things that had to work for someone else:
              a photography site that had to stay out of the way of the pictures,
              an org membership app that replaced a spreadsheet three people were
              editing badly.
            </p>
            <p>
              My work sits between design and security. I care about how an
              interface reads at a glance, and about what happens when someone
              tries to fake their way through it — which is where ViVy came from.
            </p>

            <dl className="about__facts">
              <div>
                <dt>Education</dt>
                <dd>BS Computer Science, Holy Angel University, 2023 — present</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Web and mobile development, interface design, verification</dd>
              </div>
              <div>
                <dt>Tools</dt>
                <dd>JavaScript, Python, Java, Dart, SQL, Figma, Git</dd>
              </div>
              <div>
                <dt>Also</dt>
                <dd>FreeCodeCamp, Cisco Networking Academy, AWS Academy, CompTIA</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
