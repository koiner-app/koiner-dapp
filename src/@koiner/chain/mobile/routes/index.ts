import { RouteRecordRaw } from 'vue-router';

export const chainModuleMobileRoutes: RouteRecordRaw[] = [
  {
    path: '/mobile/chain',
    children: [
      {
        name: 'mobile.chain',
        path: '',
        component: () => import('../pages/chain-mobile-index-page.vue'),
      },
    ],
  },
];
