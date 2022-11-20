import { RouteRecordRaw } from 'vue-router';

export const operationsRoutes: RouteRecordRaw[] = [
  // Operations
  {
    path: '/operations',
    component: () => import('../layouts/chain-layout.vue'),
    children: [
      {
        name: 'operations',
        path: '',
        component: () =>
          import('../pages/operations/operations-index-page.vue'),
      },
      {
        name: 'operation',
        path: '/operations/:id',
        component: () => import('../pages/operations/id/operation-page.vue'),
      },
    ],
  },
];
