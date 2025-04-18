import { RouteRecordRaw } from 'vue-router';

export const tokensContractRoutes: RouteRecordRaw[] = [
  {
    path: '/tokens',
    component: () => import('../layouts/tokens-desktop-layout.vue'),
    children: [
      {
        name: 'tokens',
        path: '/tokens',
        component: () => import('../pages/contract/tokens-page.vue'),
      },
      {
        name: 'tokens.events',
        path: '/tokens/events',
        component: () => import('../pages/event/tokens-events-page.vue'),
      },
      {
        name: 'tokens.operations',
        path: '/tokens/operations',
        component: () =>
          import('../pages/operation/tokens-operations-page.vue'),
      },
      {
        name: 'tokens.transfers',
        path: '/tokens/transfers',
        component: () => import('../pages/operation/tokens-transfers-page.vue'),
      },
    ],
  },
];
