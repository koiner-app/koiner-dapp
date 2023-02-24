import { RouteRecordRaw } from 'vue-router';

export const addressesRoutes: RouteRecordRaw[] = [
  // Address
  {
    path: '/addresses',
    component: () => import('../../chain-layout.vue'),
    children: [
      {
        name: 'addresses',
        path: '',
        component: () => import('./page/addresses-index-page.vue'),
      },
    ],
  },
  {
    path: '/addresses/:id',
    component: () => import('./layout/address-layout.vue'),
    children: [
      {
        name: 'address',
        path: '/addresses/:id',
        component: () => import('./page/id/address-index-page.vue'),
      },
      {
        name: 'address.history',
        path: '/addresses/:id/history',
        component: () => import('./page/id/address-history-page.vue'),
      },
      {
        name: 'address.rewards',
        path: '/addresses/:id/rewards',
        component: () => import('./page/id/address-rewards-page.vue'),
      },
    ],
  },
];
