// ---------------------------------------------------------------------------
// Tiny synthesized sound design. No audio files, no library: every cue is
// built from oscillators and a short noise buffer, so the site stays static.
//
// Browsers block audio until a gesture, so the boot screen acts as the
// power-on gate. The preference is remembered; the nav has a mute switch.
// ---------------------------------------------------------------------------

const KEY = 'jfm-sfx-2026'
const EVENT = 'jfm:sfx'
const VOLUME = 0.22

let enabled = readPreference()
let context = null
let master = null
let noiseBuffer = null

function readPreference() {
  if (typeof window === 'undefined') return false
  try {
    const stored = window.localStorage.getItem(KEY)
    return stored === null ? true : stored === '1'
  } catch {
    return true
  }
}

function emit() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent(EVENT, { detail: { enabled } })
  )
}

function ensureContext() {
  if (!enabled || typeof window === 'undefined') return null

  if (!context || context.state === 'closed') {
    const AudioCtor = window.AudioContext || window.webkitAudioContext
    if (!AudioCtor) return null

    context = new AudioCtor()
    master = context.createGain()
    master.gain.value = VOLUME
    master.connect(context.destination)
  }

  return context
}

export function isSoundEnabled() {
  return enabled
}

export function setSoundEnabled(next) {
  const value = Boolean(next)
  if (value === enabled) return

  enabled = value

  try {
    window.localStorage.setItem(KEY, value ? '1' : '0')
  } catch {
    /* private mode and blocked storage still get a working toggle */
  }

  if (!value) {
    if (context && master) {
      master.gain.cancelScheduledValues(context.currentTime)
      master.gain.setTargetAtTime(0.0001, context.currentTime, 0.025)
    }
  } else {
    const ctx = ensureContext()
    if (ctx && master) {
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.setValueAtTime(
        Math.max(0.0001, master.gain.value),
        ctx.currentTime
      )
      master.gain.setTargetAtTime(VOLUME, ctx.currentTime, 0.035)
    }
  }

  emit()
}

export function subscribeSound(listener) {
  if (typeof window === 'undefined') return () => {}

  const onSound = (event) => listener(Boolean(event.detail?.enabled))
  window.addEventListener(EVENT, onSound)
  return () => window.removeEventListener(EVENT, onSound)
}

export function unlockAudio() {
  if (!enabled) return
  const ctx = ensureContext()
  if (ctx?.state === 'suspended') ctx.resume().catch(() => {})
}

function getNoise(ctx) {
  if (noiseBuffer) return noiseBuffer

  const length = Math.floor(ctx.sampleRate * 0.5)
  noiseBuffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = noiseBuffer.getChannelData(0)

  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1
  }

  return noiseBuffer
}

function tone(
  ctx,
  {
    start = 0,
    duration = 0.12,
    frequency = 440,
    endFrequency,
    type = 'sine',
    gain = 0.1,
  }
) {
  const t0 = ctx.currentTime + start
  const osc = ctx.createOscillator()
  const amp = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(Math.max(20, frequency), t0)
  if (endFrequency) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(20, endFrequency),
      t0 + duration
    )
  }

  amp.gain.setValueAtTime(0.0001, t0)
  amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.012)
  amp.gain.setValueAtTime(gain, t0 + Math.max(0.02, duration - 0.035))
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)

  osc.connect(amp)
  amp.connect(master)
  osc.start(t0)
  osc.stop(t0 + duration + 0.03)
}

function noise(
  ctx,
  {
    start = 0,
    duration = 0.1,
    gain = 0.08,
    frequency = 1200,
    endFrequency,
    q = 1,
    type = 'bandpass',
  }
) {
  const t0 = ctx.currentTime + start
  const source = ctx.createBufferSource()
  const filter = ctx.createBiquadFilter()
  const amp = ctx.createGain()

  source.buffer = getNoise(ctx)
  source.loop = true

  filter.type = type
  filter.frequency.setValueAtTime(Math.max(20, frequency), t0)
  filter.Q.value = q
  if (endFrequency) {
    filter.frequency.exponentialRampToValueAtTime(
      Math.max(20, endFrequency),
      t0 + duration
    )
  }

  amp.gain.setValueAtTime(0.0001, t0)
  amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.01)
  amp.gain.setValueAtTime(gain, t0 + Math.max(0.02, duration - 0.025))
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)

  source.connect(filter)
  filter.connect(amp)
  amp.connect(master)
  source.start(t0)
  source.stop(t0 + duration + 0.03)
}

