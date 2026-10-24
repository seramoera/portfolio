/**
 * A deterministic CSS barcode. Same string, same bars — no images, no random
 * layout shift. Decorative, so it is hidden from assistive tech.
 */
export default function Barcode({ value = 'JFM', height = 32, className = '' }) {
  const seed = Array.from(value).reduce(
    (total, char) => (total * 31 + char.charCodeAt(0)) % 99991,
    7
  )

  const bars = Array.from({ length: 42 }, (_, index) => {
    const n = (seed * (index + 5) * 2654435761) % 1000
    if (n < 160) return 3
    if (n < 480) return 2
    if (n < 760) return 1
    return 1
  })

  return (
    <span
      className={`barcode ${className}`}
      style={{ '--barcode-h': `${height}px` }}
      aria-hidden="true"
    >
      {bars.map((width, index) => (
        <i
          key={index}
          style={{
            width: `${width}px`,
            opacity: width === 1 ? 0.55 : 1,
          }}
        />
      ))}
    </span>
  )
}
