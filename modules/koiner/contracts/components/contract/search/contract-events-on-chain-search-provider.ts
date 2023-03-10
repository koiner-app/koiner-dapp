import { ref } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  ContractEventsConnection,
  ContractEventEdge,
  ContractEvent,
  QueryContractEventsArgs,
} from '@koiner/sdk';
import { useOnChainStore } from '@koiner/onchain';

export class ContractEventsOnChainSearchProvider
  implements
    SearchProvider<
      QueryContractEventsArgs,
      ContractEvent,
      ContractEventEdge,
      ContractEventsConnection
    >
{
  public _state = SearchState.create<
    QueryContractEventsArgs,
    ContractEvent,
    ContractEventEdge,
    ContractEventsConnection
  >();

  constructor() {
    this._state.error = ref();
    this._state.fetching = ref(false);
    this._state.isPaused = ref(false);
  }

  public get state(): SearchState<
    QueryContractEventsArgs,
    ContractEvent,
    ContractEventEdge,
    ContractEventsConnection
  > {
    return this._state;
  }

  public search(
    request: QueryContractEventsArgs
  ): Promise<
    SearchState<
      QueryContractEventsArgs,
      ContractEvent,
      ContractEventEdge,
      ContractEventsConnection
    >
  > {
    this._state.request.value = request;

    return new Promise((resolve) => {
      if (this._state.isPaused.value) {
        resolve(this._state);
      }

      let parentId;

      request.filter?.AND?.forEach((filter) => {
        if (filter.parentId?.equals) {
          parentId = filter.parentId?.equals;
        }
      });

      if (parentId) {
        const onChainStore = useOnChainStore();

        const contractEvents =
          onChainStore.contractEventsByTransaction(parentId);

        if (contractEvents) {
          this._state.connection.value = contractEvents;
          this._state.isPaused.value = true;
        }
      }

      resolve(this._state);
    });
  }
}
