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
        name: 'transaction',
        path: '/transactions/:id',
        component: () => import('../layouts/transaction-layout.vue'),
        children: [
          {
            name: 'transaction',
            path: '',
            component: () =>
              import('../pages/transactions/id/transaction-page.vue'),
          },
          {
            name: 'transaction.operations',
            path: '/transactions/:id/operations',
            component: () =>
              import(
                '../pages/transactions/id/transaction-operations-page.vue'
              ),
          },
          {
            name: 'transaction.events',
            path: '/transactions/:id/events',
            component: () =>
              import('../pages/transactions/id/transaction-events-page.vue'),
          },
        ],
      },
    ],
  },
];
