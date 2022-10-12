import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  ContractOperationsConnection,
  ContractOperationEdge,
  ContractOperationWithDetails,
  useContractOperationsSearchQuery,
  QueryContractOperationsArgs,
} from '@koiner/sdk';

export class ContractOperationsSearchProvider
  implements
    SearchProvider<
      QueryContractOperationsArgs,
      ContractOperationWithDetails,
      ContractOperationEdge,
      ContractOperationsConnection
    >
{
  private loaded = false;
  public _state = SearchState.create<
    QueryContractOperationsArgs,
    ContractOperationWithDetails,
    ContractOperationEdge,
    ContractOperationsConnection
  >();

  public get state(): SearchState<
    QueryContractOperationsArgs,
    ContractOperationWithDetails,
    ContractOperationEdge,
    ContractOperationsConnection
  > {
    return this._state;
  }

  public search(
    request: QueryContractOperationsArgs
  ): Promise<
    SearchState<
      QueryContractOperationsArgs,
      ContractOperationWithDetails,
      ContractOperationEdge,
      ContractOperationsConnection
    >
  > {
    this._state.request.value = request;

    return new Promise((resolve) => {
      if (!this.loaded) {
        const { data, fetching, error, isPaused } =
          useContractOperationsSearchQuery({
            variables: this.state.request,
          });

        watch(data, (updatedData) => {
          this._state.connection.value =
            updatedData?.contractOperations as ContractOperationsConnection;
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
