import { RouteRecordRaw } from 'vue-router';

export const blocksRoutes: RouteRecordRaw[] = [
  // Blocks
  {
    path: '/blocks',
    component: () => import('layouts/chain/ChainLayout.vue'),
    children: [
      {
        name: 'blocks',
        path: '',
        component: () => import('pages/chain/blocks/BlocksIndexPage.vue'),
      },
      {
        path: '/blocks',
        component: () => import('layouts/chain/BlockLayout.vue'),
        children: [
          {
            name: 'block',
            path: '/blocks/:height',
            component: () => import('pages/chain/blocks/id/BlockPage.vue'),
          },
          {
            name: 'block.transactions',
            path: '/blocks/:height/transactions',
            component: () =>
              import('pages/chain/blocks/id/BlockTransactionsPage.vue'),
          },
          {
            name: 'block.operations',
            path: '/blocks/:height/operations',
            component: () =>
              import('pages/chain/blocks/id/BlockOperationsPage.vue'),
          },
        ],
      },
    ],
  },
];
