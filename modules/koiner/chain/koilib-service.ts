import { Block, BlockHeader, Transaction } from '@koiner/sdk';
import { Provider } from 'koilib';

export async function getBlock(height: number): Promise<Block | undefined> {
  const provider = new Provider(['https://api.koinos.io']);

  try {
    const block = await provider.getBlock(height);

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

export async function getTransaction(
  id: string
): Promise<Transaction | undefined> {
  const provider = new Provider(['https://api.koinos.io']);

  try {
    const { transactions } = await provider.getTransactionsById([id]);

    if (
      transactions.length < 1 ||
      transactions[0].containing_blocks.length < 1
    ) {
      return;
    }

    const transaction = transactions[0];
    const blockId = transactions[0].containing_blocks[0];
    const { block_items: blocks } = await provider.getBlocksById([blockId]);

    if (blocks.length < 1) {
      return;
    }

    return {
      blockHeight: Number(blocks[0].block.header?.height),
      header: {
        nonce: transaction.transaction.header?.nonce,
        operationMerkleRoot:
          transaction.transaction.header?.operation_merkle_root,
        payee: transaction.transaction.header?.payee,
        payer: transaction.transaction.header?.payer,
        rcLimit: transaction.transaction.header?.rc_limit,
      },
      operationCount: transaction.transaction.operations?.length,
      id: transaction.transaction.id,
      timestamp: Number(blocks[0].block.header?.timestamp),
    } as Transaction;
  } catch {
    return;
  }
}
