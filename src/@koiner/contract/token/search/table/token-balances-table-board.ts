/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access */
import { Board } from '@appvise/component/board/lib/field/board';
import { Field } from '@appvise/component/board/lib/field/field';

export const TokenBalancesTableBoard: Board = new Board(
  [
    new Field({
      name: 'addressId',
      label: 'Address',
      field: (row: any) => row.item.addressId,
      align: 'left',
      sortable: false,
      customized: true,
    }),
    new Field({
      name: 'balance',
      label: 'Balance',
      field: (row: any) => row.item.balance,
      align: 'left',
      sortable: false,
      sort: false,
      customized: true,
    }),
  ],
  {
    allowNoSort: false,
    allowDescSort: false,
    multiSort: false,
  }
);

export const AddressBalancesTableBoard: Board = new Board(
  [
    new Field({
      name: 'addressId',
      label: 'Address',
      field: (row: any) => row.item.addressId,
      align: 'left',
      sortable: false,
      customized: true,
    }),
    new Field({
      name: 'contract',
      label: 'Token',
      field: (row: any) => row.item.contract.id,
      align: 'left',
      sortable: false,
      sort: false,
      customized: true,
    }),
    new Field({
      name: 'balance',
      label: 'Balance',
      field: (row: any) => row.item.balance,
      align: 'left',
      sortable: false,
      sort: false,
      customized: true,
    }),
  ],
  {
    allowNoSort: false,
    allowDescSort: false,
    multiSort: false,
  }
);
