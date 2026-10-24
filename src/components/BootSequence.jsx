import { useCallback, useEffect, useRef, useState } from 'react'

const KEY = 'jfm-boot-2026'

/**
 * Should the machine boot? Shown once per browser session, never when the
 * visitor has asked for reduced motion, and skippable with ?noboot for
 * screenshots and PDF exports.
 */
export function shouldBoot() {
  if (typeof window === 'undefined') return false
  if (new URLSearchParams(window.location.search).has('noboot')) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return sessionStorage.getItem(KEY) !== '1'
  } catch {
    return true
  }
}

/**
 * A Commodore-style cold boot. Three seconds, once a session: the tube warms
 * up, the OS reports its memory, the portfolio loads from disk, and the screen
 * collapses back into a line before the site comes up.
 */
export default function BootSequence({ onDone }) {
  const [off, setOff] = useState(false)
  const finished = useRef(false)
  const timers = useRef([])

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true

    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* session storage can be blocked; the intro still works */
    }

    setOff(true)
    timers.current.push(window.setTimeout(onDone, 430))
  }, [onDone])

  useEffect(() => {
    const root = document.documentElement
    const page = document.querySelector('.page')
    const body = document.body

    root.classList.add('is-booting')
    body.classList.add('boot-lock')
    page?.setAttribute('inert', '')
    page?.setAttribute('aria-hidden', 'true')

    const skip = (event) => {
      if (event.type === 'keydown' && event.key === 'Tab') return
      finish()
    }

    timers.current.push(window.setTimeout(() => finish(false), 2900))

    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)

    return () => {
      root.classList.remove('is-booting')
      body.classList.remove('boot-lock')
      page?.removeAttribute('inert')
      page?.removeAttribute('aria-hidden')
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
      timers.current.forEach((id) => clearTimeout(id))
      timers.current = []
    }
  }, [finish])

  return (
    <div
      className={`boot${off ? ' is-off' : ''}`}
      role="presentation"
      data-boot
    >
      <div className="boot__bezel">
        <div className="boot__screen">
          <div className="boot__glow" aria-hidden="true" />
          <div className="boot__scan" aria-hidden="true" />
          <div className="boot__inner" aria-hidden="true">
            <p className="boot__line boot__line--head" style={{ '--d': '0.10s' }}>
              JFM-64 PERSONAL COMPUTER
            </p>
            <p className="boot__line" style={{ '--d': '0.34s' }}>
              64K RAM SYSTEM&nbsp;&nbsp;38911 BASIC BYTES FREE
            </p>
            <p className="boot__line boot__line--dim" style={{ '--d': '0.56s' }}>
              PAL / 50 HZ&nbsp;&nbsp;·&nbsp;&nbsp;ROM 901227-03
            </p>

            <p className="boot__line boot__line--ready" style={{ '--d': '0.80s' }}>
              READY.
            </p>

            <p className="boot__line" style={{ '--d': '1.02s' }}>
              LOAD &quot;PORTFOLIO&quot;,8,1
            </p>
            <p className="boot__line boot__line--dim" style={{ '--d': '1.24s' }}>
              SEARCHING FOR PORTFOLIO
            </p>
            <p className="boot__line" style={{ '--d': '1.46s' }}>
              LOADING
              <span className="boot__bar">
                <i />
              </span>
              <span className="boot__pct">100%</span>
            </p>

            <p className="boot__line boot__line--ready" style={{ '--d': '1.94s' }}>
              READY.
            </p>
            <p className="boot__line boot__line--run" style={{ '--d': '2.10s' }}>
              RUN
              <span className="boot__cursor" aria-hidden="true" />
            </p>
          </div>

          <span className="boot__osd" aria-hidden="true">
            JFM-64 · 64K · PAL
          </span>
          <span className="boot__flash" aria-hidden="true" />
        </div>
      </div>

      <button type="button" className="boot__skip" onClick={finish}>
        Skip intro <kbd>ESC</kbd>
      </button>

      <p className="boot__hint" aria-hidden="true">
        click anywhere or press a key
      </p>
    </div>
  )
}
