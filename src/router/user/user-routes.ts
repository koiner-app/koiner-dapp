import { RouteRecordRaw } from 'vue-router';

export const userAccountRoutes: RouteRecordRaw[] = [
  // Account
  {
    path: '/account',
    component: () => import('layouts/AccountLayout.vue'),
    children: [
      {
        name: 'account',
        path: '',
        component: () => import('pages/account/AccountIndexPage.vue'),
      },
      {
        name: 'account.addresses',
        path: '/account/addresses',
        component: () => import('pages/account/AccountAddressesPage.vue'),
      },
    ],
  },
];
