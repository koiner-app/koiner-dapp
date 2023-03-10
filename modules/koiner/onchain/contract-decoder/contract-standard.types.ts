import { ContractStandard } from '../index';

export enum ContractStandardType {
  token = 'token',
}

export interface ContractStandardWithValues {
  contractStandard: ContractStandard;
  contractValues: Record<string, unknown>;
}
