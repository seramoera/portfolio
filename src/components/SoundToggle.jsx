import { useEffect, useState } from 'react'
import {
  isSoundEnabled,
  playSfx,
  setSoundEnabled,
  subscribeSound,
  unlockAudio,
} from '../audio/sfx.js'
import { SoundOff, SoundOn } from './Icons.jsx'

/**
 * A small mute switch for the synthesized interface sounds. It lives in the
 * nav so the choice is available everywhere, including after the boot screen.
 */
export default function SoundToggle({ className = '' }) {
  const [sound, setSound] = useState(() => isSoundEnabled())

  useEffect(() => subscribeSound(setSound), [])

  const toggle = () => {
    if (sound) {
      playSfx('toggle')
      setSoundEnabled(false)
    } else {
      setSoundEnabled(true)
      unlockAudio()
      playSfx('toggle')
    }
  }

  return (
    <button
      type="button"
      className={`nav__sound${sound ? ' is-on' : ''}${className ? ` ${className}` : ''}`}
      aria-pressed={sound}
      aria-label={sound ? 'SFX: mute sound effects' : 'Mute: enable sound effects'}
      title={sound ? 'Sound on' : 'Sound off'}
      onClick={toggle}
    >
      {sound ? <SoundOn /> : <SoundOff />}
      <span className="nav__sound-label">{sound ? 'SFX' : 'Mute'}</span>
    </button>
  )
}
