import { Project } from '@koiner/ecosystem';

export const koinosboxPolls: Project = {
  name: 'Koinosbox Polls',
  types: ['dApp'],
  caption: 'Poll dApp',
  icon: 'edit',
  description:
    'A dApp for creating on-chain polls in order to coordinate governance decisions. The dApp is free-to-use, there is no cost to create new polls or vote on them.',
  links: [
    {
      url: 'https://koinosbox.com/polls',
      icon: 'fa-solid fa-globe',
    },
    {
      url: 'https://github.com/joticajulian/gov-poll',
      icon: 'fa-brands fa-github',
    },
    {
      url: 'https://peakd.com/general/@jga/polls',
      icon: 'fa-solid fa-book',
    },
  ],
  maintainers: [],
  tags: ['dApp'],
};
