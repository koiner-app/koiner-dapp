import { RouteRecordRaw } from 'vue-router';

export const transactionsRoutes: RouteRecordRaw[] = [
  // Transactions
  {
    path: '/transactions',
    component: () => import('layouts/chain/ChainLayout.vue'),
    children: [
      {
        name: 'transactions',
        path: '',
        component: () =>
          import('pages/chain/transactions/TransactionsIndexPage.vue'),
      },
      {
        name: 'transaction',
        path: '/transactions/:id',
        component: () => import('layouts/chain/TransactionLayout.vue'),
        children: [
          {
            name: 'transaction',
            path: '/',
            component: () =>
              import('pages/chain/transactions/id/TransactionPage.vue'),
          },
          {
            name: 'transaction.operations',
            path: '/transactions/:id/operations',
            component: () =>
              import(
                'pages/chain/transactions/id/TransactionOperationsPage.vue'
              ),
          },
          {
            name: 'transaction.events',
            path: '/transactions/:id/events',
            component: () =>
              import('pages/chain/transactions/id/TransactionEventsPage.vue'),
          },
        ],
      },
    ],
  },
];
