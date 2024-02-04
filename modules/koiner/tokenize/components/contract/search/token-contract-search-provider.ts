import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  QueryTokenContractsArgs,
  TokenContract,
  TokenContractEdge,
  TokenContractsConnection,
  useTokenContractsSearchQuery,
} from '@koiner/sdk';

export class TokenContractsSearchProvider
  implements
    SearchProvider<
      QueryTokenContractsArgs,
      TokenContract,
      TokenContractEdge,
      TokenContractsConnection
    >
{
  public _state = SearchState.create<
    QueryTokenContractsArgs,
    TokenContract,
    TokenContractEdge,
    TokenContractsConnection
  >();

  constructor() {
    const { data, fetching, error, isPaused } = useTokenContractsSearchQuery({
      variables: this.state.request,
      pause: true,
    });

    watch(data, (updatedData) => {
      this._state.connection.value =
        updatedData?.tokenContracts as TokenContractsConnection;
    });

    this._state.error = error;
    this._state.fetching = fetching;
    this._state.isPaused = isPaused;
  }

  public get state(): SearchState<
    QueryTokenContractsArgs,
    TokenContract,
    TokenContractEdge,
    TokenContractsConnection
  > {
    return this._state;
  }

  public search(
    request: QueryTokenContractsArgs
  ): Promise<
    SearchState<
      QueryTokenContractsArgs,
      TokenContract,
      TokenContractEdge,
      TokenContractsConnection
    >
  > {
    this._state.request.value = request;

    return new Promise((resolve) => {
      resolve(this._state);
    });
  }
}
