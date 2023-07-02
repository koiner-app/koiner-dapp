import { Project } from '@koiner/ecosystem';

export const koinPaperWallet: Project = {
  name: 'Koinos Paper Wallet',
  types: ['Tools'],
  caption: 'Address/key generator',
  icon: 'token',
  description:
    'Tool for generating Koinos cold storage addresses + private keys and to safely store your coins offline.',
  links: [
    {
      url: 'https://koinospaperwallet.com/',
      icon: 'fa-solid fa-globe',
    },
    {
      url: 'https://gitlab.com/engrave/koinos/koinos-paper-wallet',
      icon: 'fa-brands fa-github',
    },
  ],
  maintainers: [],
  tags: ['Generator'],
};
