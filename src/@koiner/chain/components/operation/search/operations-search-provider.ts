import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  OperationsConnection,
  Operation,
  OperationEdge,
  useOperationsSearchQuery,
  QueryOperationsArgs,
} from '@koiner/sdk';

export class OperationsSearchProvider
  implements
    SearchProvider<
      QueryOperationsArgs,
      Operation,
      OperationEdge,
      OperationsConnection
    >
{
  public _state = SearchState.create<
    QueryOperationsArgs,
    Operation,
    OperationEdge,
    OperationsConnection
  >();

  constructor() {
    const { data, fetching, error, isPaused } = useOperationsSearchQuery({
      variables: this.state.request,
    });

    watch(data, (updatedData) => {
      this._state.connection.value =
        updatedData?.operations as OperationsConnection;
    });

    this._state.error = error;
    this._state.fetching = fetching;
    this._state.isPaused = isPaused;
  }

  public get state(): SearchState<
    QueryOperationsArgs,
    Operation,
    OperationEdge,
    OperationsConnection
  > {
    return this._state;
  }

  public search(
    request: QueryOperationsArgs
  ): Promise<
    SearchState<
      QueryOperationsArgs,
      Operation,
      OperationEdge,
      OperationsConnection
    >
  > {
    this._state.request.value = request;

    return new Promise((resolve) => {
      resolve(this._state);
    });
  }
}
