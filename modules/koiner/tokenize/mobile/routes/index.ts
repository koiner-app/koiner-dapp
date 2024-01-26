import { RouteRecordRaw } from 'vue-router';

export const tokenizeModuleMobileRoutes: RouteRecordRaw[] = [
  {
    path: '/m/tokenize',
    children: [
      {
        name: 'mobile.tokenize',
        path: '',
        component: () => import('../pages/tokenize-mobile-index-page.vue'),
      },
      {
        name: 'mobile.token',
        path: '/m/tokens/:id',
        component: () => import('../pages/token-mobile-page.vue'),
      },
    ],
  },
];
