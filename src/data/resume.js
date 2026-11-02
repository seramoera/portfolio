// ---------------------------------------------------------------------------
// Résumé + OJT brief.
//
// The downloadable PDF is the supplied one-page CV. If it is replaced again,
// keep the filename and update `updated` plus the preview in Resume.jsx.
// TODO: confirm the OJT hours and the availability window with the OJT office.
// ---------------------------------------------------------------------------

export const resume = {
  href: `${import.meta.env.BASE_URL}Jasmine-Magtanong-Resume.pdf`,
  updated: 'October 2026',
  pages: '1 page',
  summary:
    'A CS undergraduate who builds web and mobile software and wants to find out whether it holds up in a real team. I am looking for a required OJT placement where I can learn from people who have shipped more than I have.',
  seeking: [
    {
      label: 'Role',
      value: 'Frontend, mobile, QA, or backend OJT',
    },
    {
      label: 'Arrangement',
      value: 'Required OJT · school credit',
    },
    {
      label: 'Window',
      value: 'Flexible · 2026–2027',
    },
    {
      label: 'Location',
      value: 'Pampanga or Metro Manila · open to remote',
    },
  ],
  glance: [
    {
      label: 'Education',
      value: 'BS Computer Science, Holy Angel University, 2023 — present',
    },
    {
      label: 'Standing',
      value: "Dean's List",
    },
    {
      label: 'Currently learning',
      value: 'Game development — Unity with C++ and C#',
    },
  ],
}
