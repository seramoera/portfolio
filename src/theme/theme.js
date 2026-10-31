// ---------------------------------------------------------------------------
// Colour theme preference. A first visit opens on the dark edition; a visitor
// can pin either theme from the nav or the menu, and the choice survives
// reloads.
// ---------------------------------------------------------------------------

const KEY = 'jfm-theme-2026'
const EVENT = 'jfm:theme'
const THEMES = ['light', 'dark']
const DEFAULT = 'dark'

function readStored() {
  if (typeof window === 'undefined') return null

  try {
    const stored = window.localStorage.getItem(KEY)
    return THEMES.includes(stored) ? stored : null
  } catch {
    return null
  }
}

function emit(theme) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { theme } }))
}

function paint(theme) {
  const root = document.documentElement
  const meta = document.querySelector('meta[name="theme-color"]')

  // Suppress transitions for one frame so the swap reads as a cut, not a fade.
  root.classList.add('is-theming')
  root.dataset.theme = theme
  root.style.colorScheme = theme

  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#0d0f14' : '#f2eee4')
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => root.classList.remove('is-theming'))
  })
}

export function getTheme() {
  if (typeof document === 'undefined') return DEFAULT
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function setTheme(next) {
  if (!THEMES.includes(next)) return

  try {
    window.localStorage.setItem(KEY, next)
  } catch {
    /* private mode still gets a working toggle */
  }

  if (getTheme() !== next) paint(next)
  emit(next)
}

export function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark')
}

export function subscribeTheme(listener) {
  if (typeof window === 'undefined') return () => {}

  const onTheme = (event) => listener(event.detail?.theme ?? getTheme())
  window.addEventListener(EVENT, onTheme)
  return () => window.removeEventListener(EVENT, onTheme)
}

/**
 * Apply the stored choice (or the dark default) before the app mounts.
 * Called from main.jsx; index.html repeats the same decision inline so the
 * first paint never flashes the wrong theme.
 */
export function initTheme() {
  if (typeof window === 'undefined') return

  const theme = readStored() ?? DEFAULT

  // index.html has normally set this already; keep it in sync for dev/HMR.
  if (getTheme() !== theme || !document.documentElement.style.colorScheme) {
    paint(theme)
  }
}
