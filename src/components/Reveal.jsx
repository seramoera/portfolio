import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element the first time it scrolls into view.
 * Variants let each section arrive differently: up, left, right, clip, scale.
 * Uses IntersectionObserver so there is no scroll listener.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  variant = 'up',
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSeen(true)
            io.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant}${seen ? ' is-in' : ''}${
        className ? ` ${className}` : ''
      }`}
      style={{ '--d': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
