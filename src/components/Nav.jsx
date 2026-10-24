import { useEffect, useRef, useState } from 'react'
import { resume } from '../data/resume.js'
import { Download } from './Icons.jsx'
import Magnetic from './Magnetic.jsx'
import Menu from './Menu.jsx'
import RollingText from './RollingText.jsx'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#notes', label: 'Notes' },
  { href: '#contact', label: 'Contact' },
]

const order = ['#work', '#about', '#skills', '#notes', '#resume', '#contact']

export default function Nav() {
  const ref = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [current, setCurrent] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // One rAF-throttled scroll listener. Progress is a CSS variable so the nav
  // never re-renders while scrolling; `scrolled` changes only twice.
  useEffect(() => {
    const nav = ref.current
    let raf = 0

    const paint = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      nav?.style.setProperty('--progress', progress.toFixed(4))
      setScrolled(window.scrollY > 30)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Which section is crossing the reading line at ~42% of the viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sections = order
      .map((selector) => document.querySelector(selector))
      .filter(Boolean)

    const io = new IntersectionObserver(
      (entries) => {
        const line = window.innerHeight * 0.42
        const hit = entries.find((entry) => {
          const rect = entry.boundingClientRect
          return rect.top <= line && rect.bottom > line
        })
        if (hit) setCurrent(`#${hit.target.id}`)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach((section) => io.observe(section))
    return () => io.disconnect()
  }, [])

  const page = current ? order.indexOf(current) + 1 : 0

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`} ref={ref}>
        <a className="nav__brand" href="#top" aria-label="Jasmine Magtanong, back to top">
          <span className="nav__badge" aria-hidden="true">
            JFM<span>64</span>
          </span>
          <span className="nav__id">
            <b>Jasmine Magtanong</b>
            <small>CS / PORTFOLIO 2026</small>
          </span>
          <span className="nav__led" aria-hidden="true" />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={current === link.href ? 'is-current' : undefined}
              aria-current={current === link.href ? 'location' : undefined}
            >
              <span className="nav__num" aria-hidden="true">
                0{index + 1}
              </span>
              <RollingText text={link.label} />
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <span className="nav__page" aria-hidden="true">
            P.{String(page).padStart(2, '0')}<i>/06</i>
          </span>

          <Magnetic className="nav__cta-wrap">
            <a
              className={`nav__cta${current === '#resume' ? ' is-current' : ''}`}
              href={resume.href}
              download
              aria-label="Download résumé (PDF)"
              aria-current={current === '#resume' ? 'location' : undefined}
            >
              <span>Résumé</span>
              <Download />
            </a>
          </Magnetic>

          <button
            type="button"
            className={`nav__menu${menuOpen ? ' is-open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav__menu-dither" aria-hidden="true" />
            <span>Menu</span>
            <i aria-hidden="true">
              <b />
              <b />
            </i>
          </button>
        </div>

        <span className="nav__progress" aria-hidden="true">
          <i />
        </span>
      </header>

      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} current={current} />
    </>
  )
}
