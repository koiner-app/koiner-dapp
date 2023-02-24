import { RouteRecordRaw } from 'vue-router';

export const eventsRoutes: RouteRecordRaw[] = [
  // Events
  {
    path: '/events',
    component: () => import('../../chain-layout.vue'),
    children: [
      {
        name: 'events',
        path: '',
        component: () => import('./page/events-index-page.vue'),
      },
      {
        name: 'event',
        path: '/events/:id',
        component: () => import('./page/id/event-page.vue'),
      },
    ],
  },
];
