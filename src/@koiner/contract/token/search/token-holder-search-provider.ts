import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  TokenHoldersConnection,
  TokenHolder,
  TokenHolderEdge,
  useTokenHoldersSearchQuery,
  QueryTokenHoldersArgs,
} from '@koiner/sdk';

export class TokenHoldersSearchProvider
  implements
    SearchProvider<
      QueryTokenHoldersArgs,
      TokenHolder,
      TokenHolderEdge,
      TokenHoldersConnection
    >
{
  private loaded = false;
  public _state = SearchState.create<
    QueryTokenHoldersArgs,
    TokenHolder,
    TokenHolderEdge,
    TokenHoldersConnection
  >();

  public get state(): SearchState<
    QueryTokenHoldersArgs,
    TokenHolder,
    TokenHolderEdge,
    TokenHoldersConnection
  > {
    return this._state;
  }

  public search(
    request: QueryTokenHoldersArgs
  ): Promise<
    SearchState<
      QueryTokenHoldersArgs,
      TokenHolder,
      TokenHolderEdge,
      TokenHoldersConnection
    >
  > {
    this._state.request.value = request;

    return new Promise((resolve) => {
      if (!this.loaded) {
        const { data, fetching, error, isPaused } = useTokenHoldersSearchQuery({
          variables: this.state.request,
        });

        watch(data, (updatedData) => {
          this._state.connection.value =
            updatedData?.tokenHolders as TokenHoldersConnection;
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
