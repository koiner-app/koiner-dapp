import { Project } from '@koiner/ecosystem';

export const koinDx: Project = {
  name: 'KoinDX',
  types: ['dApp', 'token'],
  token: 'KNDX',
  image: './projects/dapp/koindx.svg',
  description:
    'KoinDX is a next generation decentralized exchange that leverages the feeless systems of the koinos blockchain.',
  links: [
    {
      url: 'https://koindx.com',
      icon: 'fa-solid fa-globe',
    },
    {
      url: 'https://twitter.com/koindx',
      icon: 'fa-brands fa-twitter',
    },
    {
      url: 'https://discord.gg/Wh49QvYB3X',
      icon: 'fa-brands fa-discord',
    },
    {
      url: 'https://github.com/koindx',
      icon: 'fa-brands fa-github',
    },
  ],
  maintainers: [],
  tags: ['Dex', 'dApp'],
};
