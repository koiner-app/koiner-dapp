import { RouteRecordRaw } from 'vue-router';
import { addressesRoutes } from './addresses-routes';
import { blocksRoutes } from './blocks-routes';
import { eventsRoutes } from './events-routes';
import { operationsRoutes } from './operations-routes';
import { transactionsRoutes } from './transactions-routes';

export const chainModuleRoutes: RouteRecordRaw[] = [
  ...addressesRoutes,
  ...blocksRoutes,
  ...eventsRoutes,
  ...operationsRoutes,
  ...transactionsRoutes,
];
