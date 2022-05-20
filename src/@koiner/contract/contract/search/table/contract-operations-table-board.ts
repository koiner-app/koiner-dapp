/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access */
import { Board } from '@appvise/component/board/lib/field/board';
import { Field } from '@appvise/component/board/lib/field/field';

export const ContractOperationsTableBoard: Board = new Board(
  [
    new Field({
      name: 'transactionId',
      label: 'Txn Hash',
      field: (row: any) => row.item.transactionId,
      align: 'left',
      sortable: true,
      sort: true,
      customized: true,
    }),
  ],
  {
    allowNoSort: true,
    allowDescSort: true,
    multiSort: true,
  }
);
