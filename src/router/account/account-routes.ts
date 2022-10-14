import { RouteRecordRaw } from 'vue-router';

export const accountRoutes: RouteRecordRaw[] = [
  // Bookmarks
  {
    path: '/account',
    component: () => import('layouts/account/account-layout.vue'),
    children: [
      {
        name: 'account.portfolio',
        path: '',
        component: () => import('pages/account/account-portfolio-page.vue'),
      },
      {
        name: 'account.history',
        path: '/history',
        component: () => import('pages/account/account-history-page.vue'),
      },
      {
        name: 'account.rewards',
        path: '/rewards',
        component: () => import('pages/account/account-rewards-page.vue'),
      },
      {
        name: 'account.bookmarks',
        path: '/bookmarks',
        component: () => import('pages/account/account-bookmarks-page.vue'),
      },
    ],
  },
];
