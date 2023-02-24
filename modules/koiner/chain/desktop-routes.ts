import { RouteRecordRaw } from 'vue-router';
import { addressesRoutes } from './address/desktop/routes';
import { blocksRoutes } from './block/desktop/routes';
import { eventsRoutes } from './event/desktop/routes';
import { operationsRoutes } from './operation/desktop/routes';
import { transactionsRoutes } from './transaction/routes';

export const chainModuleRoutes: RouteRecordRaw[] = [
  ...addressesRoutes,
  ...blocksRoutes,
  ...eventsRoutes,
  ...operationsRoutes,
  ...transactionsRoutes,
];
