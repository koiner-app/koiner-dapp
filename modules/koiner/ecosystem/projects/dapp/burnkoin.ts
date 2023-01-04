import { Project } from '@koiner/ecosystem';

export const burnKoin: Project = {
  name: 'Burn KOIN',
  types: ['dApp', 'token'],
  caption: 'Burnpool',
  image: '/projects/dapp/burnkoin.svg',
  token: {
    name: 'pVHP',
    contractId: '1NHReq2apWsQ6UPBjNqcV3ABsj88Ncimiy',
  },
  description:
    'Burn Koin is the first burn pool developed for Koinos. "Burn pool" is just the name we use for mining pools on Koinos Proof of Burn.',
  links: [
    {
      url: 'https://burnkoin.com',
      icon: 'fa-solid fa-globe',
    },
    {
      url: 'https://github.com/lukemwillis/koinos-burn-pool',
      icon: 'fa-brands fa-github',
    },
  ],
  maintainers: [],
  tags: ['Burnpool', 'dApp'],
};
