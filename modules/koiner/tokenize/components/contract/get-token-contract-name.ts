import { tokenContractsMap } from './token-contracts-map';

export const getTokenContractName = (id: any, fallback: string): string => {
  if (tokenContractsMap[id]) {
    return tokenContractsMap[id];
  }

  return fallback;
};
