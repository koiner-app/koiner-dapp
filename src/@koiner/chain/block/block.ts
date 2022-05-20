export interface BlockHeader {
  previous: string;
  height: number;
  timestamp: number;
  previousStateMerkleRoot?: string;
  transactionMerkleRoot?: string;
  signer: string;
}

export interface BlockReceipt {
  diskStorageUsed: number;
  networkBandwidthUsed: number;
  computeBandwidthUsed: number;
  eventCount: number;
}

export interface BlockReward {
  producerId: string;
  value: number;
  contractId: string;
}
export interface Block {
  header: BlockHeader;
  receipt: BlockReceipt;
  signature: string;
  transactionCount: number;
  reward?: BlockReward;
}
