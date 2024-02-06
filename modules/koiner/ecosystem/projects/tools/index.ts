import { koinosCli } from './koinos-cli';
import { koinForge } from './koin-forge';
import { koinosNode } from './koinos-node';
import { koinPaperWallet } from './koinos-paper-wallet';
import { koinosRest } from './koinos-rest';

export const tools = [
  koinosCli,
  koinosRest,
  koinForge,
  koinosNode,
  koinPaperWallet,
];
