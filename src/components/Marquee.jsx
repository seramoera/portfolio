const items = [
  'JavaScript',
  'Python',
  'Java',
  'Dart',
  'SQL',
  'React',
  'Flutter',
  'Figma',
  'OCR',
  'HTML / CSS',
  'Git',
]

function Row({ ariaHidden = false }) {
  return (
    <div className="marquee__row" aria-hidden={ariaHidden || undefined}>
      {items.map((item) => (
        <span key={item}>
          <b>{item}</b>
          <s aria-hidden="true">/</s>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee" aria-label="Tools and languages">
      <div className="marquee__track">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  )
}
