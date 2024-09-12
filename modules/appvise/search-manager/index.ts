export * from './client';
export * from './model';
export { RawDataProvider } from './raw-data-provider';
export { SearchManager } from './search-manager';
export type { SearchProvider } from './search-provider';
export type { CountableSearchProvider } from './countable-search-provider';

export {
  install,
  provideSearchClient,
  useSearchClient,
  useSearchManager,
} from './use-search-client';

import { install } from './use-search-client';

export default install;
