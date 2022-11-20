import { RouteRecordRaw } from 'vue-router';

export const contractsRoutes: RouteRecordRaw[] = [
  {
    path: '/contracts',
    component: () => import('../layouts/contracts-desktop-layout.vue'),
    children: [
      {
        name: 'contracts.overview',
        path: '/contracts/overview',
        component: () => import('../pages/contracts-index-page.vue'),
      },
      {
        name: 'contracts',
        path: '/contracts',
        component: () => import('../pages/contract/contracts-search-page.vue'),
      },
      {
        name: 'contracts.events',
        path: '/contracts/events',
        component: () => import('../pages/contract/contracts-events-page.vue'),
      },
      {
        name: 'contracts.operations',
        path: '/contracts/operations',
        component: () =>
          import('../pages/contract/contracts-operationsPage.vue'),
      },
      {
        name: 'contracts.standards',
        path: '/contracts/standards',
        component: () =>
          import('../pages/contract/contract-standards-page.vue'),
      },
    ],
  },
];
