import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Root pages
      {
        name: 'transfer',
        path: '/transfer',
        component: () => import('pages/TransferPage.vue'),
      },
      { path: '', component: () => import('pages/IndexPage.vue') },

      // Sub pages
      {
        name: 'addresses',
        path: '/addresses',
        component: () => import('pages/addresses/AddressesIndexPage.vue'),
      },
      {
        path: '/addresses/:id',
        component: () => import('layouts/AddressLayout.vue'),
        children: [
          {
            name: 'address',
            path: '/addresses/:id',
            component: () => import('pages/addresses/id/AddressIndexPage.vue'),
          },
          {
            name: 'wallet',
            path: '/addresses/:id/wallet',
            component: () => import('pages/addresses/id/WalletPage.vue'),
          },
          {
            name: 'history',
            path: '/addresses/:id/history',
            component: () => import('pages/addresses/id/HistoryPage.vue'),
          },
          {
            name: 'vault',
            path: '/addresses/:id/vault',
            component: () => import('pages/addresses/id/VaultIndexPage.vue'),
          },
        ],
      },
      {
        name: 'blocks',
        path: '/blocks',
        component: () => import('pages/blocks/BlocksIndexPage.vue'),
      },
      {
        name: 'block',
        path: '/blocks/:id',
        component: () => import('pages/blocks/id/BlockPage.vue'),
      },
      {
        name: 'lockups',
        path: '/lockups',
        component: () => import('pages/lockups/LockupsIndexPage.vue'),
      },
      {
        name: 'lockup',
        path: '/lockups/:id',
        component: () => import('pages/lockups/id/LockupPage.vue'),
      },
      {
        name: 'lockup.create',
        path: '/lockups/create',
        component: () => import('pages/lockups/CreateLockupPage.vue'),
      },
      {
        name: 'tokens',
        path: '/tokens',
        component: () => import('pages/tokens/TokensIndexPage.vue'),
      },
      {
        name: 'token',
        path: '/tokens/:id',
        component: () => import('pages/tokens/id/TokenPage.vue'),
      },
      {
        name: 'transactions',
        path: '/transactions',
        component: () => import('pages/transactions/TransactionsIndexPage.vue'),
      },
      {
        name: 'transaction',
        path: '/transactions/:id',
        component: () => import('pages/transactions/id/TransactionPage.vue'),
      },
      {
        path: '/account',
        component: () => import('layouts/AccountLayout.vue'),
        children: [
          {
            name: 'account',
            path: '',
            component: () => import('pages/account/AccountIndexPage.vue'),
          },
          {
            name: 'account.addresses',
            path: '/account/addresses',
            component: () => import('pages/account/AccountAddressesPage.vue'),
          },
        ],
      },
      {
        path: '/account/lockups/create',
        component: () => import('pages/account/lockups/Create.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
