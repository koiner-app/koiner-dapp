import { ref } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  TransactionsConnection,
  Transaction,
  TransactionEdge,
  QueryTransactionsArgs,
} from '@koiner/sdk';
import { useOnChainStore } from '@koiner/onchain';

export class TransactionsOnChainSearchProvider
  implements
    SearchProvider<
      QueryTransactionsArgs,
      Transaction,
      TransactionEdge,
      TransactionsConnection
    >
{
  public _state = SearchState.create<
    QueryTransactionsArgs,
    Transaction,
    TransactionEdge,
    TransactionsConnection
  >();

  constructor() {
    this._state.error = ref();
    this._state.fetching = ref(false);
    this._state.isPaused = ref(false);
  }

  public get state(): SearchState<
    QueryTransactionsArgs,
    Transaction,
    TransactionEdge,
    TransactionsConnection
  > {
    return this._state;
  }

  public search(
    request: QueryTransactionsArgs
  ): Promise<
    SearchState<
      QueryTransactionsArgs,
      Transaction,
      TransactionEdge,
      TransactionsConnection
    >
  > {
    this._state.request.value = request;

    return new Promise(async (resolve) => {
      if (this._state.isPaused.value) {
        resolve(this._state);
      }

      let blockHeight;

      request.filter?.AND?.forEach((filter) => {
        if (
          filter.OR &&
          filter.OR.length > 0 &&
          filter.OR[0].blockHeight?.equals
        ) {
          blockHeight = filter.OR[0].blockHeight?.equals;
        }
      });

      if (blockHeight) {
        const onChainStore = useOnChainStore();

        const transactions =
          onChainStore.blockTransactionsByHeight(blockHeight);

        if (transactions) {
          this._state.connection.value = transactions;
          this._state.isPaused.value = true;
        }
      }

      resolve(this._state);
    });
  }
}
