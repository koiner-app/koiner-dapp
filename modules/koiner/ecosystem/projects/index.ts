import { codeProjects } from '@koiner/ecosystem/projects/code';
import { contentProjects } from './content';
import { nftProjects } from './nft';
import { dappProjects } from './dapp';
import { daos } from './dao';
import { games } from './games';
import { koinosOfficial } from './koinos-official';
import { marketingProjects } from '@koiner/ecosystem/projects/marketing';
import { socialProjects } from '@koiner/ecosystem/projects/social';
import { tools } from './tools';
import { wallets } from '@koiner/ecosystem/projects/wallets';
import { documentation } from '@koiner/ecosystem/projects/documentation';
import { communities } from '@koiner/ecosystem/projects/communities';

export * from './project';
export * from './tags';

export const KoinosProjects = [
  koinosOfficial,
  ...dappProjects,
  ...daos,
  ...games,
  ...documentation,
  ...wallets,
  ...nftProjects,
  ...socialProjects,
  ...communities,
  ...tools,
  ...codeProjects,
  ...contentProjects,
  ...marketingProjects,
];
