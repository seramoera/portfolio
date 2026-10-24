/**
 * Placeholder line-art for each project, standing in until real screenshots
 * exist. Hairline strokes, one accent mark at most — the same discipline the
 * rest of the page uses. Swap these for <img> once you have captures.
 */

const s = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
}

const accent = {
  fill: 'none',
  stroke: 'var(--accent)',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
}

function Receipt() {
  return (
    <svg viewBox="0 0 320 400" aria-hidden="true" focusable="false">
      {/* receipt body */}
      <rect x="92" y="52" width="136" height="272" rx="4" {...s} />
      {/* header block */}
      <path d="M112 86h96M112 106h56" {...s} />
      {/* line items */}
      <path d="M112 148h72M112 176h96M112 198h48M112 226h96" {...s} />
      {/* total */}
      <path d="M112 266h56" {...s} />
      <path d="M112 288h96" {...s} />
      {/* scan line */}
      <path d="M64 210h192" strokeDasharray="4 6" {...accent} />
      <circle cx="256" cy="210" r="4" {...accent} />
      {/* crosshair corners */}
      <path d="M44 92V72h20M256 72h20v20M44 328v20h20M256 348h20v-20" {...s} opacity="0.5" />
      {/* label ticks */}
      <path d="M212 148h8M212 176h8M212 226h8" {...s} opacity="0.6" />
    </svg>
  )
}

function Aperture() {
  const blades = [0, 60, 120, 180, 240, 300].map((deg) => {
    const rad = (deg * Math.PI) / 180
    const x1 = 160 + Math.cos(rad) * 34
    const y1 = 200 + Math.sin(rad) * 34
    const x2 = 160 + Math.cos(rad) * 118
    const y2 = 200 + Math.sin(rad) * 118
    return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`
  })

  return (
    <svg viewBox="0 0 320 400" aria-hidden="true" focusable="false">
      <circle cx="160" cy="200" r="96" {...s} />
      <circle cx="160" cy="200" r="74" {...s} opacity="0.55" />
      <circle cx="160" cy="200" r="34" {...s} />
      {blades.map((d, i) => (
        <path key={i} d={d} {...s} opacity="0.45" />
      ))}
      {/* focal point */}
      <circle cx="160" cy="200" r="6" {...accent} />
      {/* frame ticks */}
      <path d="M160 68v-16M160 348v-16M28 200H12M308 200h-16" {...s} opacity="0.6" />
      {/* horizon */}
      <path d="M52 290h216" strokeDasharray="2 8" {...s} opacity="0.35" />
    </svg>
  )
}

function Roster() {
  return (
    <svg viewBox="0 0 320 400" aria-hidden="true" focusable="false">
      {/* three stacked rows */}
      {[86, 168, 250].map((y, i) => (
        <g key={y}>
          <rect x="58" y={y} width="204" height="58" rx="4" {...s} opacity={i === 1 ? 1 : 0.55} />
          <circle cx="86" cy={y + 29} r="11" {...s} opacity={i === 1 ? 1 : 0.55} />
          <path d={`M110 ${y + 22}h${i === 1 ? 74 : 56}`} {...s} opacity={i === 1 ? 1 : 0.55} />
          <path d={`M110 ${y + 38}h${i === 1 ? 46 : 34}`} {...s} opacity="0.3" />
        </g>
      ))}
      {/* check on the active row */}
      <path d="M232 186l6 7 12-14" {...accent} />
      {/* connecting spine */}
      <path d="M36 115v162" {...s} opacity="0.35" />
      <circle cx="36" cy="115" r="3" {...s} opacity="0.5" />
      <circle cx="36" cy="277" r="3" {...s} opacity="0.5" />
      {/* header ticks */}
      <path d="M58 58h72M58 68h38" {...s} opacity="0.5" />
      <path d="M262 58h-16" {...s} opacity="0.3" />
    </svg>
  )
}

function Road() {
  return (
    <svg viewBox="0 0 320 400" aria-hidden="true" focusable="false">
      {/* winding route */}
      <path
        d="M84 348c0-38 58-44 58-84s-64-46-64-86 60-50 60-84"
        {...s}
      />
      {/* verges */}
      <path
        d="M54 348c0-52 58-58 58-90s-64-42-64-82 60-46 60-88"
        {...s}
        opacity="0.3"
      />
      <path
        d="M114 348c0-30 58-40 58-78s-64-50-64-92 60-54 60-86"
        {...s}
        opacity="0.3"
      />
      {/* centre dashes */}
      <path
        d="M84 348c0-38 58-44 58-84s-64-46-64-86 60-50 60-84"
        strokeDasharray="3 10"
        {...s}
        opacity="0.55"
      />
      {/* milestones */}
      <circle cx="84" cy="316" r="4" {...s} opacity="0.7" />
      <circle cx="122" cy="230" r="4" {...s} opacity="0.7" />
      <circle cx="118" cy="122" r="4" {...accent} />
      {/* destination */}
      <circle cx="138" cy="94" r="10" {...accent} />
      {/* label ticks */}
      <path d="M170 232h28M170 124h22" {...s} opacity="0.35" />
      {/* ground line */}
      <path d="M40 366h240" {...s} opacity="0.25" />
    </svg>
  )
}

const art = {
  receipt: Receipt,
  aperture: Aperture,
  roster: Roster,
  road: Road,
}

export default function ProjectArt({ kind = 'receipt' }) {
  const Art = art[kind] ?? Receipt
  return <Art />
}
