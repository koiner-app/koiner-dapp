import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  TokenContractsConnection,
  TokenContract,
  TokenContractEdge,
  useTokenContractsSearchQuery,
  QueryTokenContractsArgs,
} from '@koiner/sdk';
import { koinerConfig } from 'app/koiner.config';

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
      const newConnection =
        updatedData?.tokenContracts as TokenContractsConnection;

      // Exclude old VHP contract
      newConnection.edges = newConnection.edges.filter(
        (edge) => edge.node.id !== koinerConfig.production.contracts.oldVhp.id
      );

      this._state.connection.value = newConnection;
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
