import { Project } from '@koiner/ecosystem';

export const koinClaimApp: Project = {
  name: 'KOIN Claim App',
  types: ['dApp', 'token'],
  caption: 'Claim KOIN tokens',
  image: './projects/koinos-light.svg',
  description:
    'In five simple steps you will be able to connect your ERC20 wallet containing KOIN and claim your native KOIN tokens on the Koinos blockchain.',
  links: [
    {
      url: 'https://claim.koinos.io',
      icon: 'fa-solid fa-globe',
    },
    {
      url: 'https://github.com/joticajulian/koinos-claim',
      icon: 'fa-brands fa-github',
    },
  ],
  maintainers: [],
  tags: ['dApp'],
};
