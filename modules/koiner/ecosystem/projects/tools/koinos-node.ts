import { Project } from '@koiner/ecosystem';

export const koinosNode: Project = {
  name: 'Koinos Node',
  types: ['Tools'],
  caption: 'Running Koinos on Mac',
  icon: 'fa-brands fa-apple',
  description:
    'Mac app for running a full Koinos node. Requires macOS 10.11 El Capitan, Docker Desktop, and Git.',
  links: [
    {
      url: 'https://github.com/tenonedesign/Koinos-Node',
      icon: 'fa-brands fa-github',
    },
  ],
  maintainers: [],
  tags: ['Node'],
};
