/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access */
import { Board } from '@appvise/component/board/lib/field/board';
import { Field } from '@appvise/component/board/lib/field/field';

export const OperationsTableBoard: Board = new Board(
  [
    new Field({
      name: 'id',
      label: 'Operation Hash',
      field: (row: any) => row.item.id,
      align: 'left',
      sortable: true,
      sort: true,
      customized: true,
    }),
    new Field({
      name: 'blockHeight',
      label: 'Height',
      field: (row: any) => row.item.blockHeight,
      align: 'left',
      sortable: true,
      sort: true,
      customized: true,
    }),
    new Field({
      name: 'type',
      label: 'Type',
      field: (row: any) => row.item.type,
      align: 'left',
      sortable: true,
      sort: true,
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
