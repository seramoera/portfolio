import { useEffect, useState } from 'react'
import { getTheme, setTheme, subscribeTheme } from '../theme/theme.js'
import { playSfx } from '../audio/sfx.js'
import { Moon, Sun } from './Icons.jsx'

/**
 * Two-state light/dark control. The nav renders a single toggle; the mobile
 * menu renders an explicit Light / Dark pair so the choice is never hidden.
 */
export default function ThemeToggle({ variant = 'nav', className = '' }) {
  const [theme, setLocalTheme] = useState(() => getTheme())
  const dark = theme === 'dark'

  useEffect(() => subscribeTheme(setLocalTheme), [])

  const choose = (next) => {
    if (next === theme) return
    setTheme(next)
    playSfx('toggle')
  }

  if (variant === 'menu') {
    return (
      <div
        className={`theme-switch${className ? ` ${className}` : ''}`}
        role="group"
        aria-label="Colour theme"
      >
        <button
          type="button"
          className={!dark ? 'is-active' : undefined}
          aria-pressed={!dark}
          onClick={() => choose('light')}
        >
          <Sun />
          <span>Light</span>
        </button>
        <button
          type="button"
          className={dark ? 'is-active' : undefined}
          aria-pressed={dark}
          onClick={() => choose('dark')}
        >
          <Moon />
          <span>Dark</span>
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      className={`nav__theme${dark ? ' is-dark' : ''}${className ? ` ${className}` : ''}`}
      aria-pressed={dark}
      aria-label={
        dark
          ? 'Dark mode on: switch to light mode'
          : 'Light mode on: switch to dark mode'
      }
      title={dark ? 'Dark mode' : 'Light mode'}
      onClick={() => choose(dark ? 'light' : 'dark')}
    >
      {dark ? <Moon /> : <Sun />}
      <span className="nav__theme-label">{dark ? 'Dark' : 'Light'}</span>
    </button>
  )
}
