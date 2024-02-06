import { Project } from '@koiner/ecosystem';

export const liquidity: Project = {
  name: 'Liquidity',
  types: ['Other'],
  caption: 'Liquidity Provider',
  image: '/projects/other/liquidity.png',
  description:
    'LP that strategically distributes $UP tokens into Koinos Blockchain liquidity. The interconnected $UP liquidity pools serve as market makers, shaping $UP’s value through paired tokens’ activity.',
  token: {
    name: 'UP',
    contractId: '17t977jJZ7DYKPQsjqtStbpvmde1DditXW',
  },
  links: [
    {
      url: 'https://koincrew.com/liquidityup/',
      icon: 'fa-solid fa-globe',
    },
    {
      url: 'https://twitter.com/LiquidityUp',
      icon: 'fa-brands fa-twitter',
    },
  ],
  maintainers: [],
  tags: ['Other'],
};
