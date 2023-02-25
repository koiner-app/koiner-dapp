import { RouteRecordRaw } from 'vue-router';

export const transactionMobileRoutes: RouteRecordRaw[] = [
  {
    name: 'mobile.transaction',
    path: '/mobile/transaction/:id',
    component: () => import('./page/transaction-mobile-page.vue'),
  },
];
