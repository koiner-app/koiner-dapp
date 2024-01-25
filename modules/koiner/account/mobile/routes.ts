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
  {
    name: 'mobile.history',
    path: '/mobile/history',
    component: () => import('./pages/history-mobile-index-page.vue'),
  },
];
