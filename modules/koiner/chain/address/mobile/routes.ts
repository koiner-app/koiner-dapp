import { RouteRecordRaw } from 'vue-router';

export const addressMobileRoutes: RouteRecordRaw[] = [
  {
    name: 'mobile.address',
    path: '/mobile/addresses/:id',
    component: () => import('./page/address-mobile-page.vue'),
  },
];
