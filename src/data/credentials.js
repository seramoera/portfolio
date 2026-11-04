// ---------------------------------------------------------------------------
// Skills and certifications.
//
// Certification records are listed newest first. `issued` is shown next to the
// issuer; Credly badges link to their public badge page, and freeCodeCamp
// certifications link to their public certificate. A `href` of '#' renders the
// record without a verify link (used for the Cisco and freeCodeCamp entries
// that have no public badge).
// ---------------------------------------------------------------------------

export const skillGroups = [
  {
    id: 'languages',
    label: 'Languages',
    note: 'Used on real projects',
    items: [
      'JavaScript',
      'Python',
      'Java',
      'C++',
      'C#',
      'Dart',
      'SQL',
      'R',
      'HTML / CSS',
    ],
  },
  {
    id: 'build',
    label: 'Build',
    note: 'Web, mobile, and the space between',
    items: ['React', 'Flutter', 'Firebase', 'Node.js', 'Shiny', 'Figma', 'Supabase'],
  },
  {
    id: 'systems',
    label: 'Systems & data',
    note: 'Where the result has to hold',
    items: [
      'OCR pipelines',
      'REST APIs',
      'SQLite',
      'Git / GitHub',
      'API testing (Postman)',
      'Linux basics',
    ],
  },
  {
    id: 'practice',
    label: 'Practice',
    note: 'How the work gets made',
    items: [
      'Requirements gathering',
      'Code review',
      'Technical writing',
      'Prototyping',
      'Accessible design',
      'Agile delivery',
    ],
  },
]

export const learning = {
  title: 'Game development',
  detail:
    'Unity with C++ and C#. I am learning the engine and scripting workflow for future game projects, starting with gameplay systems and small, finished loops.',
  since: 'Since 2025',
}

