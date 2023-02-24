import { RouteRecordRaw } from 'vue-router';

export const blocksRoutes: RouteRecordRaw[] = [
  // Blocks
  {
    path: '/blocks',
    component: () => import('../../chain-layout.vue'),
    children: [
      {
        name: 'blocks',
        path: '',
        component: () => import('./page/blocks-index-page.vue'),
      },
    ],
  },
  {
    name: 'block',
    path: '/blocks/:height',
    component: () => import('./page/id/block-page.vue'),
  },
];
