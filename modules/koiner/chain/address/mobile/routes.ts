import { RouteRecordRaw } from 'vue-router';

export const addressMobileRoutes: RouteRecordRaw[] = [
  {
    name: 'mobile.addresses',
    path: '/mobile/addresses',
    component: () => import('../../chain-mobile-index-page.vue'),
  },
  {
    name: 'mobile.address',
    path: '/mobile/addresses/:id',
    component: () => import('./page/address-mobile-page.vue'),
  },
  {
    name: 'mobile.address.history',
    path: '/mobile/addresses/:id/history',
    component: () => import('./page/address-mobile-page.vue'),
  },
];
