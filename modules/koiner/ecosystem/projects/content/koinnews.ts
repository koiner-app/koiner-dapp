import { Project } from '@koiner/ecosystem';

export const koinosNews: Project = {
  name: 'Koinos News',
  types: ['Content'],
  caption: 'News',
  image: '/projects/content/koinos-news.png',
  description:
    'Koinos News: Updates, news, and announcements on projects building on the Koinos free-to-use smart contract platform.',
  links: [
    { url: 'https://koinosnews.com/', icon: 'fa-solid fa-globe' },
    {
      url: 'https://x.com/koinosnews',
      icon: 'fa-brands fa-twitter',
    },
    {
      url: 'https://t.me/koinosnewssite',
      icon: 'fa-brands fa-telegram',
    },
  ],
  maintainers: [],
  tags: ['News'],
};
