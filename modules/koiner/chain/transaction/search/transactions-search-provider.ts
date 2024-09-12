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
  public _state = SearchState.create<
    QueryTransactionsArgs,
    Transaction,
    TransactionEdge,
    TransactionsConnection
  >();

  constructor() {
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

    return new Promise((resolve) => {
      resolve(this._state);
    });
  }

  public reset(): void {
    this._state.reset();
  }
}
