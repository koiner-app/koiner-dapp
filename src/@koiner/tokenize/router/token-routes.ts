import { RouteRecordRaw } from 'vue-router';

export const tokenContractRoutes: RouteRecordRaw[] = [
  {
    path: '/tokens/:id',
    component: () => import('../layouts/token-layout.vue'),
    children: [
      {
        name: 'token',
        path: '',
        component: () => import('../pages/contract/id/token-page.vue'),
      },
      {
        name: 'token.events',
        path: '/tokens/:id/events',
        component: () => import('../pages/contract/id/token-events-page.vue'),
      },
      {
        name: 'token.operations',
        path: '/tokens/:id/operations',
        component: () =>
          import('../pages/contract/id/token-operations-page.vue'),
      },
      {
        name: 'token.balances',
        path: '/tokens/:id/holders',
        component: () => import('../pages/contract/id/token-holders-page.vue'),
      },
    ],
  },
];
