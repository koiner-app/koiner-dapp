import { RouteRecordRaw } from 'vue-router';
import { accountModuleDesktopRoutes } from '@koiner/account/desktop/routes';

import { chainModuleRoutes } from '@koiner/chain/desktop/routes';
import { contractsModuleDesktopRoutes } from '@koiner/contracts/desktop/routes';
import { networkModuleDesktopRoutes } from '@koiner/network/desktop/routes';
import { tokenizeModuleRoutes } from '@koiner/tokenize/desktop/routes';

export const desktopRoutes: RouteRecordRaw[] = [
  {
    path: '/health',
    component: () => import('src/desktop/pages/health-check-page.vue'),
  },
  {
    path: '/',
    component: () => import('src/desktop/layouts/desktop-layout.vue'),
    children: [
      // Root pages
      {
        name: 'home',
        path: '',
        component: () => import('pages/../desktop/pages/home/index-page.vue'),
      },
      {
        name: 'transfer',
        path: '/transfer',
        component: () => import('src/desktop/pages/transfer-page.vue'),
      },

      // Account
      ...accountModuleDesktopRoutes,

      // Koiner Modules
      ...chainModuleRoutes,
      ...contractsModuleDesktopRoutes,
      ...networkModuleDesktopRoutes,
      ...tokenizeModuleRoutes,
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/desktop/pages/error-not-found.vue'),
  },
];
