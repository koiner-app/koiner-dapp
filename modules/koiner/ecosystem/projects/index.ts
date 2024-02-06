import { codeProjects } from './code';
import { contentProjects } from './content';
import { nftProjects } from './nft';
import { dappProjects } from './dapp';
import { daos } from './dao';
import { games } from './games';
import { koinosOfficial } from './koinos-official';
import { marketingProjects } from './marketing';
import { socialProjects } from './social';
import { tools } from './tools';
import { wallets } from './wallets';
import { documentation } from './documentation';
import { communities } from './communities';
import { otherProjects } from './other';

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
  ...otherProjects,
];
