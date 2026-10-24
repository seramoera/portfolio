import { useCallback, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Notes from './components/Notes.jsx'
import Resume from './components/Resume.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Backdrop from './components/Backdrop.jsx'
import AsciiBand from './components/AsciiBand.jsx'
import Cursor from './components/Cursor.jsx'
import BootSequence, { shouldBoot } from './components/BootSequence.jsx'

export default function App() {
  const [booting, setBooting] = useState(() => shouldBoot())
  const done = useCallback(() => setBooting(false), [])

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>

      {booting ? <BootSequence onDone={done} /> : null}

      <div className={`page${booting ? ' is-booting' : ' is-ready'}`}>
        <Backdrop />
        <Cursor />

        <Nav />
        <main className="site-main" id="top">
          <Hero />
          <Marquee />
          <Work />
          <AsciiBand
            tone="light"
            height={112}
            label="TRANSMISSION 01 / SELECTED WORK"
            meta="SIGNAL 98%"
            seed={17}
          />
          <About />
          <Skills />
          <Notes />
          <AsciiBand
            tone="dark"
            height={92}
            label="TRANSMISSION 02 / FIELD NOTES"
            meta="END OF TAPE"
            seed={41}
          />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
