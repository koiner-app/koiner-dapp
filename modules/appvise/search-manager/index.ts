export * from './client';
export * from './model';
export { SearchManager } from './search-manager';
export type { SearchProvider } from './search-provider';

export {
  install,
  provideSearchClient,
  useSearchClient,
  useSearchManager,
} from './use-search-client';

import { install } from './use-search-client';

export default install;
