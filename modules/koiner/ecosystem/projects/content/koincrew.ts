import { Project } from '@koiner/ecosystem';

export const koinCrew: Project = {
  name: 'Koin Crew',
  types: ['Content'],
  caption: 'Content',
  icon: 'fa-solid fa-book',
  description: 'Articles and guides about Koinos and the Koinos ecosystem.',
  token: {
    name: 'KCT',
    contractId: '1BTQCpospHJRA7VAtZ4wvitdcqYCvkwBCD',
  },
  links: [{ url: 'https://koincrew.com/', icon: 'fa-solid fa-globe' }],
  maintainers: [],
  tags: ['Articles', 'Guides'],
};
