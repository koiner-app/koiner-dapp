import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  ContractsConnection,
  Contract,
  ContractEdge,
  useContractsSearchQuery,
  QueryContractsArgs,
} from '@koiner/sdk';

export class ContractsSearchProvider
  implements
    SearchProvider<
      QueryContractsArgs,
      Contract,
      ContractEdge,
      ContractsConnection
    >
{
  public _state = SearchState.create<
    QueryContractsArgs,
    Contract,
    ContractEdge,
    ContractsConnection
  >();

  constructor() {
    const { data, fetching, error, isPaused } = useContractsSearchQuery({
      variables: this.state.request,
    });

    watch(data, (updatedData) => {
      this._state.connection.value =
        updatedData?.contracts as ContractsConnection;
    });

    this._state.error = error;
    this._state.fetching = fetching;
    this._state.isPaused = isPaused;
  }

  public get state(): SearchState<
    QueryContractsArgs,
    Contract,
    ContractEdge,
    ContractsConnection
  > {
    return this._state;
  }

  public search(
    request: QueryContractsArgs
  ): Promise<
    SearchState<QueryContractsArgs, Contract, ContractEdge, ContractsConnection>
  > {
    this._state.request.value = request;

    return new Promise((resolve) => {
      resolve(this._state);
    });
  }
}
