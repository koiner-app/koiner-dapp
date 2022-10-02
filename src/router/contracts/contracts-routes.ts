import { RouteRecordRaw } from 'vue-router';

export const contractsRoutes: RouteRecordRaw[] = [
  // Contracts
  {
    path: '/contracts',
    component: () => import('layouts/contracts/ContractsLayout.vue'),
    children: [
      {
        name: 'contracts',
        path: '',
        component: () => import('pages/contracts/ContractsIndexPage.vue'),
      },
      {
        name: 'contracts.operations',
        path: '/contracts/operations',
        component: () => import('pages/contracts/ContractsOperationsPage.vue'),
      },
      {
        name: 'contracts.standards',
        path: '/contracts/standards',
        component: () => import('pages/contracts/ContractStandardsPage.vue'),
      },

      // Contract
      {
        path: '/contracts/:id',
        component: () => import('layouts/contracts/ContractLayout.vue'),
        children: [
          {
            name: 'contract',
            path: '',
            component: () => import('pages/contracts/id/ContractPage.vue'),
          },
          {
            name: 'contract-contract.operations',
            path: '/contracts/:id/operations',
            component: () =>
              import('pages/contracts/id/ContractOperationsPage.vue'),
          },
        ],
      },
    ],
  },
];
