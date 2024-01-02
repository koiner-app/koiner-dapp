import { Project } from '@koiner/ecosystem';

export const koinCrew: Project = {
  name: 'KoinCrew',
  types: ['Content', 'DAO', 'Marketing'],
  caption: 'Content',
  image: '/projects/dao/koincrew.png',
  description:
    'A decentralized collective of individuals united by a common purpose: to spread the knowledge and innovation that Koinos brings',
  token: {
    name: 'KCT',
    contractId: '1BTQCpospHJRA7VAtZ4wvitdcqYCvkwBCD',
  },
  links: [{ url: 'https://koincrew.com/', icon: 'fa-solid fa-globe' }],
  maintainers: [],
  tags: ['DAO', 'Marketing'],
};
