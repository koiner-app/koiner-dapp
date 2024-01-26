import { RouteRecordRaw } from 'vue-router';
import { accountModuleMobileRoutes } from '@koiner/account/mobile/routes';

import { chainModuleMobileRoutes } from '@koiner/chain/mobile-routes';
import { contractsModuleMobileRoutes } from '@koiner/contracts/mobile/routes';
import { ecosystemModuleMobileRoutes } from '@koiner/ecosystem/mobile/routes';
import { networkModuleMobileRoutes } from '@koiner/network/block-production/mobile/routes';
import { tokenizeModuleMobileRoutes } from '@koiner/tokenize/mobile/routes';

export const mobileRoutes: RouteRecordRaw[] = [
  {
    path: '/m',
    component: () => import('../layouts/mobile-base-layout.vue'),
    children: [
      {
        path: '/m',
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
        path: '/m/chain',
        component: () => import('../layouts/mobile-clean-layout.vue'),
        children: [...chainModuleMobileRoutes],
      },

      {
        path: '/m/search',
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
        path: '/m/account',
        component: () => import('../layouts/mobile-clean-layout.vue'),
        children: [...accountModuleMobileRoutes],
      },

      {
        path: '/m/ecosystem',
        component: () => import('../layouts/mobile-clean-layout.vue'),
        children: [...ecosystemModuleMobileRoutes],
      },

      {
        path: '/m/network',
        component: () => import('../layouts/mobile-clean-layout.vue'),
        children: [...networkModuleMobileRoutes],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/m/:catchAll(.*)*',
    component: () => import('../pages/error-not-found.vue'),
  },
];
