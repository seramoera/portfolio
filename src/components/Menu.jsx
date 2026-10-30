import { useEffect, useRef } from 'react'
import { playSfx } from '../audio/sfx.js'
import { site } from '../data/projects.js'
import { resume } from '../data/resume.js'
import { ArrowUpRight, Download } from './Icons.jsx'

const links = [
  { href: '#work', label: 'Work', note: 'Selected builds' },
  { href: '#about', label: 'About', note: 'Personnel file' },
  { href: '#skills', label: 'Skills', note: 'The kit' },
  { href: '#notes', label: 'Notes', note: 'Field notes' },
  { href: '#resume', label: 'Résumé', note: 'One page' },
  { href: '#contact', label: 'Contact', note: 'Open channel' },
]

/**
 * Full-screen OSD menu for narrow screens. Big numbered channels, a dithered
 * black field, and the same data the desktop nav carries.
 */
export default function Menu({ open, onClose, current }) {
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return

    playSfx('menu-open')
    return () => playSfx('menu-close')
  }, [open])

  useEffect(() => {
    if (!open) return

    const previous = document.activeElement
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled])'
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.body.classList.add('menu-lock')
    window.setTimeout(() => closeRef.current?.focus(), 60)
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.classList.remove('menu-lock')
      window.removeEventListener('keydown', onKey)
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="menu" role="dialog" aria-modal="true" aria-label="Site menu">
      <div className="menu__dither" aria-hidden="true" />
      <div className="menu__glow" aria-hidden="true" />
      <div className="menu__noise" aria-hidden="true">
        01 10 11 00 01 10 11 00 01 10 11 00 01 10 11 00 01 10 11 00 01 10 11
        00 01 10 11 00 01 10 11 00
      </div>

      <div className="menu__panel" ref={panelRef}>
        <header className="menu__top">
          <span className="menu__brand">
            JFM-64
            <small>SYSTEM MENU</small>
          </span>
          <span className="menu__status">
            <i aria-hidden="true" />
            ONLINE
          </span>
          <button
            type="button"
            className="menu__close"
            ref={closeRef}
            onClick={onClose}
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </header>

        <nav className="menu__links" aria-label="Primary">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={current === link.href ? 'is-current' : undefined}
              aria-current={current === link.href ? 'location' : undefined}
              onClick={onClose}
              style={{ '--i': index }}
            >
              <span className="menu__num">0{index + 1}</span>
              <span className="menu__label">{link.label}</span>
              <span className="menu__note">{link.note}</span>
              <span className="menu__arrow" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </a>
          ))}
        </nav>

        <footer className="menu__foot">
          <div>
            <span className="label">Direct line</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div>
            <span className="label">Take it with you</span>
            <a href={resume.href} download>
              Résumé · PDF <Download />
            </a>
          </div>
          <p className="menu__hint">
            <span aria-hidden="true">C:\&gt;</span> select a channel
            <i aria-hidden="true" />
          </p>
        </footer>
      </div>
    </div>
  )
}