export const certifications = [
  {
    id: 'fcc-js-algorithms',
    title: 'Legacy JavaScript Algorithms and Data Structures V7',
    issuer: 'freeCodeCamp',
    issued: 'Nov 2026',
    credentialId: 'amoera-ljaads',
    note: 'Algorithms, data structures, and problem solving in JavaScript.',
    href: 'https://www.freecodecamp.org/certification/amoera/javascript-algorithms-and-data-structures',
  },
  {
    id: 'tjakoen-fullstack-js-ai',
    title: 'Builds Full-Stack JavaScript and AI',
    issuer: 'Tjakoen Stolk',
    issued: 'Nov 2026',
    credentialId: 'hau-7bcda2e924c760b78a1adf29',
    note: 'AI use documented in a Node, Express, and Postgres build, including the corrections it needed.',
    href: 'https://tjakoen.github.io/b/7bcda2e924c760b7',
  },
  {
    id: 'tjakoen-fullstack-web',
    title: 'Full Stack Web Development',
    issuer: 'Tjakoen Stolk',
    issued: 'Sep 2026',
    credentialId: 'hau-apsi-2209-midterm-cf726119',
    note: 'A relational REST API and the React client that consumes it.',
    href: 'https://tjakoen.github.io/b/cf726119',
  },
  {
    id: 'tjakoen-frontend-cloud',
    title: 'Frontend Design with Cloud',
    issuer: 'Tjakoen Stolk',
    issued: 'Sep 2026',
    credentialId: 'hau-apsi-2209-prelim-fb082f71',
    note: 'A proctored React practical covering components, state, theming, and responsive layout.',
    href: 'https://tjakoen.github.io/b/fb082f71',
  },
  {
    id: 'cisco-cyber-threat',
    title: 'Cyber Threat Management',
    issuer: 'Cisco',
    issued: 'Aug 2026',
    credentialId: 'e373b776-a3f7-486e-a72d-78257f2303ba',
    note: 'Threat detection, incident response, and security operations.',
    href: 'https://www.credly.com/badges/e373b776-a3f7-486e-a72d-78257f2303ba',
  },
  {
    id: 'cisco-data-science',
    title: 'Introduction to Data Science',
    issuer: 'Cisco',
    issued: 'Aug 2026',
    credentialId: '719833a0-d0bc-42e2-bd9b-5b123f7f7f9d',
    note: 'Data workflows, statistics, and introductory modeling.',
    href: 'https://www.credly.com/badges/719833a0-d0bc-42e2-bd9b-5b123f7f7f9d',
  },
  {
    id: 'aws-cloud-foundations',
    title: 'AWS Academy Graduate — Cloud Foundations',
    issuer: 'Amazon Web Services Training and Certification',
    issued: 'Mar 2026',
    credentialId: '2c2ec861-4e29-43d3-a65f-cdd7f4461635',
    note: 'Cloud concepts, core services, pricing, and shared responsibility.',
    href: 'https://www.credly.com/badges/2c2ec861-4e29-43d3-a65f-cdd7f4461635',
  },
  {
    id: 'cisco-ai-fundamentals',
    title: 'AI Fundamentals with IBM SkillsBuild',
    issuer: 'Cisco',
    issued: 'Mar 2026',
    credentialId: 'ef884a59-1acc-473e-b64d-bc2269ccce19',
    note: 'AI concepts, responsible use, and practical model workflows.',
    href: 'https://www.credly.com/badges/ef884a59-1acc-473e-b64d-bc2269ccce19',
  },
  {
    id: 'cisco-data-analytics',
    title: 'Data Analytics Essentials',
    issuer: 'Cisco Networking Academy',
    issued: 'Mar 2026',
    credentialId: '93842712-a829-471c-966a-e7b89042843c',
    note: 'Data preparation, analysis, and visualization foundations.',
    href: 'https://www.credly.com/badges/93842712-a829-471c-966a-e7b89042843c',
  },
  {
    id: 'cisco-endpoint-security',
    title: 'Endpoint Security',
    issuer: 'Cisco',
    issued: 'Aug 2025',
    credentialId: 'aa293fa2-8fba-4de1-a744-14ae80d1d797',
    note: 'Device hardening, malware defense, and endpoint protection.',
    href: 'https://www.credly.com/badges/aa293fa2-8fba-4de1-a744-14ae80d1d797',
  },
  {
    id: 'cisco-ccna-itn',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco',
    issued: '2025',
    note: 'Network fundamentals, addressing, and switching.',
    href: '#',
  },
  {
    id: 'fcc-relational-db',
    title: 'Relational Database V8',
    issuer: 'freeCodeCamp',
    issued: 'Feb 2025',
    note: 'SQL, relational modeling, and database design.',
    href: 'https://www.freecodecamp.org/certification/amoera/relational-database-v8',
  },
  {
    id: 'cisco-js-essentials',
    title: 'JavaScript Essentials 1',
    issuer: 'Cisco',
    issued: 'Oct 2024',
    credentialId: 'eb0fc967-5aec-4b2b-994e-1af2d42c4a53',
    note: 'JavaScript syntax, DOM interaction, and program logic.',
    href: 'https://www.credly.com/badges/eb0fc967-5aec-4b2b-994e-1af2d42c4a53',
  },
  {
    id: 'fcc-responsive',
    title: 'Legacy Responsive Web Design V8',
    issuer: 'freeCodeCamp',
    issued: 'Sep 2024',
    note: 'HTML, CSS, flexbox, grid, and accessibility fundamentals.',
    href: 'https://www.freecodecamp.org/certification/amoera/responsive-web-design',
  },
  {
    id: 'comptia-itf',
    title: 'CompTIA IT Fundamentals+ (ITF+) Certification',
    issuer: 'CompTIA',
    issued: 'Nov 2023',
    credentialId: '02fb8031-9ef0-4840-bf0e-232b88ce383b',
    note: 'Hardware, networking, security, and software basics.',
    href: 'https://www.credly.com/badges/02fb8031-9ef0-4840-bf0e-232b88ce383b',
  },
]
