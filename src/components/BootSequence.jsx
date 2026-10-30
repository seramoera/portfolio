import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  isSoundEnabled,
  playSfx,
  setSoundEnabled,
  subscribeSound,
  unlockAudio,
} from '../audio/sfx.js'
import { SoundOff, SoundOn } from './Icons.jsx'

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
 * A Commodore-style cold boot. The first screen is a power-on gate because
 * browsers will not let audio start without a gesture; pressing a key or
 * clicking powers the machine up with its synthesized boot sequence.
 */
export default function BootSequence({ onDone }) {
  const [phase, setPhase] = useState('gate')
  const [sound, setSound] = useState(() => isSoundEnabled())
  const finished = useRef(false)
  const started = useRef(false)
  const timers = useRef([])

  useEffect(() => subscribeSound(setSound), [])

  const finish = useCallback(
    (withSound = true) => {
      if (finished.current) return
      finished.current = true

      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* session storage can be blocked; the intro still works */
      }

      if (withSound) playSfx('shutdown')

      setPhase('off')
      timers.current.push(window.setTimeout(onDone, 430))
    },
    [onDone]
  )

  const start = useCallback(() => {
    if (started.current) return
    started.current = true

    setPhase('running')

    if (isSoundEnabled()) {
      unlockAudio()
      playSfx('boot')
    }
  }, [])

  // The running timer lives in its own phase effect. StrictMode remounts effects
  // once on mount, and the mount cleanup clears timers; keeping the sequence
  // timer here means it is only scheduled after the gate has been passed.
  useEffect(() => {
    if (phase !== 'running') return
    const id = window.setTimeout(() => finish(true), 2900)
    return () => clearTimeout(id)
  }, [phase, finish])

  // Layout effect so the page is inert and the body is locked before the first
  // paint. A passive effect can flush after a very fast first click.
  useLayoutEffect(() => {
    const root = document.documentElement
    const page = document.querySelector('.page')
    const body = document.body

    root.classList.add('is-booting')
    body.classList.add('boot-lock')
    page?.setAttribute('inert', '')
    page?.setAttribute('aria-hidden', 'true')

    return () => {
      root.classList.remove('is-booting')
      body.classList.remove('boot-lock')
      page?.removeAttribute('inert')
      page?.removeAttribute('aria-hidden')
      timers.current.forEach((id) => clearTimeout(id))
      timers.current = []
    }
  }, [])

  useEffect(() => {
    if (phase === 'off') return

    const onKey = (event) => {
      if (event.key === 'Tab') return
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('button')
      ) {
        return
      }

      if (phase === 'gate') {
        if (event.key === 'Escape') finish(false)
        else start()
      } else {
        finish(true)
      }
    }

    const onPointer = (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest('button')
      ) {
        return
      }

      if (phase === 'gate') start()
      else finish(true)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [phase, start, finish])

  const toggleSound = () => {
    const next = !sound
    setSound(next)

    if (next) {
      setSoundEnabled(true)
      unlockAudio()
      playSfx('toggle')
    } else {
      playSfx('toggle')
      setSoundEnabled(false)
    }
  }

  const running = phase === 'running'

  return (
    <div
      className={`boot${phase === 'off' ? ' is-off' : ''}${
        phase === 'gate' ? ' boot--gate' : ''
      }`}
      role="presentation"
      data-boot
    >
      <div className="boot__bezel">
        <div className="boot__screen">
          <div className="boot__glow" aria-hidden="true" />
          <div className="boot__scan" aria-hidden="true" />

          {phase === 'gate' ? (
            <div className="boot__gate">
              <p className="boot__gate-kicker">JFM-64 PERSONAL COMPUTER</p>
              <p className="boot__gate-sub">
                64K RAM SYSTEM · 38911 BASIC BYTES FREE
              </p>

              <button type="button" className="boot__power" onClick={start}>
                <span>Power on</span>
                <small>press any key</small>
              </button>

              <p className="boot__gate-note">
                Sound is {sound ? 'on' : 'off'} · use the SFX switch to change
                it
              </p>
            </div>
          ) : (
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
          )}

          <span className="boot__osd" aria-hidden="true">
            JFM-64 · 64K · PAL
          </span>
          {running ? <span className="boot__flash" aria-hidden="true" /> : null}
        </div>
      </div>

      <button
        type="button"
        className={`boot__audio${sound ? ' is-on' : ''}`}
        aria-pressed={sound}
        aria-label={
          sound ? 'SFX on: mute sound effects' : 'SFX off: enable sound effects'
        }
        onClick={toggleSound}
      >
        {sound ? <SoundOn /> : <SoundOff />}
        <span>{sound ? 'SFX on' : 'SFX off'}</span>
      </button>

      <button
        type="button"
        className="boot__skip"
        onClick={() => finish(running)}
      >
        Skip intro <kbd>ESC</kbd>
      </button>

      <p className="boot__hint" aria-hidden="true">
        {phase === 'gate'
          ? 'press any key to power on'
          : 'click anywhere or press a key to skip'}
      </p>
    </div>
  )
}
