/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access */
import { Board } from '@appvise/component/board/lib/field/board';
import { Field } from '@appvise/component/board/lib/field/field';

export const TokenContractsTableBoard: Board = new Board(
  [
    new Field({
      name: 'id',
      label: 'Address',
      field: (row: any) => row.item.id,
      align: 'left',
      sortable: false,
      customized: true,
    }),
    new Field({
      name: 'name',
      label: 'Name',
      field: (row: any) => row.item.name,
      align: 'left',
      sortable: true,
    }),
    new Field({
      name: 'symbol',
      label: 'Symbol',
      field: (row: any) => row.item.symbol,
      align: 'left',
      sortable: true,
    }),
    new Field({
      name: 'decimals',
      label: 'Decimals',
      field: (row: any) => row.item.decimals,
      align: 'left',
      sortable: false,
    }),
    new Field({
      name: 'transactionCount',
      label: 'Transactions',
      field: (row: any) => row.item.transactions,
      align: 'left',
      sortable: false,
    }),
  ],
  {
    allowNoSort: false,
    allowDescSort: false,
    multiSort: false,
  }
);
