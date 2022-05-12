export interface TransactionHeader {
  rcLimit: string;
  nonce?: string;
  operationMerkleRoot?: string;
  signer: string;
}

export interface Transaction {
  blockHeight: number;
  header: TransactionHeader;
  // operations: Operation[]; // header + operations
  signature: string;
  operationCount: number;
  transactionIndex: number;
}
