import { contractsMap } from '@koiner/contracts/components/contract/contracts-map';

export const getContractName = (value: any): string => {
  if (contractsMap[value]) {
    return contractsMap[value];
  }

  return value;
};
