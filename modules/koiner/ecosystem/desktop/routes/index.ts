import { RouteRecordRaw } from 'vue-router';

export const ecosystemModuleDesktopRoutes: RouteRecordRaw[] = [
  {
    name: 'ecosystem',
    path: '/ecosystem',
    component: () => import('../pages/ecosystem-page.vue'),
  },
];
