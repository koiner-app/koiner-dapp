import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  TokenContractsConnection,
  TokenContract,
  TokenContractEdge,
  useTokenContractsSearchQuery,
  QueryTokenContractsArgs,
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
  private loaded = false;
  public _state = SearchState.create<
    QueryTokenContractsArgs,
    TokenContract,
    TokenContractEdge,
    TokenContractsConnection
  >();

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
      if (!this.loaded) {
        const { data, fetching, error, isPaused } =
          useTokenContractsSearchQuery({
            variables: this.state.request,
          });

        watch(data, (updatedData) => {
          this._state.connection.value =
            updatedData?.tokenContracts as TokenContractsConnection;
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
