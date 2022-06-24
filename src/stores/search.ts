import { defineStore } from 'pinia';
import { SearchRequestType } from '@appvise/search-manager';

export interface SearchStoreEntry {
  position: number;
  request: SearchRequestType;
}
export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    blocks: {
      position: 0,
      request: {},
    } as SearchStoreEntry,
  }),
});
