import { RouteRecordRaw } from 'vue-router';

export const tokenizeModuleMobileRoutes: RouteRecordRaw[] = [
  {
    path: '/mobile/tokenize',
    children: [
      {
        name: 'mobile.tokenize',
        path: '/mobile/tokenize',
        component: () => import('../pages/tokenize-mobile-index-page.vue'),
      },
      {
        name: 'mobile.tokens',
        path: '/mobile/tokens',
        component: () => import('../pages/tokenize-mobile-index-page.vue'),
      },
      {
        name: 'mobile.token',
        path: '/mobile/tokens/:id',
        component: () => import('../pages/token-mobile-page.vue'),
      },
    ],
  },
];
