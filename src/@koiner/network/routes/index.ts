import { RouteRecordRaw } from 'vue-router';

export const networkModuleRoutes: RouteRecordRaw[] = [
  {
    path: '/network',
    component: () => import('../layouts/network-layout.vue'),
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
    ],
  },
];
