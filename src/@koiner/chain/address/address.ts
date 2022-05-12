export interface AddressStats {
  transactionCount: number;
  operationCount: number;
  contractCount: number;
}
export interface Address {
  id: string;
  stats: AddressStats;
}
