import { defineStore } from 'pinia';
import {
  AddressesSearchQueryVariables,
  BlocksSearchQueryVariables,
  ContractEventsSearchQueryVariables,
  ContractOperationsSearchQueryVariables,
  ContractsSearchQueryVariables,
  EventsSearchQueryVariables,
  OperationsSearchQueryVariables,
  TokenContractsSearchQueryVariables,
  TokenEventsSearchQueryVariables,
  TokenHoldersSearchQueryVariables,
  TokenOperationsSearchQueryVariables,
  TransactionsSearchQueryVariables,
} from '@koiner/sdk';

export interface SearchStoreEntry<RequestType> {
  position: number;
  request: RequestType;
}
export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    loaded: false,

    // Chain
    addresses: {
      position: 0,
      request: {},
    } as SearchStoreEntry<AddressesSearchQueryVariables>,
    blocks: {
      position: 0,
      request: {},
    } as SearchStoreEntry<BlocksSearchQueryVariables>,
    events: {
      position: 0,
      request: {},
    } as SearchStoreEntry<EventsSearchQueryVariables>,
    transactions: {
      position: 0,
      request: {},
    } as SearchStoreEntry<TransactionsSearchQueryVariables>,
    operations: {
      position: 0,
      request: {
        filter: {
          OR: [
            { type: { equals: 'systemCall' } },
            { type: { equals: 'systemContract' } },
            { type: { equals: 'uploadContract' } },
          ],
        },
      },
    } as SearchStoreEntry<OperationsSearchQueryVariables>,

    // Contracts
    contracts: {
      position: 0,
      request: {},
    } as SearchStoreEntry<ContractsSearchQueryVariables>,
    contractEvents: {
      position: 0,
      request: {},
    } as SearchStoreEntry<ContractEventsSearchQueryVariables>,
    contractOperations: {
      position: 0,
      request: {},
    } as SearchStoreEntry<ContractOperationsSearchQueryVariables>,
    tokenHolders: {
      position: 0,
      request: {},
    } as SearchStoreEntry<TokenHoldersSearchQueryVariables>,
    tokenContracts: {
      position: 0,
      request: {},
    } as SearchStoreEntry<TokenContractsSearchQueryVariables>,
    tokenEvents: {
      position: 0,
      request: {},
    } as SearchStoreEntry<TokenEventsSearchQueryVariables>,
    tokenOperations: {
      position: 0,
      request: {},
    } as SearchStoreEntry<TokenOperationsSearchQueryVariables>,
  }),
});
