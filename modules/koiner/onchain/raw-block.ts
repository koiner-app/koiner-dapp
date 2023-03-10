import { BlockJson, TransactionReceipt } from 'koilib/lib/interface';

export interface RawBlock {
  block_id: string;
  block_height: string;
  block: BlockJson;
  receipt: {
    [x: string]: any;
    events: {
      sequence: number;
      source: string;
      name: string;
      data: string;
      impacted: string[];
    }[];
    transaction_receipts: TransactionReceipt[];
  };
}
