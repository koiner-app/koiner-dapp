import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/health',
    component: () => import('pages/HealthCheckPage.vue'),
  },
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
      {
        path: 'dashboard',
        component: () => import('pages/dashboard/DashboardIndexPage.vue'),
      },

      // Address
      {
        path: '/addresses',
        component: () => import('layouts/chain/ChainLayout.vue'),
        children: [
          {
            name: 'addresses',
            path: '',
            component: () =>
              import('pages/chain/addresses/AddressesIndexPage.vue'),
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
            component: () =>
              import('pages/chain/addresses/id/VaultIndexPage.vue'),
          },
        ],
      },

      // Chain overview
      {
        path: '/chain',
        component: () => import('layouts/chain/ChainLayout.vue'),
        children: [
          {
            name: 'chain',
            path: '',
            component: () => import('pages/chain/ChainIndexPage.vue'),
          },
        ],
      },

      // Blocks
      {
        path: '/blocks',
        component: () => import('layouts/chain/ChainLayout.vue'),
        children: [
          {
            name: 'blocks',
            path: '',
            component: () => import('pages/chain/blocks/BlocksIndexPage.vue'),
          },
          {
            path: '/blocks',
            component: () => import('layouts/chain/BlockLayout.vue'),
            children: [
              {
                name: 'block',
                path: '/blocks/:height',
                component: () => import('pages/chain/blocks/id/BlockPage.vue'),
              },
              {
                name: 'block.transactions',
                path: '/blocks/:height/transactions',
                component: () =>
                  import('pages/chain/blocks/id/BlockTransactionsPage.vue'),
              },
              {
                name: 'block.operations',
                path: '/blocks/:height/operations',
                component: () =>
                  import('pages/chain/blocks/id/BlockOperationsPage.vue'),
              },
            ],
          },
        ],
      },

      // Events
      {
        path: '/events',
        component: () => import('layouts/chain/ChainLayout.vue'),
        children: [
          {
            name: 'events',
            path: '',
            component: () => import('pages/chain/events/EventsIndexPage.vue'),
          },
          {
            name: 'event',
            path: '/events/:id',
            component: () => import('pages/chain/events/id/EventPage.vue'),
          },
        ],
      },

      // Transactions
      {
        path: '/transactions',
        component: () => import('layouts/chain/ChainLayout.vue'),
        children: [
          {
            name: 'transactions',
            path: '',
            component: () =>
              import('pages/chain/transactions/TransactionsIndexPage.vue'),
          },
          {
            name: 'transaction',
            path: '/transactions/:id',
            component: () => import('layouts/chain/TransactionLayout.vue'),
            children: [
              {
                name: 'transaction',
                path: '/',
                component: () =>
                  import('pages/chain/transactions/id/TransactionPage.vue'),
              },
              {
                name: 'transaction.operations',
                path: '/transactions/:id/operations',
                component: () =>
                  import(
                    'pages/chain/transactions/id/TransactionOperationsPage.vue'
                  ),
              },
              {
                name: 'transaction.events',
                path: '/transactions/:id/events',
                component: () =>
                  import(
                    'pages/chain/transactions/id/TransactionEventsPage.vue'
                  ),
              },
            ],
          },
        ],
      },

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
            component: () =>
              import('pages/contracts/ContractsOperationsPage.vue'),
          },
          {
            name: 'contracts.standards',
            path: '/contracts/standards',
            component: () =>
              import('pages/contracts/ContractStandardsPage.vue'),
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

      // Operations
      {
        path: '/operations',
        component: () => import('layouts/chain/ChainLayout.vue'),
        children: [
          {
            name: 'operations',
            path: '',
            component: () =>
              import('pages/chain/operations/OperationsIndexPage.vue'),
          },
          {
            name: 'operation',
            path: '/operations/:id',
            component: () =>
              import('pages/chain/operations/id/OperationPage.vue'),
          },
        ],
      },

      // Lockup
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

      // Tokens
      {
        path: '/tokens',
        component: () => import('layouts/token/TokensLayout.vue'),
        children: [
          {
            name: 'tokens',
            path: '',
            component: () => import('pages/tokens/default/TokensPage.vue'),
          },
          {
            name: 'tokens.operations',
            path: '/tokens/operations',
            component: () =>
              import('pages/tokens/default/TokensOperationsPage.vue'),
          },
        ],
      },

      // Token
      {
        path: '/tokens/:id',
        component: () => import('layouts/token/TokenLayout.vue'),
        children: [
          {
            name: 'token',
            path: '',
            component: () => import('pages/tokens/default/id/TokenPage.vue'),
          },
          {
            name: 'token-token.operations',
            path: '/tokens/:id/operations',
            component: () =>
              import('pages/tokens/default/id/TokenOperationsPage.vue'),
          },
          {
            name: 'token-token.balances',
            path: '/tokens/:id/holders',
            component: () =>
              import('pages/tokens/default/id/TokenBalancesPage.vue'),
          },
        ],
      },

      // Account
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
      // {
      //   path: '/account/lockups/create',
      //   component: () => import('pages/account/lockups/Create.vue'),
      // },
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
