import { RouteRecordRaw } from 'vue-router';

export const operationsRoutes: RouteRecordRaw[] = [
  // Operations
  {
    path: '/operations',
    component: () => import('../../chain-layout.vue'),
    children: [
      {
        name: 'operations',
        path: '',
        component: () => import('./page/operations-index-page.vue'),
      },
      {
        name: 'operation',
        path: '/operations/:id',
        component: () => import('./page/id/operation-page.vue'),
      },
    ],
  },
];
