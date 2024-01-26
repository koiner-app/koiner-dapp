import { RouteRecordRaw } from 'vue-router';

export const contractsModuleMobileRoutes: RouteRecordRaw[] = [
  {
    path: '/m/contracts',
    children: [
      {
        name: 'mobile.contracts',
        path: '',
        component: () => import('../pages/contracts-mobile-index-page.vue'),
      },
      {
        name: 'mobile.contract',
        path: '/m/contracts/:id',
        component: () => import('../pages/contract-mobile-page.vue'),
      },
    ],
  },
];
