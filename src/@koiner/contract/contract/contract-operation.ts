import { ContractStandardType } from '@koiner/contract/contract/contract';

export interface ContractOperation {
  contractId: string;
  transactionId: string;
  // entryPoint: string;
  // args: string;
  contractStandardType: ContractStandardType;
  // details: ContractOperationDetailsUnion
}
