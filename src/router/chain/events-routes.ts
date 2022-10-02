import { RouteRecordRaw } from 'vue-router';

export const eventsRoutes: RouteRecordRaw[] = [
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
];
