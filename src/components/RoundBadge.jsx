/**
 * Slow-spinning circular label. Pure SVG text on a path, so it stays crisp at
 * any size and costs nothing at runtime.
 */
export default function RoundBadge({ text = 'Open to OJT · 2026 · ' }) {
  return (
    <div className="badge" aria-hidden="true">
      <svg viewBox="0 0 120 120" focusable="false">
        <defs>
          <path
            id="badge-circle"
            d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
          />
        </defs>
        <text>
          <textPath
            href="#badge-circle"
            textLength="282"
            lengthAdjust="spacing"
          >
            {text + text}
          </textPath>
        </text>
      </svg>
      <span className="badge__core">✳</span>
    </div>
  )
}
