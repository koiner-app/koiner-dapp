import { RouteRecordRaw } from 'vue-router';

export const transactionsRoutes: RouteRecordRaw[] = [
  // Transactions
  {
    path: '/transactions',
    component: () => import('../layouts/chain-layout.vue'),
    children: [
      {
        name: 'transactions',
        path: '',
        component: () =>
          import('../pages/transactions/transactions-index-page.vue'),
      },
      {
        path: '/transactions/:id',
        component: () => import('../layouts/transaction-layout.vue'),
        children: [
          {
            name: 'transaction',
            path: '',
            component: () =>
              import('../pages/transactions/id/transaction-page.vue'),
          },
        ],
      },
    ],
  },
];
