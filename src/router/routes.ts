import { RouteRecordRaw } from 'vue-router';
import { accountRoutes } from 'src/router/account/account-routes';

import { chainModuleRoutes } from '@koiner/chain/routes';
import { contractsModuleRoutes } from '@koiner/contracts/routes';
import { networkModuleRoutes } from '@koiner/network/routes';
import { tokenizeModuleRoutes } from '@koiner/tokenize/router';

const routes: RouteRecordRaw[] = [
  {
    path: '/health',
    component: () => import('pages/health-check-page.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/main-layout.vue'),
    children: [
      // Root pages
      {
        name: 'home',
        path: '',
        component: () => import('pages/home/index-page.vue'),
      },
      {
        name: 'transfer',
        path: '/transfer',
        component: () => import('pages/transfer-page.vue'),
      },

      // Account
      ...accountRoutes,

      // Koiner Modules
      ...chainModuleRoutes,
      ...contractsModuleRoutes,
      ...networkModuleRoutes,
      ...tokenizeModuleRoutes,
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error-not-found.vue'),
  },
];

export default routes;
