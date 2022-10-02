import { RouteRecordRaw } from 'vue-router';
import { addressesRoutes } from 'src/router/chain/addresses-routes';
import { blocksRoutes } from 'src/router/chain/blocks-routes';
import { eventsRoutes } from 'src/router/chain/events-routes';
import { operationsRoutes } from 'src/router/chain/operations-routes';
import { transactionsRoutes } from 'src/router/chain/transactions-routes';
import { contractsRoutes } from 'src/router/contracts/contracts-routes';
import { networkRoutes } from 'src/router/network/network-routes';
import { tokenContractRoutes } from 'src/router/tokenize/token-routes';
import { tokensContractRoutes } from 'src/router/tokenize/tokens-routes';
import { userAccountRoutes } from 'src/router/user/user-routes';

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

      // Chain
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
      ...addressesRoutes,
      ...blocksRoutes,
      ...eventsRoutes,
      ...operationsRoutes,
      ...transactionsRoutes,

      // Contracts
      ...contractsRoutes,

      // Network
      ...networkRoutes,

      // Tokenize
      ...tokenContractRoutes,
      ...tokensContractRoutes,

      // User
      ...userAccountRoutes,
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
