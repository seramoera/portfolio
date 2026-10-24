import DecodeText from './DecodeText.jsx'
import Reveal from './Reveal.jsx'

/**
 * The ruled line that opens every section. Number, label, a dotted leader and
 * a piece of metadata, like the index at the top of a printed spec sheet.
 */
export default function SectionHead({ num, label, meta, className = '' }) {
  return (
    <Reveal className={`shead ${className}`} variant="fade">
      <span className="shead__num">{num}</span>
      <DecodeText className="shead__label" text={label} />
      <span className="shead__rule" aria-hidden="true" />
      <span className="shead__meta">{meta}</span>
      <span className="shead__sq" aria-hidden="true" />
    </Reveal>
  )
}
