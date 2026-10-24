// ---------------------------------------------------------------------------
// Skills and certifications.
//
// TODO: the certificate titles, years, and issuers below are placeholders based
// on the names that were listed in the About section. Confirm each one, delete
// any you did not finish, and paste the credential URL into `href` (leave '#'
// and the card will render without a link).
// ---------------------------------------------------------------------------

export const skillGroups = [
  {
    id: 'languages',
    label: 'Languages',
    note: 'Comfortable in, not just exposed to',
    items: ['JavaScript', 'Python', 'Java', 'Dart', 'SQL', 'HTML / CSS'],
  },
  {
    id: 'build',
    label: 'Build',
    note: 'Web, mobile, and the space between',
    items: ['React', 'Flutter', 'Firebase', 'Node.js', 'Figma', 'Responsive UI'],
  },
  {
    id: 'systems',
    label: 'Systems & data',
    note: 'Where the result has to hold',
    items: ['OCR pipelines', 'REST APIs', 'SQLite', 'Git / GitHub', 'Testing', 'Linux basics'],
  },
  {
    id: 'practice',
    label: 'Practice',
    note: 'How the work gets made',
    items: [
      'Prompt engineering',
      'LLM evaluation',
      'Technical writing',
      'Prototyping',
      'Accessibility basics',
      'Agile basics',
    ],
  },
]

export const learning = {
  title: 'Game development',
  // TODO: adjust the engine / project names if they change.
  detail:
    'Godot 4 and GDScript. I am starting with the small systems — dialogue, inventory, and a loop worth repeating — before worrying about scope. Jeep Box Hero is where it is going.',
  since: 'Since 2025',
}

export const certifications = [
  {
    id: 'fcc-responsive',
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    year: '2024',
    note: 'HTML, CSS, flexbox, grid, and accessibility fundamentals.',
    href: '#',
  },
  {
    id: 'cisco-cyber',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    year: '2024',
    note: 'Threat landscape, security principles, and basic defence.',
    href: '#',
  },
  {
    id: 'aws-cloud',
    title: 'AWS Academy Cloud Foundations',
    issuer: 'AWS Academy',
    year: '2025',
    note: 'Cloud concepts, core services, pricing, and shared responsibility.',
    href: '#',
  },
  {
    id: 'comptia-itf',
    title: 'IT Fundamentals (ITF+)',
    issuer: 'CompTIA',
    year: '2025',
    note: 'Hardware, networking, security, and software basics.',
    href: '#',
  },
]
