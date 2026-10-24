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

function Cards() {
  return (
    <svg viewBox="0 0 320 400" aria-hidden="true" focusable="false">
      {/* card behind */}
      <rect x="52" y="88" width="122" height="172" rx="6" {...s} opacity="0.5" />
      <rect x="70" y="106" width="86" height="56" rx="2" {...s} opacity="0.35" />
      <path d="M70 180h62M70 196h44M70 212h74" {...s} opacity="0.3" />

      {/* card in front */}
      <rect x="146" y="124" width="122" height="172" rx="6" {...s} />
      <rect x="164" y="142" width="86" height="56" rx="2" {...s} opacity="0.6" />
      <path d="M164 216h62M164 232h44M164 248h74" {...s} opacity="0.5" />
      <circle cx="243" cy="276" r="3" {...accent} />

      {/* trade glyph: one card out, one card in */}
      <path d="M104 332h72" {...s} opacity="0.5" />
      <path d="M168 324l8 8-8 8" {...accent} />
      <path d="M176 368h-72" {...s} opacity="0.5" />
      <path d="M112 360l-8 8 8 8" {...s} opacity="0.5" />

      {/* registration ticks */}
      <path d="M36 110V88h22M284 88v22M36 310v22h22" {...s} opacity="0.3" />
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
  cards: Cards,
  roster: Roster,
  road: Road,
}

export default function ProjectArt({ kind = 'receipt' }) {
  const Art = art[kind] ?? Receipt
  return <Art />
}
