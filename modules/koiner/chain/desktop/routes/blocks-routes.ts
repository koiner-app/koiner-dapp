import { RouteRecordRaw } from 'vue-router';

export const blocksRoutes: RouteRecordRaw[] = [
  // Blocks
  {
    path: '/blocks',
    component: () => import('../layouts/chain-layout.vue'),
    children: [
      {
        name: 'blocks',
        path: '',
        component: () => import('../pages/blocks/blocks-index-page.vue'),
      },
    ],
  },
  {
    name: 'block',
    path: '/blocks/:height',
    component: () => import('../pages/blocks/id/block-page.vue'),
  },
];
