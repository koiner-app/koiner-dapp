import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  TokenBalancesConnection,
  TokenBalance,
  TokenBalanceEdge,
  useTokenBalancesSearchQuery,
  QueryTokenBalancesArgs,
} from '@koiner/sdk';

export class TokenBalancesSearchProvider
  implements
    SearchProvider<
      QueryTokenBalancesArgs,
      TokenBalance,
      TokenBalanceEdge,
      TokenBalancesConnection
    >
{
  private loaded = false;
  public _state = SearchState.create<
    QueryTokenBalancesArgs,
    TokenBalance,
    TokenBalanceEdge,
    TokenBalancesConnection
  >();

  public get state(): SearchState<
    QueryTokenBalancesArgs,
    TokenBalance,
    TokenBalanceEdge,
    TokenBalancesConnection
  > {
    return this._state;
  }

  public search(
    request: QueryTokenBalancesArgs
  ): Promise<
    SearchState<
      QueryTokenBalancesArgs,
      TokenBalance,
      TokenBalanceEdge,
      TokenBalancesConnection
    >
  > {
    this._state.request.value = request;

    return new Promise((resolve) => {
      if (!this.loaded) {
        const { data, fetching, error, isPaused } = useTokenBalancesSearchQuery(
          {
            variables: this.state.request,
          }
        );

        watch(data, (updatedData) => {
          this._state.connection.value =
            updatedData?.tokenBalances as TokenBalancesConnection;
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
