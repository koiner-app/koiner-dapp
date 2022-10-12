import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  TransactionsConnection,
  Transaction,
  TransactionEdge,
  useTransactionsSearchQuery,
  QueryTransactionsArgs,
} from '@koiner/sdk';

export class TransactionsSearchProvider
  implements
    SearchProvider<
      QueryTransactionsArgs,
      Transaction,
      TransactionEdge,
      TransactionsConnection
    >
{
  private loaded = false;
  public _state = SearchState.create<
    QueryTransactionsArgs,
    Transaction,
    TransactionEdge,
    TransactionsConnection
  >();

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

    return new Promise((resolve) => {
      if (!this.loaded) {
        const { data, fetching, error, isPaused } = useTransactionsSearchQuery({
          variables: this.state.request,
        });

        watch(data, (updatedData) => {
          this._state.connection.value =
            updatedData?.transactions as TransactionsConnection;
        });

        this._state.error = error;
        this._state.fetching = fetching;
        this._state.isPaused = isPaused;

        this.loaded = true;

        resolve(this._state);
      }

      resolve(this._state);
    });
  }
}
