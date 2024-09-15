import { contractsMap } from '@koiner/contracts/components/contract/contracts-map';

export const getContractName = (id: any, fallback?: string): string => {
  if (contractsMap[id]) {
    return contractsMap[id];
  }

  return fallback ?? id;
};
