import { RouteRecordRaw } from 'vue-router';

export const networkModuleMobileRoutes: RouteRecordRaw[] = [
  {
    path: '/mobile/network',
    children: [
      {
        name: 'mobile.network',
        path: '',
        component: () => import('./pages/network-index-page.vue'),
      },
    ],
  },
];
