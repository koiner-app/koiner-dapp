import { RouteRecordRaw } from 'vue-router';

export const networkRoutes: RouteRecordRaw[] = [
  {
    path: '/network',
    component: () => import('layouts/network/NetworkLayout.vue'),
    children: [
      {
        name: 'network',
        path: '',
        component: () => import('pages/network/NetworkIndexPage.vue'),
      },
      {
        name: 'network.rewards',
        path: '/network/rewards',
        component: () =>
          import('pages/network/block-production/BlockRewardsPage.vue'),
      },
      {
        name: 'network.producers',
        path: '/network/producers',
        component: () =>
          import('pages/network/block-production/BlockProducersPage.vue'),
      },
    ],
  },
];
