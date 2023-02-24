import { RouteRecordRaw } from 'vue-router';

export const accountModuleMobileRoutes: RouteRecordRaw[] = [
  {
    path: '/mobile/account',
    children: [
      {
        name: 'mobile.account',
        path: '',
        component: () => import('./pages/account-mobile-index-page.vue'),
      },
    ],
  },
];
