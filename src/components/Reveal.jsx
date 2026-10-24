import { useEffect, useRef, useState } from 'react'

/**
 * Fades an element up the first time it scrolls into view.
 * Uses IntersectionObserver so there is no scroll listener.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
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
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal${seen ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...style, '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
