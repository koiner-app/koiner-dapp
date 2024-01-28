import { RouteRecordRaw } from 'vue-router';
import { addressMobileRoutes } from '@koiner/chain/address/mobile/routes';
import { blockMobileRoutes } from '@koiner/chain/block/mobile/routes';
import { transactionMobileRoutes } from '@koiner/chain/transaction/mobile/routes';

export const chainModuleMobileRoutes: RouteRecordRaw[] = [
  {
    name: 'mobile.chain',
    path: '/mobile/chain',
    component: () => import('./chain-mobile-index-page.vue'),
  },
  ...addressMobileRoutes,
  ...blockMobileRoutes,
  ...transactionMobileRoutes,
];
