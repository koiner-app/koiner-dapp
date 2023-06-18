import { Project } from '@koiner/ecosystem';

export const myKoinosWallet: Project = {
  name: 'My Koinos Wallet',
  types: ['Wallet'],
  caption: 'Wallet',
  image: '/projects/wallets/my-koinos-wallet.png',
  icon: 'fa-solid fa-wallet',
  description: 'My Koinos Wallet is a web-based wallet for Koinos Blockchain.',
  links: [
    {
      url: 'https://my-koinos-wallet.vercel.app/',
      icon: 'fa-brands fa-chrome',
    },
    {
      url: 'https://github.com/roaminro/my-koinos-wallet',
      icon: 'fa-brands fa-github',
    },
  ],
  maintainers: [],
  tags: ['Wallet'],
};
