import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Work from './components/Work.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <Nav />
      <main id="top">
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
