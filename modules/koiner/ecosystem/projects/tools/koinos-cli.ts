import { Project } from '@koiner/ecosystem';

export const koinosCli: Project = {
  name: 'Koinos CLI',
  types: ['Tools'],
  caption: 'Command-Line Interface',
  icon: 'fa-solid fa-terminal',
  description:
    'A command line utility used for key management and to interact with the Koinos blockchain.',
  links: [
    {
      url: 'https://github.com/koinos/koinos-cli',
      icon: 'fa-solid fa-terminal',
    },
    {
      url: 'https://docs.koinos.io/quickstart/cli.html',
      icon: 'fa-solid fa-book',
    },
  ],
  maintainers: [],
  tags: ['CLI'],
};
