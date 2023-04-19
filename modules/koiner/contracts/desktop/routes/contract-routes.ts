import { RouteRecordRaw } from 'vue-router';

export const contractRoutes: RouteRecordRaw[] = [
  {
    path: '/contracts/:id',
    component: () => import('../layouts/contract-desktop-layout.vue'),
    children: [
      {
        name: 'contract',
        path: '/contracts/:id',
        component: () =>
          import('../pages/contract/id/contract-operations-page.vue'),
      },
      {
        name: 'contract.events',
        path: '/contracts/:id/events',
        component: () =>
          import('../pages/contract/id/contract-events-page.vue'),
      },
      {
        name: 'contract.operations',
        path: '/contracts/:id/operations',
        component: () =>
          import('../pages/contract/id/contract-operations-page.vue'),
      },
    ],
  },
];
