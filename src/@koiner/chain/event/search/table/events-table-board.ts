/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access */
import { Board } from '@appvise/component/board/lib/field/board';
import { Field } from '@appvise/component/board/lib/field/field';

export const EventsTableBoard: Board = new Board(
  [
    new Field({
      name: 'id',
      label: 'Event Hash',
      field: (row: any) => row.item.id,
      align: 'left',
      sortable: false,
      customized: true,
    }),
    new Field({
      name: 'transactionId',
      label: 'txn',
      field: (row: any) => row.item.transactionId,
      align: 'left',
      sortable: false,
      customized: true,
    }),
    new Field({
      name: 'sequence',
      label: 'seq',
      field: (row: any) => row.item.sequence,
      align: 'left',
      sortable: false,
      customized: true,
    }),
    new Field({
      name: 'contractId',
      label: 'Contract',
      field: (row: any) => row.item.contractId,
      align: 'left',
      sortable: false,
    }),
    new Field({
      name: 'name',
      label: 'Name',
      field: (row: any) => row.item.name,
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
