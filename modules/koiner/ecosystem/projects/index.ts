import { codeProjects } from '@koiner/ecosystem/projects/code';
import { contentProjects } from './content';
import { nftProjects } from './nft';
import { dappProjects } from './dapp';
import { koinosOfficial } from './koinos-official';
import { marketingProjects } from '@koiner/ecosystem/projects/marketing';
import { socialProjects } from '@koiner/ecosystem/projects/social';
import { tools } from './tools';
import { wallets } from '@koiner/ecosystem/projects/wallets';
import { documentation } from '@koiner/ecosystem/projects/documentation';

export * from './project';
export * from './tags';

export const KoinosProjects = [
  koinosOfficial,
  ...dappProjects,
  ...documentation,
  ...wallets,
  ...nftProjects,
  ...socialProjects,
  ...tools,
  ...codeProjects,
  ...contentProjects,
  ...marketingProjects,
];
