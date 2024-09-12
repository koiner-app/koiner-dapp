import { ref } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  TokenOperationsConnection,
  TokenOperation,
  TokenOperationEdge,
  QueryTokenOperationsArgs,
} from '@koiner/sdk';
import { useOnChainStore } from '@koiner/onchain';

export class TokenOperationsOnChainSearchProvider
  implements
    SearchProvider<
      QueryTokenOperationsArgs,
      TokenOperation,
      TokenOperationEdge,
      TokenOperationsConnection
    >
{
  public _state = SearchState.create<
    QueryTokenOperationsArgs,
    TokenOperation,
    TokenOperationEdge,
    TokenOperationsConnection
  >();

  constructor() {
    this._state.error = ref();
    this._state.fetching = ref(false);
    this._state.isPaused = ref(false);
  }

  public get state(): SearchState<
    QueryTokenOperationsArgs,
    TokenOperation,
    TokenOperationEdge,
    TokenOperationsConnection
  > {
    return this._state;
  }

  public search(
    request: QueryTokenOperationsArgs
  ): Promise<
    SearchState<
      QueryTokenOperationsArgs,
      TokenOperation,
      TokenOperationEdge,
      TokenOperationsConnection
    >
  > {
    this._state.request.value = request;

    return new Promise(async (resolve) => {
      if (this._state.isPaused.value) {
        resolve(this._state);
      }

      let transactionId;

      request.filter?.AND?.forEach((filter) => {
        if (
          filter.OR &&
          filter.OR.length > 0 &&
          filter.OR[0].transactionId?.equals
        ) {
          transactionId = filter.OR[0].transactionId?.equals;
        }
      });

      if (transactionId) {
        const onChainStore = useOnChainStore();

        const tokenOperations =
          onChainStore.tokenOperationsByTransaction(transactionId);

        if (tokenOperations) {
          this._state.connection.value = tokenOperations;
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
