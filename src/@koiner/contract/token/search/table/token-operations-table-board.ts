/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access */
import { Board } from '@appvise/component/board/lib/field/board';
import { Field } from '@appvise/component/board/lib/field/field';

export const TokenOperationsTableBoard: Board = new Board(
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
    new Field({
      name: 'from',
      label: 'From',
      field: (row: any) => row.item.from,
      align: 'left',
      sortable: false,
      sort: false,
      customized: true,
    }),
    new Field({
      name: 'to',
      label: 'To',
      field: (row: any) => row.item.to,
      align: 'left',
      sortable: false,
      sort: false,
      customized: true,
    }),
    new Field({
      name: 'value',
      label: 'Value',
      field: (row: any) => row.item.value,
      align: 'left',
      sortable: false,
      sort: false,
    }),
    new Field({
      name: 'name',
      label: 'Operation',
      field: (row: any) => row.item.name,
      align: 'left',
      sortable: false,
      sort: false,
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
