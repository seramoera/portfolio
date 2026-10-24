import { useEffect, useState } from 'react'
import { ArrowUpRight } from './Icons.jsx'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <a className="nav__mark" href="#top" aria-label="Jasmine Magtanong, back to top">
        <span className="nav__dot" aria-hidden="true" />
        Jasmine Magtanong
      </a>

      <nav className="nav__links" aria-label="Primary">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="nav__cta" href="#contact">
        <span>Get in touch</span>
        <ArrowUpRight />
      </a>
    </header>
  )
}
