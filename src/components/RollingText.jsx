/**
 * Per-letter roll on hover, borrowed from the odometer labels on
 * contentarchitecture.dev. The screen-reader label is rendered once; the
 * duplicated letters are decorative.
 */
export default function RollingText({ text }) {
  return (
    <span className="roll">
      <span className="sr-only">{text}</span>
      <span className="roll__visual" aria-hidden="true">
        {Array.from(text).map((char, index) => (
          <span
            className="roll__char"
            key={`${char}-${index}`}
            style={{ '--i': index }}
          >
            <span className="roll__stack">
              <span>{char === ' ' ? '\u00a0' : char}</span>
              <span>{char === ' ' ? '\u00a0' : char}</span>
            </span>
          </span>
        ))}
      </span>
    </span>
  )
}
