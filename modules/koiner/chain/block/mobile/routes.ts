import { RouteRecordRaw } from 'vue-router';

export const blockMobileRoutes: RouteRecordRaw[] = [
  {
    name: 'mobile.block',
    path: '/mobile/block/:height',
    component: () => import('./page/block-mobile-page.vue'),
  },
];
