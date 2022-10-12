import { RouteRecordRaw } from 'vue-router';

export const blocksRoutes: RouteRecordRaw[] = [
  // Blocks
  {
    path: '/blocks',
    component: () => import('../layouts/chain-layout.vue'),
    children: [
      {
        name: 'blocks',
        path: '',
        component: () => import('../pages/blocks/blocks-index-page.vue'),
      },
      {
        path: '/blocks',
        component: () => import('../layouts/block-layout.vue'),
        children: [
          {
            name: 'block',
            path: '/blocks/:height',
            component: () => import('../pages/blocks/id/block-page.vue'),
          },
          {
            name: 'block.transactions',
            path: '/blocks/:height/transactions',
            component: () =>
              import('../pages/blocks/id/block-transactions-page.vue'),
          },
          {
            name: 'block.operations',
            path: '/blocks/:height/operations',
            component: () =>
              import('../pages/blocks/id/block-operations-page.vue'),
          },
        ],
      },
    ],
  },
];
