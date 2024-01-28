import { RouteRecordRaw } from 'vue-router';

export const ecosystemModuleMobileRoutes: RouteRecordRaw[] = [
  {
    name: 'mobile.ecosystem',
    path: '/mobile/ecosystem',
    component: () => import('../pages/ecosystem-page.vue'),
  },
];
