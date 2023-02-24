import { RouteRecordRaw } from 'vue-router';
import { accountModuleMobileRoutes } from '@koiner/account/mobile/routes';

import { chainModuleMobileRoutes } from '@koiner/chain/mobile-routes';
import { contractsModuleMobileRoutes } from '@koiner/contracts/mobile/routes';
import { ecosystemModuleMobileRoutes } from '@koiner/ecosystem/mobile/routes';
import { networkModuleMobileRoutes } from '@koiner/network/mobile/routes';
import { tokenizeModuleMobileRoutes } from '@koiner/tokenize/mobile/routes';

export const mobileRoutes: RouteRecordRaw[] = [
  {
    path: '/mobile',
    component: () => import('../layouts/mobile-base-layout.vue'),
    children: [
      {
        path: '/mobile',
        component: () => import('../layouts/mobile-home-layout.vue'),
        children: [
          // Root pages
          {
            name: 'mobile.home',
            path: '',
            component: () => import('../pages/home/index-page.vue'),
          },

          // Koiner Modules
          ...contractsModuleMobileRoutes,
          ...tokenizeModuleMobileRoutes,
        ],
      },

      {
        path: '/mobile/chain',
        component: () => import('../layouts/mobile-clean-layout.vue'),
        children: [...chainModuleMobileRoutes],
      },

      {
        path: '/mobile/search',
        component: () => import('../layouts/mobile-clean-layout.vue'),
        children: [
          {
            name: 'mobile.search',
            path: '',
            component: () => import('../pages/mobile-search-page.vue'),
          },
        ],
      },

      {
        path: '/mobile/account',
        component: () => import('../layouts/mobile-clean-layout.vue'),
        children: [...accountModuleMobileRoutes],
      },

      {
        path: '/mobile/ecosystem',
        component: () => import('../layouts/mobile-clean-layout.vue'),
        children: [...ecosystemModuleMobileRoutes],
      },

      {
        path: '/mobile/network',
        component: () => import('../layouts/mobile-clean-layout.vue'),
        children: [...networkModuleMobileRoutes],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/mobile/:catchAll(.*)*',
    component: () => import('../pages/error-not-found.vue'),
  },
];
