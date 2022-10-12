import { RouteRecordRaw } from 'vue-router';

export const addressesRoutes: RouteRecordRaw[] = [
  // Address
  {
    path: '/addresses',
    component: () => import('../layouts/chain-layout.vue'),
    children: [
      {
        name: 'addresses',
        path: '',
        component: () => import('../pages/addresses/addresses-index-page.vue'),
      },
    ],
  },
  {
    path: '/addresses/:id',
    component: () => import('../layouts/address-layout.vue'),
    children: [
      {
        name: 'address',
        path: '/addresses/:id',
        component: () => import('../pages/addresses/id/address-index-page.vue'),
      },
      {
        name: 'address.history',
        path: '/addresses/:id/history',
        component: () =>
          import('../pages/addresses/id/address-history-page.vue'),
      },
      {
        name: 'address.rewards',
        path: '/addresses/:id/rewards',
        component: () =>
          import('../pages/addresses/id/address-rewards-page.vue'),
      },
    ],
  },
];
