export interface Contract {
  id: string;
  contractStandardType?: ContractStandardType;
}

export enum ContractStandardType {
  token = 'token',
}
