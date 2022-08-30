import { defineStore } from 'pinia';
import { SearchRequestType } from '@appvise/search-manager';

export interface SearchStoreEntry {
  position: number;
  request: SearchRequestType;
}
export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    // Chain
    addresses: {
      position: 0,
      request: {},
    } as SearchStoreEntry,
    blocks: {
      position: 0,
      request: {},
    } as SearchStoreEntry,
    events: {
      position: 0,
      request: {},
    } as SearchStoreEntry,
    transactions: {
      position: 0,
      request: {},
    } as SearchStoreEntry,
    operations: {
      position: 0,
      request: {},
    } as SearchStoreEntry,

    // Contracts
    contracts: {
      position: 0,
      request: {},
    } as SearchStoreEntry,
    contractOperations: {
      position: 0,
      request: {},
    } as SearchStoreEntry,
    tokenBalances: {
      position: 0,
      request: {},
    } as SearchStoreEntry,
    tokenContracts: {
      position: 0,
      request: {},
    } as SearchStoreEntry,
    tokenOperations: {
      position: 0,
      request: {},
    } as SearchStoreEntry,
  }),
});
