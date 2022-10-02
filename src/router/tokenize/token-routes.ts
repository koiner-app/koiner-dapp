import { RouteRecordRaw } from 'vue-router';

export const tokenContractRoutes: RouteRecordRaw[] = [
  // Token
  {
    path: '/tokens/:id',
    component: () => import('layouts/token/TokenLayout.vue'),
    children: [
      {
        name: 'token',
        path: '',
        component: () => import('pages/tokenize/contract/id/TokenPage.vue'),
      },
      {
        name: 'token-token.events',
        path: '/tokens/:id/events',
        component: () =>
          import('pages/tokenize/contract/id/TokenEventsPage.vue'),
      },
      {
        name: 'token-token.operations',
        path: '/tokens/:id/operations',
        component: () =>
          import('pages/tokenize/contract/id/TokenOperationsPage.vue'),
      },
      {
        name: 'token-token.balances',
        path: '/tokens/:id/holders',
        component: () =>
          import('pages/tokenize/contract/id/TokenHoldersPage.vue'),
      },
    ],
  },
];
