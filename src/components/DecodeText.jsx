import { useEffect, useRef, useState } from 'react'

const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+<>/=_'

function scramble(text) {
  return Array.from(text)
    .map((char) => {
      if (char === ' ') return ' '
      if (!/[a-z0-9]/i.test(char)) return char
      return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    })
    .join('')
}

/**
 * Terminal decode: the final text is visible until the element enters the
 * viewport, then it unscrambles once, left to right. Monospace labels keep
 * their width, so nothing reflows. Reduced motion gets the clean text.
 */
export default function DecodeText({
  text,
  as: Tag = 'span',
  className = '',
  speed = 26,
  ...rest
}) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(text)
  const [done, setDone] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text)
      setDone(true)
      return
    }
    if (typeof IntersectionObserver === 'undefined') return

    let interval = 0
    let timeout = 0

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          io.disconnect()
          setDone(false)

          let frame = 0
          const total = Math.max(8, Math.min(30, Math.ceil(text.length * 1.6)))

          interval = window.setInterval(() => {
            frame += 1
            const revealed = Math.floor((frame / total) * text.length)

            if (revealed >= text.length) {
              clearInterval(interval)
              setDisplay(text)
              setDone(true)
              return
            }

            setDisplay(
              text
                .split('')
                .map((char, index) => {
                  if (char === ' ' || index < revealed) return char
                  if (!/[a-z0-9]/i.test(char)) return char
                  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                })
                .join('')
            )
          }, speed)
        }
      },
      { threshold: 0.4 }
    )

    io.observe(el)

    return () => {
      io.disconnect()
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [speed, text])

  return (
    <Tag ref={ref} className={className} {...rest}>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        className={`decode${done ? ' is-done' : ''}`}
        data-text={text}
      >
        {display}
      </span>
    </Tag>
  )
}
