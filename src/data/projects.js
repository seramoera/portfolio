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
      'It reads the receipt image and compares its structure with the format GCash produces. Small inconsistencies left by editing software get flagged.',
    stack: ['Flutter', 'Python', 'OCR'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/shokomori/vivy-fraud-detection',
      },
    ],
    art: 'receipt',
    caseStudy: {
      lede:
        'A screenshot can show a payment without proving it happened. ViVy is built for the moment a seller is holding a bag while a stranger holds up a phone.',
      meta: [
        { label: 'Role', value: 'Frontend Developer' },
        { label: 'Timeline', value: '2025' },
        { label: 'Status', value: 'Prototype' },
      ],
      blocks: [
        {
          label: 'The problem',
          body:
            'Sellers hand over goods against a screenshot. Editing one takes about a minute. Retype the amount, nudge a reference number, leave the rest alone. The seller has no way to inspect the file, and the transaction is already moving.',
        },
        {
          label: 'How it works',
          body:
            'The image goes through OCR, then a structural check against the field order and formatting GCash produces. Spacing, reference length, font consistency, and compression artifacts all count. The app returns a confidence score, and the interface leaves the decision to the seller.',
        },
        {
          label: 'What it catches',
          body:
            'Cropped receipts, reused screenshots, retyped fields, amounts that do not match the claimed payment. Obvious edits fail early. The careful ones survive longer, so the structural checks carry most of the weight.',
        },
        {
          label: 'What it misses',
          body:
            'A genuine receipt from another transaction. A screen recording of a real payment. Someone patient enough to rebuild the whole image. These get through, and the interface says as much.',
        },
        {
          label: 'Next',
          body:
            'Explain every flag and give the seller a reference number they can look up themselves. A verification tool that asks to be trusted without showing its evidence leaves the seller where they started.',
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
      'A trading ledger for Magic: The Gathering players, built around the three lists every trade produces. Cards you want, cards you can offer, and the trades already done.',
    detail:
      'It works on a phone at the card table and on a desktop the night before, so a deal can be rebuilt from the ledger alone.',
    stack: ['React', 'JavaScript', 'CSS'],
    links: [
      {
        label: 'Live site',
        href: 'https://seramoera.github.io/cardbound-trading-ledger/',
      },
      {
        label: 'Code',
        href: 'https://github.com/seramoera/cardbound-trading-ledger',
      },
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
            'A React app that keeps the three states of a trade on one screen. Wanted, offered, completed. Entry is fast because it happens in person, and the ledger stays readable on a phone lying flat on a playmat.',
        },
        {
          label: 'The decision',
          body:
            'The trade is the record. A card can be wanted in one deal, offered in another, and already gone in a third. Grouping by trade keeps it from looking available twice and lets either person rebuild the table later.',
        },
        {
          label: 'What it misses',
          body:
            'There is no import from a collection scanner yet, and no offline mode. Both matter at a table with bad signal, so the next version starts there.',
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
      'A membership app for student organisations. Students create a profile once, then browse the org list, check fees and status, and register for the ones that are open.',
    detail:
      'Flutter for the app, Firebase for auth and data. The org list, search, saved organisations, and announcements sit in one place, so nobody has to chase a group chat to find the next step.',
    stack: ['Flutter', 'Dart', 'Firebase'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/seramoera/glide_regis_app',
      },
    ],
    art: 'roster',
    caseStudy: {
      lede:
        'At the start of the year a student has one question. Which organisation do I join, and what does it cost? The rest can wait.',
      meta: [
        { label: 'Role', value: 'Design + build' },
        { label: 'Timeline', value: '2025' },
        { label: 'Status', value: 'In use' },
      ],
      blocks: [
        {
          label: 'The problem',
          body:
            "Sign-up lived in group chats, printed forms, and a treasurer's spreadsheet. Students had to ask which step came next, and the same details were copied by hand into three places.",
        },
        {
          label: 'The build',
          body:
            'Flutter for the app, Firebase for authentication and data. Students sign up, fill in a profile once, then browse organisations by category, search, save the ones they like, and register. Every listing shows its fee and whether it is still open.',
        },
        {
          label: 'The decision',
          body:
            'Keep the join flow short. A student makes this decision once a year, so the app asks for the profile details once and then gets out of the way. Fees and status sit on the listing, where they can be read before anyone starts a form.',
        },
        {
          label: 'What it misses',
          body:
            'Payment is not part of the app; the listing only shows the fee. Posts and announcements are pull-only, with no push notifications yet.',
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
      'A narrative shop game about running a record store built around OPM. You work the counter, and every customer has a story and a record they are trying to find.',
    detail:
      'I built the visual direction and the customer-facing flow. That covers the shop, the record wall, and the moment a customer finds the right sleeve. The catalogue spans multiple OPM genres, so the clue is often in what they remember about the music.',
    stack: ['Godot', 'Procreate'],
    links: [
      {
        label: 'Code',
        href: 'https://github.com/seramoera/jeep-box-hero',
      },
    ],
    art: 'records',
    caseStudy: {
      lede:
        'A record store makes a small stage. One counter, a wall of sleeves, and a customer trying to describe a song they cannot name.',
      meta: [
        { label: 'Role', value: 'Visual Artist + build' },
        { label: 'Timeline', value: '2025' },
        { label: 'Status', value: 'Complete' },
      ],
      blocks: [
        {
          label: 'The problem',
          body:
            'A customer remembers how a record felt long before they remember its title. The game turns that gap into the puzzle. Listen to the story, read the details, then pick the record that fits.',
        },
        {
          label: 'The build',
          body:
            'Godot for the game, Procreate for the art. I built the shop interface, the record wall, the customer portraits, and the dialogue flow that turns a request into a search.',
        },
        {
          label: 'The decision',
          body:
            'The store is organised by feeling as much as genre. Customers talk about a memory, a cover, or a song they heard once, so the record wall has to be readable enough for the player to follow. Multiple OPM genres share the shelves, and the story does the filtering.',
        },
        {
          label: 'Next',
          body:
            'The game is complete. A larger catalogue and a few regulars whose stories continue across visits would be the obvious next step. For now the shop works as a small finished story.',
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
  links: [
    { label: 'GitHub', href: 'https://github.com/seramoera' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jasmine-magtanong-b4442838b',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/jasmine.magtanong.5/',
    },
  ],
  availability: 'Open to OJT · 2026',
}
