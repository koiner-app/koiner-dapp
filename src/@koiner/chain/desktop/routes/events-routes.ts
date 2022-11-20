import { RouteRecordRaw } from 'vue-router';

export const eventsRoutes: RouteRecordRaw[] = [
  // Events
  {
    path: '/events',
    component: () => import('../layouts/chain-layout.vue'),
    children: [
      {
        name: 'events',
        path: '',
        component: () => import('../pages/events/events-index-page.vue'),
      },
      {
        name: 'event',
        path: '/events/:id',
        component: () => import('../pages/events/id/event-page.vue'),
      },
    ],
  },
];
