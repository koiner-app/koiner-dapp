import { RouteRecordRaw } from 'vue-router';
import { accountModuleMobileRoutes } from '@koiner/account/mobile/routes';

import { chainModuleMobileRoutes } from '@koiner/chain/mobile/routes';
import { contractsModuleMobileRoutes } from '@koiner/contracts/mobile/routes';
import { ecosystemModuleMobileRoutes } from '@koiner/ecosystem/mobile/routes';
import { networkModuleMobileRoutes } from '@koiner/network/mobile/routes';
import { tokenizeModuleMobileRoutes } from '@koiner/tokenize/mobile/routes';

export const mobileRoutes: RouteRecordRaw[] = [
  {
    path: '/mobile',
    component: () => import('../layouts/mobile-layout.vue'),
    children: [
      // Root pages
      {
        name: 'mobile.home',
        path: '',
        component: () => import('../pages/home/index-page.vue'),
      },
      // {
      //   name: 'transfer',
      //   path: '/transfer',
      //   component: () => import('pages/transfer-page.vue'),
      // },

      // Account
      ...accountModuleMobileRoutes,

      // Koiner Modules
      ...chainModuleMobileRoutes,
      ...contractsModuleMobileRoutes,
      ...ecosystemModuleMobileRoutes,
      ...networkModuleMobileRoutes,
      ...tokenizeModuleMobileRoutes,
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/mobile/:catchAll(.*)*',
    component: () => import('../pages/error-not-found.vue'),
  },
];
