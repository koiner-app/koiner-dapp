import { RouteRecordRaw } from 'vue-router';

export const blockMobileRoutes: RouteRecordRaw[] = [
  {
    name: 'mobile.blocks',
    path: '/mobile/blocks',
    component: () => import('../../chain-mobile-index-page.vue'),
  },
  {
    name: 'mobile.block',
    path: '/mobile/block/:height',
    component: () => import('./page/block-mobile-page.vue'),
  },
];
