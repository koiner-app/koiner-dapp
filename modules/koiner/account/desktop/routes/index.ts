import { RouteRecordRaw } from 'vue-router';

export const accountModuleDesktopRoutes: RouteRecordRaw[] = [
  {
    path: '/account',
    component: () => import('../layouts/account-layout.vue'),
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
    ],
  },
  {
    path: '/settings',
    component: () => import('../layouts/settings-layout.vue'),
    children: [
      {
        name: 'account.bookmarks',
        path: '/settings/bookmarks',
        component: () =>
          import(
            '@koiner/account/desktop/pages/settings/account-bookmarks-page.vue'
          ),
      },
      {
        name: 'account.settings',
        path: '/settings',
        component: () =>
          import(
            '@koiner/account/desktop/pages/settings/account-settings-page.vue'
          ),
      },
    ],
  },
];
