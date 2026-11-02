// ---------------------------------------------------------------------------
// Notes. Short write-ups that expand inline — no routes, no CMS.
//
// Each body is an array of paragraphs so it reads like an article. Add a note
// by copying a block and giving it a unique id.
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
      'Editing a screenshot takes about a minute. This is the checklist I turned into code, along with the part that still cannot be trusted.',
    body: [
      'A receipt is a picture of a transaction. Once a seller accepts a screenshot as proof, everything depends on how carefully that picture was made.',
      'The obvious fakes are the easiest to catch. The amount is retyped in a different weight, or the reference number has one digit too many. The harder ones keep every field intact and simply reuse a real receipt from another day, another amount, or another account.',
      'The app asks two questions. Does this image look edited, and does it belong to this transaction? The first is pattern matching. The second needs a check the seller can perform, such as a reference number they can look up or a name and timestamp that line up.',
      'The version I would ship next shows the reason behind every flag. A score with no explanation leaves the seller trusting the app as blindly as the screenshot.',
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
      'The old system had plenty of features. What it lacked was a single source of truth, and every feature added another place to look.',
    body: [
      'The spreadsheet worked for one person. With three officers editing it, it became a record of who typed last. Duplicate members, a one-time payment recorded twice, a notes column only one person understood.',
      'The first useful decision was to leave most columns alone and work out what the organisation needed. That came down to a student join flow and a small admin roster with the member count, the names, and a remove action. Everything else was either a report or a habit.',
      'The second decision was to keep the two sides separate. A student joins, pays the one-time fee, then reads announcements. An admin sees the roster. Attendance tracking, a payment ledger, and a general org CMS stayed out.',
      'Notifications are still missing, which is the part nobody wants to maintain. Announcements are pull-only right now, so a member has to open the app. That comes next.',
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
      'Cardbound started with the three lists a trade actually produces. What I want, what I can offer, and what we already agreed on. Keeping them on one screen mattered more than any single feature. Before anything else, the app has to answer "what did we say?"',
      'The type runs larger than it needs to on a desk, and the tap targets are wider. The destructive action sits away from the common one. Little of this is original, but it is easier to defend when the constraint is a real table.',
    ],
  },
]
