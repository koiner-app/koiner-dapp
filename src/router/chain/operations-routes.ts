import { RouteRecordRaw } from 'vue-router';

export const operationsRoutes: RouteRecordRaw[] = [
  // Operations
  {
    path: '/operations',
    component: () => import('layouts/chain/ChainLayout.vue'),
    children: [
      {
        name: 'operations',
        path: '',
        component: () =>
          import('pages/chain/operations/OperationsIndexPage.vue'),
      },
      {
        name: 'operation',
        path: '/operations/:id',
        component: () => import('pages/chain/operations/id/OperationPage.vue'),
      },
    ],
  },
];
