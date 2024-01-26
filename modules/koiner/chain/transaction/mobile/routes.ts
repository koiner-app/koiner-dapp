import { RouteRecordRaw } from 'vue-router';

export const transactionMobileRoutes: RouteRecordRaw[] = [
  {
    name: 'mobile.transaction',
    path: '/m/transactions/:id',
    component: () => import('./page/transaction-mobile-page.vue'),
  },
  {
    name: 'mobile.transaction.tab',
    path: '/m/transactions/:id/:tab',
    component: () => import('./page/transaction-mobile-page.vue'),
  },
];
