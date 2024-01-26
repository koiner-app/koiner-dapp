import { RouteRecordRaw } from 'vue-router';

export const accountModuleMobileRoutes: RouteRecordRaw[] = [
  {
    path: '/m/account',
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
    path: '/m/history',
    component: () => import('./pages/history-mobile-index-page.vue'),
  },
];
