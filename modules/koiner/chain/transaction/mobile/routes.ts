import { RouteRecordRaw } from 'vue-router';

export const transactionMobileRoutes: RouteRecordRaw[] = [
  {
    name: 'mobile.transaction',
    path: '/mobile/transactions/:id',
    component: () => import('./page/transaction-mobile-page.vue'),
  },
  {
    name: 'mobile.transaction.tab',
    path: '/mobile/transactions/:id/:tab',
    component: () => import('./page/transaction-mobile-page.vue'),
  },
];
