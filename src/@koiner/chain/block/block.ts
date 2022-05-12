export interface BlockHeader {
  previous: string;
  height: number;
  timestamp: number;
  previousStateMerkleRoot?: string;
  transactionMerkleRoot?: string;
  signer: string;
}

export interface Block {
  header: BlockHeader;
  signature: string;
  transactionCount: number;
}
