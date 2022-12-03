import { codeProjects } from '@koiner/ecosystem/projects/code';
import { contentProjects } from './content';
import { dappProjects } from './dapp';
import { koinosOfficial } from './koinos-official';
import { marketingProjects } from '@koiner/ecosystem/projects/marketing';
import { socialProjects } from '@koiner/ecosystem/projects/social';
import { tools } from './tools';

export * from './project';
export * from './tags';

export const KoinosProjects = [
  koinosOfficial,
  ...dappProjects,
  ...socialProjects,
  ...tools,
  ...codeProjects,
  ...contentProjects,
  ...marketingProjects,
];
