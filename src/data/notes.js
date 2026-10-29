// ---------------------------------------------------------------------------
// Notes. Short write-ups that expand inline — no routes, no CMS.
//
// TODO: replace the bodies with the real notes when they are written. Each one
// is structured as an array of paragraphs so it reads like an article, but it
// can be any length.
// ---------------------------------------------------------------------------

export const notes = [
  {
    id: 'fake-receipt',
    num: 'N.01',
    title: 'What a fake GCash receipt actually looks like',
    tag: 'Verification',
    date: 'Aug 2026',
    read: '4 min',
    excerpt:
      'Editing a screenshot takes about a minute. Here is the checklist I turned into code, and the part of it that still cannot be trusted.',
    body: [
      'A receipt is a picture of a transaction, not the transaction. Once a seller accepts a screenshot as proof, the only thing standing between them and a loss is how carefully that picture was made.',
      'The obvious fakes are the easiest to catch. The amount is retyped in a different weight, or the reference number has one digit too many. The harder ones keep every field intact and simply reuse a real receipt from another day, another amount, or another account.',
      'That is why the app separates two questions: does this image look edited, and does this image belong to this transaction? The first one is pattern matching. The second one needs a check the seller can perform — a reference number they can look up, a name that matches, a timestamp that makes sense.',
      'The version I would ship next shows the reason behind every flag. A score without a reason just moves the trust from the screenshot to the app.',
    ],
  },
  {
    id: 'spreadsheet',
    num: 'N.02',
    title: 'Rebuilding a spreadsheet three people were editing badly',
    tag: 'Product',
    date: 'Jun 2026',
    read: '4 min',
    excerpt:
      'The old system was not missing features. It was missing a single source of truth, and every feature added another place to look.',
    body: [
      'The spreadsheet worked for one person. With three officers editing it, it became a record of who typed last: duplicate members, a one-time payment recorded twice, and a notes column that only one person understood.',
      'The first useful decision was not to rebuild every column. It was to decide what the organisation actually needed: a student-facing join flow and a small admin roster with the member count, the names, and a remove action. Everything else was either a report or a habit.',
      'The second decision was to keep the two sides separate. A student sees one decision — join, pay the one-time fee, then read announcements. An admin sees the roster. No attendance tracking, no payment ledger, no general org CMS.',
      'What it still misses is the part nobody wants to maintain: notifications. Announcements are pull-only right now, so a member still has to open the app. That is the next feature, not a reason to add another spreadsheet.',
    ],
  },
  {
    id: 'card-table',
    num: 'N.03',
    title: 'Designing for a phone at a card table',
    tag: 'Interface',
    date: 'Mar 2026',
    read: '3 min',
    excerpt:
      'Bad light, one free hand, and a trade that has to be written down before someone changes their mind. The constraints made the interface.',
    body: [
      'A card table is not a desk. The phone is flat on a playmat, the light is coming from the wrong side, and the person across from you is already shuffling. Any interaction that needs two hands or careful reading is a failed interaction.',
      'Cardbound started with the three lists a trade actually produces: what I want, what I can offer, and what we already agreed on. Keeping them on one screen was worth more than any single feature, because the app has to answer "what did we say?" before it answers anything else.',
      'The type is larger than it needs to be on a desk, the tap targets are wider, and the destructive action is never adjacent to the common one. None of that is original. It is just easier to defend when the constraint is a real table instead of a mockup.',
    ],
  },
]
