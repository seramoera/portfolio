// ---------------------------------------------------------------------------
// Project data. Everything on the site comes from this file.
//
// To edit: change the text below. To add a project: copy a block, give it a
// unique `id`, then bump `num` values so they still read in order.
//
// `art` picks the placeholder illustration in src/components/ProjectArt.jsx.
// Options: 'receipt' | 'cards' | 'roster' | 'road'
// When you have real screenshots, drop them in /public and swap the
// <ProjectArt /> block in src/components/Work.jsx for an <img />.
//
// TODO: the `stack`, `year`, and `caseStudy.meta` values below are guesses.
// Replace them with what you actually used, and replace every `href: '#'` with
// a real link. The `caseStudy` blocks open inline under each project; they are
// written from the summaries, so check every claim before sending the site out.
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
    links: [{ label: 'Code', href: '#' }],
    art: 'receipt',
    caseStudy: {
      lede:
        'A receipt is a picture of a transaction, not the transaction. ViVy exists for the moment a seller is holding a bag and a stranger is holding up a screenshot.',
      meta: [
        { label: 'Role', value: 'Solo build' },
        { label: 'Timeline', value: '2025' },
        { label: 'Status', value: 'Prototype' },
      ],
      blocks: [
        {
          label: 'The problem',
          body:
            'Sellers hand over goods against a screenshot. Editing one takes about a minute: retype the amount, nudge a reference number, keep everything else intact. The seller is not a forensic tool, and the transaction is already moving.',
        },
        {
          label: 'How it works',
          body:
            'The image goes through OCR, then a structural check against the field order and formatting GCash actually produces. Spacing, reference length, font consistency, and compression artifacts all count against it. The result is a confidence signal, not a yes or no.',
        },
        {
          label: 'What it catches',
          body:
            'Cropped receipts, reused screenshots, retyped fields, and amounts that do not match the claimed payment. The obvious edits fail early; the careful ones are what the structural checks are for.',
        },
        {
          label: 'What it misses',
          body:
            'A genuine receipt from another transaction. A screen recording of a real payment. A determined editor who rebuilds the whole image. It narrows the problem — it does not close it, and the interface says so.',
        },
        {
          label: 'Next',
          body:
            'Show the reason behind every flag instead of a score, and add a reference number the seller can check themselves. A verification tool that asks to be trusted is just another screenshot.',
        },
      ],
    },
  },
  {
    id: 'cardbound',
    num: '02',
    title: 'Cardbound',
    category: 'Web · Product',
    year: '2025',
    summary:
      'A trading ledger for Magic: The Gathering players, keeping three lists straight: the cards you want from a partner, the cards you can offer back, and the trades already done.',
    detail:
      'Built to work on a phone at the card table and on a desktop the night before a trade, so a deal can be rebuilt from the ledger instead of from scattered chat messages.',
    stack: ['React', 'JavaScript', 'CSS'],
    links: [
      { label: 'Live site', href: '#' },
      { label: 'Code', href: '#' },
    ],
    art: 'cards',
    caseStudy: {
      lede:
        'Three lists, one table, and a trade that has to be written down before someone changes their mind.',
      meta: [
        { label: 'Role', value: 'Design + build' },
        { label: 'Timeline', value: '2025' },
        { label: 'Status', value: 'In use' },
      ],
      blocks: [
        {
          label: 'The problem',
          body:
            'Trades lived in chat messages and memory. By the time a deal was done, nobody could say which cards were promised, which were offered, or what had already changed hands.',
        },
        {
          label: 'The build',
          body:
            'A React app with one screen for the three states a trade moves through: wanted, offered, completed. Entry is fast because it happens in person, and the ledger is readable on a phone lying flat on a playmat.',
        },
        {
          label: 'The decision',
          body:
            'No prices, no market data, no “fairness” score. The app records what two people agreed to. Adding a price feed would have turned a ledger into an argument.',
        },
        {
          label: 'What it misses',
          body:
            'No import from a collection scanner, and no offline mode — both matter at a table with bad signal. The next version starts there.',
        },
      ],
    },
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
    links: [{ label: 'Code', href: '#' }],
    art: 'roster',
    caseStudy: {
      lede:
        'The old system was not missing features. It was missing a single source of truth, and every added column made that worse.',
      meta: [
        { label: 'Role', value: 'Design + build' },
        { label: 'Timeline', value: '2025' },
        { label: 'Status', value: 'In use' },
      ],
      blocks: [
        {
          label: 'The problem',
          body:
            'Three officers edited one spreadsheet. Duplicate members, two versions of the same payment, and a notes column only one person understood. Nobody was careless; the system made carelessness easy.',
        },
        {
          label: 'The build',
          body:
            'A Flutter app backed by Firebase, built around the three things the org actually needs to know: who is a member, what they owe, and who showed up. Roles, dues, and attendance are first-class instead of columns.',
        },
        {
          label: 'The decision',
          body:
            'Attendance takes one tap because it happens every meeting. Adding a member takes a full form because it happens once a semester. The boring path is the fast path on purpose.',
        },
        {
          label: 'What it misses',
          body:
            'It still expects members to open the app. Late payments and transfers are handled, but notifications are not — and a membership app that waits to be opened is still a spreadsheet with better typography.',
        },
      ],
    },
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
    caseStudy: {
      lede:
        'A small game about a commute: the same route, different passengers, and a story that only shows up if you keep riding.',
      meta: [
        { label: 'Role', value: 'Narrative + build' },
        { label: 'Timeline', value: '2025' },
        { label: 'Status', value: 'In progress' },
      ],
      blocks: [
        {
          label: 'The problem',
          body:
            'The jeepney is a setting everyone in the Philippines recognises and very few games use. The challenge was making a loop small enough to finish and specific enough to feel like the real thing.',
        },
        {
          label: 'The build',
          body:
            'Godot for the game, Aseprite for the art. I wrote the dialogue system and the narrative structure first, then built the route around the conversations instead of the other way around.',
        },
        {
          label: 'The decision',
          body:
            'One route, repeated, with passengers who change. The loop only works if the second ride is different from the first, so the writing carries more weight than the systems.',
        },
        {
          label: 'What it misses',
          body:
            'Content. The mechanics are ready for more routes than are written. The next milestone is a second route and a passenger whose story only lands on the third encounter.',
        },
      ],
    },
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
