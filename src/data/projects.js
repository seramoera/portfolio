// ---------------------------------------------------------------------------
// Project data. Everything on the site comes from this file.
//
// To edit: change the text below. To add a project: copy a block, give it a
// unique `id`, then bump `num` values so they still read in order.
//
// `art` picks the placeholder illustration in src/components/ProjectArt.jsx.
// Options: 'receipt' | 'aperture' | 'roster' | 'road'
// When you have real screenshots, drop them in /public and swap the
// <ProjectArt /> block in src/components/Work.jsx for an <img />.
//
// TODO: the `stack` values below are guesses. Replace them with what you
// actually used, and replace every `href: '#'` with a real link.
// ---------------------------------------------------------------------------

export const projects = [
  {
    id: 'vivy',
    num: '01',
    title: 'ViVy',
    category: 'Mobile · Security',
    year: '2025',
    summary:
      'A mobile app that checks whether a GCash receipt is genuine or tampered with, so a seller can verify a payment before handing anything over.',
    detail:
      'Reads the receipt image, validates its structure against the format GCash actually produces, and flags the small inconsistencies that editing software leaves behind.',
    stack: ['Flutter', 'Python', 'OCR'],
    links: [
      { label: 'Case study', href: '#' },
      { label: 'Code', href: '#' },
    ],
    art: 'receipt',
  },
  {
    id: 'lumen-focus',
    num: '02',
    title: 'Lumen Focus',
    category: 'Web · Design',
    year: '2024',
    summary:
      'A photography portfolio site built around the pictures, not the chrome. Type, rhythm, and a lot of restraint.',
    detail:
      'Designed and built end to end: layout system, responsive image handling, and the small interactions that keep a gallery out of the way of the work.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Live site', href: '#' },
      { label: 'Code', href: '#' },
    ],
    art: 'aperture',
  },
  {
    id: 'glide',
    num: '03',
    title: 'Glide',
    category: 'Mobile · Product',
    year: '2025',
    summary:
      'Membership management for a school organisation, replacing a spreadsheet that three different people were editing badly.',
    detail:
      'Handles roles, dues, and attendance, with the messy edge cases that real student orgs have: late payments, transfers, and members who never check their email.',
    stack: ['Flutter', 'Dart', 'Firebase'],
    links: [
      { label: 'Case study', href: '#' },
      { label: 'Code', href: '#' },
    ],
    art: 'roster',
  },
  {
    id: 'jeep-box-hero',
    num: '04',
    title: 'Jeep Box Hero',
    category: 'Game · Narrative',
    year: '2025',
    summary:
      'A story-driven mobile game about the people and routes of the Philippine jeepney, told one fare at a time.',
    detail:
      'Built the narrative structure, the dialogue system, and the 2D art pipeline. The hardest part was making a small loop feel worth repeating.',
    stack: ['Godot', 'Aseprite'],
    links: [{ label: 'Playable build', href: '#' }],
    art: 'road',
  },
]

export const site = {
  name: 'Jasmine F. Magtanong',
  role: 'CS undergraduate · Holy Angel University',
  location: 'Pampanga, Philippines',
  email: 'jasminemagtanong04@gmail.com',
  // TODO: create these and replace the hashes.
  links: [
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Facebook', href: 'https://facebook.com/jasmine.magtanong.5' },
  ],
  availability: 'Open to internship · 2026',
}
