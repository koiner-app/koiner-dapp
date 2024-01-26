import { RouteRecordRaw } from 'vue-router';

export const addressMobileRoutes: RouteRecordRaw[] = [
  {
    name: 'mobile.address',
    path: '/m/addresses/:id',
    component: () => import('./page/address-mobile-page.vue'),
  },
  {
    name: 'mobile.address.history',
    path: '/m/addresses/:id/history',
    component: () => import('./page/address-mobile-page.vue'),
  },
];
