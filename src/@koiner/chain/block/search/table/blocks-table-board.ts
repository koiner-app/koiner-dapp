/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access */
import { Board } from '@appvise/component/board/lib/field/board';
import { Field } from '@appvise/component/board/lib/field/field';

export const BlocksTableBoard: Board = new Board(
  [
    new Field({
      name: 'height',
      label: 'Block',
      field: (row: any) => row.item.header.height,
      align: 'left',
      sortable: true,
      sort: true,
      customized: true,
    }),
    new Field({
      name: 'timestamp',
      label: 'Age',
      field: (row: any) => row.item.header.timestamp,
      align: 'left',
      sortable: true,
      sort: true,
      customized: true,
    }),
    // new Field({
    //   name: 'id',
    //   label: 'Block Hash',
    //   field: (row: any) => row.item.id,
    //   align: 'left',
    //   sortable: true,
    //   sort: true,
    //   customized: true,
    // }),
    new Field({
      name: 'transactionCount',
      label: 'Txn',
      field: (row: any) => row.item.transactionCount,
      align: 'left',
      sortable: true,
      sort: true,
      customized: true,
    }),
    new Field({
      name: 'producer',
      label: 'Producer',
      field: (row: any) => row.item.reward,
      align: 'left',
      sortable: false,
      customized: true,
    }),
    // new Field({
    //   name: 'actions',
    //   label: 'Acties',
    //   field: 'actions',
    //   align: 'left',
    //   sortable: false,
    //   customized: true,
    // }),
  ],
  {
    allowNoSort: true,
    allowDescSort: true,
    multiSort: true,
  }
);
