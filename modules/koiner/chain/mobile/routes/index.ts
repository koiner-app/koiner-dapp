import { RouteRecordRaw } from 'vue-router';

export const chainModuleMobileRoutes: RouteRecordRaw[] = [
  {
    name: 'mobile.chain',
    path: '/mobile/chain',
    component: () => import('../pages/chain-mobile-index-page.vue'),
  },
  {
    name: 'mobile.address',
    path: '/mobile/addresses/:id',
    component: () => import('../pages/addresses/address-mobile-page.vue'),
  },
];
