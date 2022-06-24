import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  BlocksConnection,
  Block,
  BlockEdge,
  useBlocksSearchQuery,
  QueryBlocksArgs,
} from '@koiner/sdk';

export class BlocksSearchProvider
  implements
    SearchProvider<QueryBlocksArgs, Block, BlockEdge, BlocksConnection>
{
  private loaded = false;
  public _state = SearchState.create<
    QueryBlocksArgs,
    Block,
    BlockEdge,
    BlocksConnection
  >();

  public get state(): SearchState<
    QueryBlocksArgs,
    Block,
    BlockEdge,
    BlocksConnection
  > {
    return this._state;
  }

  public search(
    request: QueryBlocksArgs
  ): Promise<SearchState<QueryBlocksArgs, Block, BlockEdge, BlocksConnection>> {
    this._state.request.value = request;

    return new Promise((resolve) => {
      if (!this.loaded) {
        const { data, fetching, error, isPaused } = useBlocksSearchQuery({
          variables: this.state.request,
        });

        watch(data, (updatedData) => {
          this._state.connection.value =
            updatedData?.blocks as BlocksConnection;
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
