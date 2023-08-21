import { Project } from '@koiner/ecosystem';

export const kanvas: Project = {
  name: 'Kanvas',
  types: ['Game', 'dApp'],
  caption: 'Collaborative canvas',
  image: '/projects/game/kanvas.png',
  description:
    'The first collaborative and decentralized canvas, based on the first fee-less smart-contract blockchain.',
  token: {
    name: 'KAN',
    contractId: '1LeWGhDVD8g5rGCL4aDegEf9fKyTL1KhsS',
  },
  links: [
    {
      url: 'https://kanvas-app.com/',
      icon: 'fa-solid fa-globe',
    },
    {
      url: 'https://t.me/KanvasOfficial',
      icon: 'fa-brands fa-telegram',
    },
    {
      url: 'https://x.com/KanvasOfficial',
      icon: 'fa-brands fa-twitter',
    },
    {
      url: 'https://github.com/EtheredRaven/kanvas',
      icon: 'fa-brands fa-github',
    },
  ],
  maintainers: [],
  tags: ['Game'],
};