function bootSequence(ctx) {
  // Relay click, tube hum, then the tiny beeps of a machine waking up.
  noise(ctx, {
    duration: 0.035,
    gain: 0.12,
    frequency: 2200,
    type: 'highpass',
  })
  tone(ctx, {
    frequency: 76,
    endFrequency: 52,
    duration: 0.5,
    gain: 0.16,
  })
  tone(ctx, {
    frequency: 220,
    endFrequency: 440,
    duration: 0.18,
    type: 'triangle',
    gain: 0.055,
    start: 0.12,
  })

  tone(ctx, { frequency: 660, duration: 0.07, gain: 0.06, start: 0.78 })
  tone(ctx, { frequency: 880, duration: 0.09, gain: 0.055, start: 0.9 })

  // Seven short seeks while the "disk" loads.
  for (let i = 0; i < 7; i += 1) {
    noise(ctx, {
      start: 1.22 + i * 0.11,
      duration: 0.03,
      gain: 0.05,
      frequency: 1700 + i * 260,
      q: 1.3,
    })
  }

  noise(ctx, {
    start: 1.46,
    duration: 0.52,
    gain: 0.035,
    frequency: 760,
    endFrequency: 220,
    q: 0.8,
  })
  tone(ctx, {
    frequency: 440,
    endFrequency: 800,
    duration: 0.32,
    type: 'triangle',
    gain: 0.04,
    start: 1.46,
  })

  tone(ctx, { frequency: 620, duration: 0.07, gain: 0.055, start: 1.94 })
  tone(ctx, { frequency: 980, duration: 0.08, gain: 0.06, start: 2.1 })
}

function shutdown(ctx) {
  tone(ctx, {
    frequency: 720,
    endFrequency: 42,
    duration: 0.3,
    type: 'sawtooth',
    gain: 0.08,
  })
  noise(ctx, {
    duration: 0.2,
    gain: 0.07,
    frequency: 900,
    endFrequency: 100,
    type: 'highpass',
  })
}

function play(name, ctx) {
  switch (name) {
    case 'boot':
      bootSequence(ctx)
      break

    case 'shutdown':
      shutdown(ctx)
      break

    case 'channel':
      noise(ctx, {
        duration: 0.14,
        gain: 0.1,
        frequency: 2300,
        q: 0.9,
      })
      tone(ctx, {
        frequency: 92,
        endFrequency: 58,
        duration: 0.09,
        type: 'square',
        gain: 0.045,
      })
      tone(ctx, { frequency: 1500, duration: 0.035, gain: 0.035 })
      break

    case 'tv-on':
      tone(ctx, {
        frequency: 54,
        endFrequency: 170,
        duration: 0.38,
        gain: 0.075,
      })
      noise(ctx, {
        duration: 0.12,
        gain: 0.055,
        frequency: 1400,
        q: 0.7,
      })
      break

    case 'menu-open':
      tone(ctx, {
        frequency: 280,
        endFrequency: 520,
        duration: 0.15,
        type: 'triangle',
        gain: 0.05,
      })
      tone(ctx, {
        frequency: 520,
        endFrequency: 820,
        duration: 0.12,
        type: 'triangle',
        gain: 0.04,
        start: 0.09,
      })
      break

    case 'menu-close':
      tone(ctx, {
        frequency: 620,
        endFrequency: 280,
        duration: 0.16,
        type: 'triangle',
        gain: 0.045,
      })
      break

    case 'ticket':
      noise(ctx, {
        duration: 0.11,
        gain: 0.07,
        frequency: 2100,
        endFrequency: 900,
        q: 1.1,
      })
      tone(ctx, {
        frequency: 180,
        endFrequency: 120,
        duration: 0.055,
        gain: 0.025,
      })
      break

    case 'copy':
      tone(ctx, { frequency: 880, duration: 0.055, gain: 0.055 })
      tone(ctx, {
        frequency: 1320,
        duration: 0.07,
        gain: 0.045,
        start: 0.07,
      })
      break

    case 'toggle':
      tone(ctx, {
        frequency: 640,
        endFrequency: 980,
        duration: 0.075,
        type: 'triangle',
        gain: 0.055,
      })
      break

    default:
      break
  }
}

export function playSfx(name) {
  if (!enabled) return

  const ctx = ensureContext()
  if (!ctx) return

  if (ctx.state === 'suspended') {
    ctx
      .resume()
      .then(() => {
        if (enabled) play(name, ctx)
      })
      .catch(() => {})
    return
  }

  play(name, ctx)
}
