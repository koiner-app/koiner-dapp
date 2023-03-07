import { Block, BlockHeader } from '@koiner/sdk';
import { Provider } from 'koilib';

export async function getBlock(height: number): Promise<Block | undefined> {
  const provider = new Provider(['https://api.koinos.io']);
  // const provider = new Provider(['https://jsonrpc.koiner.app']);

  try {
    const block = await provider.getBlock(height);

    console.log({ block, receipt: block.block_receipt });

    return {
      id: block.block_id,
      height: block.block_height,
      header: {
        height: block.block_height,
        previous: block.block.header?.previous,
        previousStateMerkleRoot: block.block.header?.previous_state_merkle_root,
        signer: block.block.header?.signer,
        timestamp: Number(block.block.header?.timestamp),
        transactionMerkleRoot: block.block.header?.transaction_merkle_root,
      } as BlockHeader,
      receipt: {
        computeBandwidthUsed: block.block_receipt?.compute_bandwidth_used,
        diskStorageUsed: block.block_receipt?.disk_storage_used,
        eventCount: block.block_receipt?.event_count,
        networkBandwidthUsed: block.block_receipt?.network_bandwidth_used,
      },
      signature: block.block.signature,
      transactionCount: block.block.transactions?.length,
    } as Block;
  } catch {
    return;
  }
}
