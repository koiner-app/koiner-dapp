import { ContractStandard } from '@koiner/onchain/contract-decoder/contract-standard';
import { ContractStandardType } from '@koiner/onchain/contract-decoder/contract-standard.types';
import { utils } from 'koilib';

export const ContractStandards: ContractStandard[] = [
  new ContractStandard(ContractStandardType.token, 'Token', utils.tokenAbi, [
    'name',
    'symbol',
    'decimals',
  ]),
];
