import { RouteRecordRaw } from 'vue-router';

export const networkModuleDesktopRoutes: RouteRecordRaw[] = [
  {
    path: '/network',
    component: () => import('../layouts/network-desktop-layout.vue'),
    children: [
      {
        name: 'network',
        path: '',
        component: () => import('../pages/network-index-page.vue'),
      },
      {
        name: 'network.health',
        path: '/network/health',
        component: () => import('../pages/network-health-page.vue'),
      },
      {
        name: 'network.block-producers',
        path: '/network/producers',
        component: () =>
          import('../pages/block-production/block-producers-page.vue'),
      },
      {
        name: 'network.block-rewards',
        path: '/network/rewards',
        component: () =>
          import('../pages/block-production/block-rewards-page.vue'),
      },
    ],
  },
];
