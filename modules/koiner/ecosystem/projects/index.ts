import { contentProjects } from './content';
import { dappProjects } from './dapp';
import { tools } from './tools';
import { codeProjects } from '@koiner/ecosystem/projects/code';

export * from './project';
export * from './tags';

export const KoinosProjects = [
  ...dappProjects,
  ...tools,
  ...contentProjects,
  ...codeProjects,
];
