import { ref } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  TokenEventsConnection,
  TokenEvent,
  TokenEventEdge,
  QueryTokenEventsArgs,
} from '@koiner/sdk';
import { useOnChainStore } from '@koiner/onchain';

export class TokenEventsOnChainSearchProvider
  implements
    SearchProvider<
      QueryTokenEventsArgs,
      TokenEvent,
      TokenEventEdge,
      TokenEventsConnection
    >
{
  public _state = SearchState.create<
    QueryTokenEventsArgs,
    TokenEvent,
    TokenEventEdge,
    TokenEventsConnection
  >();

  constructor() {
    this._state.error = ref();
    this._state.fetching = ref(false);
    this._state.isPaused = ref(false);
  }

  public get state(): SearchState<
    QueryTokenEventsArgs,
    TokenEvent,
    TokenEventEdge,
    TokenEventsConnection
  > {
    return this._state;
  }

  public search(
    request: QueryTokenEventsArgs
  ): Promise<
    SearchState<
      QueryTokenEventsArgs,
      TokenEvent,
      TokenEventEdge,
      TokenEventsConnection
    >
  > {
    this._state.request.value = request;

    return new Promise((resolve) => {
      if (this._state.isPaused.value) {
        resolve(this._state);
      }

      let transactionId;

      request.filter?.AND?.forEach((filter) => {
        if (filter.parentId?.equals) {
          transactionId = filter.parentId?.equals;
        }
      });

      if (transactionId) {
        const onChainStore = useOnChainStore();

        const tokenEvents =
          onChainStore.tokenEventsByTransaction(transactionId);

        if (tokenEvents) {
          this._state.connection.value = tokenEvents;
          this._state.isPaused.value = true;
        }
      }

      resolve(this._state);
    });
  }

  public reset(): void {
    this._state.reset();
  }
}
