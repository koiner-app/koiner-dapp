import { RouteRecordRaw } from 'vue-router';
import { tokenContractRoutes } from './token-routes';
import { tokensContractRoutes } from './tokens-routes';

export const tokenizeModuleRoutes: RouteRecordRaw[] = [
  ...tokenContractRoutes,
  ...tokensContractRoutes,
];
