import { RouteRecordRaw } from 'vue-router';

export const tokensContractRoutes: RouteRecordRaw[] = [
  // Tokens
  {
    path: '/tokens',
    component: () => import('layouts/token/TokensLayout.vue'),
    children: [
      {
        name: 'tokens',
        path: '',
        component: () => import('pages/tokenize/contract/TokensPage.vue'),
      },
      {
        name: 'tokens.events',
        path: '/tokens/events',
        component: () => import('pages/tokenize/event/TokensEventsPage.vue'),
      },
      {
        name: 'tokens.operations',
        path: '/tokens/operations',
        component: () =>
          import('pages/tokenize/operation/TokensOperationsPage.vue'),
      },
    ],
  },
];
