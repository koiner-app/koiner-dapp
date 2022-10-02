import { RouteRecordRaw } from 'vue-router';

export const addressesRoutes: RouteRecordRaw[] = [
  // Address
  {
    path: '/addresses',
    component: () => import('layouts/chain/ChainLayout.vue'),
    children: [
      {
        name: 'addresses',
        path: '',
        component: () => import('pages/chain/addresses/AddressesIndexPage.vue'),
      },
    ],
  },
  {
    path: '/addresses/:id',
    component: () => import('layouts/chain/AddressLayout.vue'),
    children: [
      {
        name: 'address',
        path: '/addresses/:id',
        component: () =>
          import('pages/chain/addresses/id/AddressIndexPage.vue'),
      },
      {
        name: 'wallet',
        path: '/addresses/:id/wallet',
        component: () => import('pages/chain/addresses/id/WalletPage.vue'),
      },
      {
        name: 'history',
        path: '/addresses/:id/history',
        component: () => import('pages/chain/addresses/id/HistoryPage.vue'),
      },
      {
        name: 'vault',
        path: '/addresses/:id/vault',
        component: () => import('pages/chain/addresses/id/VaultIndexPage.vue'),
      },
    ],
  },
];
