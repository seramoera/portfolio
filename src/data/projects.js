// ---------------------------------------------------------------------------
// Project data. Everything on the site comes from this file.
//
// To edit: change the text below. To add a project: copy a block, give it a
// unique `id`, then bump `num` values so they still read in order.
//
// `art` picks the placeholder illustration in src/components/ProjectArt.jsx.
// Options: 'receipt' | 'cards' | 'roster' | 'records' | 'road'
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
        { label: 'Role', value: 'Frontend Developer' },
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
            'Make the trade the record, not the card. A card can be wanted in one deal, offered in another, and already gone in a third; grouping by trade keeps the same card from looking available twice and lets either person rebuild the table later.',
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
      'A join-first membership app for students: find an organisation, request to join, pay the one-time fee, and see its announcements once you are in.',
    detail:
      'Students join once and get the group page; admins get a separate login with the member count, the roster, and a remove action. No attendance tracking, no payment ledger beyond the one-time fee.',
    stack: ['Flutter', 'Dart', 'Firebase'],
    links: [{ label: 'Code', href: '#' }],
    art: 'roster',
    caseStudy: {
      lede:
        'The first question a student asks is not what the admin needs. It is how to join, what the fee is, and where the announcements will be.',
      meta: [
        { label: 'Role', value: 'Design + build' },
        { label: 'Timeline', value: '2025' },
        { label: 'Status', value: 'In use' },
      ],
      blocks: [
        {
          label: 'The problem',
          body:
            'Sign-up lived in group chats, printed forms, and a treasurer’s spreadsheet. Students had to ask which step came next, and admins had to reconcile names and one-time payments by hand.',
        },
        {
          label: 'The build',
          body:
            'A Flutter app backed by Firebase. The student side is a short join flow: choose an org, confirm the one-time fee, and land on the group page for announcements. The admin side is a separate login with a live member count, the member list, and a remove action.',
        },
        {
          label: 'The decision',
          body:
            'The join flow is deliberately short because a student makes the decision once. The admin roster is deliberately narrow: see the count, see who is in, remove a member. It is not an attendance tool, a payment ledger, or a general org CMS.',
        },
        {
          label: 'What it misses',
          body:
            'Announcements are pull-only right now; there are no push notifications yet. Bulk imports and payment reconciliation are out of scope, because the app is for students joining and for the admin roster, not for running every part of the organisation.',
        },
      ],
    },
  },
  {
    id: 'jeep-box-hero',
    num: '04',
    title: 'Jeep Box Hero',
    category: 'Game · Music',
    year: '2025',
    summary:
      'A narrative shop game about running a record store built around OPM. You are the person behind the counter; every customer has a story and a record they are trying to find.',
    detail:
      'Built the visual direction and the customer-facing flow: the shop, the record wall, and the moment a customer finds the right sleeve. The catalogue spans multiple OPM genres, so the clue is often in what they remember about the music.',
    stack: ['Godot', 'Aseprite'],
    links: [{ label: 'Playable build', href: '#' }],
    art: 'records',
    caseStudy: {
      lede:
        'A record store is a small stage: one counter, a wall of sleeves, and a customer trying to describe a song they cannot name.',
      meta: [
        { label: 'Role', value: 'Visual Artist + build' },
        { label: 'Timeline', value: '2025' },
        { label: 'Status', value: 'Complete' },
      ],
      blocks: [
        {
          label: 'The problem',
          body:
            'A customer knows the feeling of a record, not always the title. The game has to make that gap playable: listen to the story, read the details, and choose the record that fits.',
        },
        {
          label: 'The build',
          body:
            'Godot for the game, Aseprite for the art. I built the shop interface, the record wall, the customer portraits, and the dialogue flow that turns a request into a search.',
        },
        {
          label: 'The decision',
          body:
            'The store is organised by feeling as much as genre. Customers talk about a memory, a cover, or a song they heard once, and the record wall has to be readable enough for the player to make the connection. Multiple OPM genres share the shelves; the story is the filter.',
        },
        {
          label: 'Next',
          body:
            'The game is complete. The obvious next step is a larger catalogue and a few regulars whose stories continue across visits — but the shop already works as a finished small story.',
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
  availability: 'Open to OJT · 2026',
}
