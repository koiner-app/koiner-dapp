import { RouteRecordRaw } from 'vue-router';

export const tokenizeModuleMobileRoutes: RouteRecordRaw[] = [
  {
    path: '/mobile/tokenize',
    children: [
      {
        name: 'mobile.tokenize',
        path: '',
        component: () => import('../pages/tokenize-mobile-index-page.vue'),
      },
    ],
  },
];
