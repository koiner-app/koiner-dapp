import { RouteRecordRaw } from 'vue-router';

export const transactionsRoutes: RouteRecordRaw[] = [
  // Transactions
  {
    path: '/transactions',
    component: () => import('../chain-layout.vue'),
    children: [
      {
        name: 'transactions',
        path: '',
        component: () => import('./desktop/page/transactions-index-page.vue'),
      },
    ],
  },
  {
    name: 'transaction',
    path: '/transactions/:id',
    component: () => import('./desktop/page/id/transaction-page.vue'),
  },
  {
    name: 'transaction.tab',
    path: '/transactions/:id/:tab',
    component: () => import('./desktop/page/id/transaction-page.vue'),
  },
];
