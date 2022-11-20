import { RouteRecordRaw } from 'vue-router';

export const accountModuleDesktopRoutes: RouteRecordRaw[] = [
  {
    path: '/account',
    component: () =>
      import('layouts/../../../../desktop/layouts/account/account-layout.vue'),
    children: [
      {
        name: 'account.portfolio',
        path: '',
        component: () =>
          import('@koiner/account/desktop/pages/account-portfolio-page.vue'),
      },
      {
        name: 'account.history',
        path: '/history',
        component: () =>
          import('@koiner/account/desktop/pages/account-history-page.vue'),
      },
      {
        name: 'account.rewards',
        path: '/rewards',
        component: () =>
          import('@koiner/account/desktop/pages/account-rewards-page.vue'),
      },
      {
        name: 'account.bookmarks',
        path: '/bookmarks',
        component: () =>
          import('@koiner/account/desktop/pages/account-bookmarks-page.vue'),
      },
    ],
  },
];
