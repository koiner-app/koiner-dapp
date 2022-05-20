/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access */
import { Board } from '@appvise/component/board/lib/field/board';
import { Field } from '@appvise/component/board/lib/field/field';

export const ContractsTableBoard: Board = new Board(
  [
    new Field({
      name: 'id',
      label: 'Contract Hash',
      field: (row: any) => row.item.id,
      align: 'left',
      sortable: false,
      sort: true,
      customized: true,
    }),
    new Field({
      name: 'type',
      label: 'Type',
      field: (row: any) => row.item.contractStandardType,
      align: 'left',
      sortable: false,
    }),
  ],
  {
    allowNoSort: true,
    allowDescSort: true,
    multiSort: true,
  }
);
