import { Project } from '@koiner/ecosystem';

export const kondor: Project = {
  name: 'Kondor Wallet',
  types: ['Wallet'],
  caption: 'Browser Wallet',
  image: '/projects/wallets/kondor.jpg',
  description:
    'Kondor is a browser extension to manage a wallet for Koinos Blockchain.',
  links: [
    {
      url: 'https://chrome.google.com/webstore/detail/kondor/ghipkefkpgkladckmlmdnadmcchefhjl',
      icon: 'fa-brands fa-chrome',
    },
    {
      url: 'https://github.com/joticajulian/kondor',
      icon: 'fa-brands fa-github',
    },
  ],
  maintainers: [],
  tags: ['Wallet'],
};
