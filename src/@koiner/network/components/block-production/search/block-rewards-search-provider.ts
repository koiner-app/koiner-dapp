import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  BlockRewardsConnection,
  BlockReward,
  BlockRewardEdge,
  useBlockRewardsSearchQuery,
  QueryBlockRewardsArgs,
} from '@koiner/sdk';

export class BlockRewardsSearchProvider
  implements
    SearchProvider<
      QueryBlockRewardsArgs,
      BlockReward,
      BlockRewardEdge,
      BlockRewardsConnection
    >
{
  private loaded = false;
  public _state = SearchState.create<
    QueryBlockRewardsArgs,
    BlockReward,
    BlockRewardEdge,
    BlockRewardsConnection
  >();

  public get state(): SearchState<
    QueryBlockRewardsArgs,
    BlockReward,
    BlockRewardEdge,
    BlockRewardsConnection
  > {
    return this._state;
  }

  public search(
    request: QueryBlockRewardsArgs
  ): Promise<
    SearchState<
      QueryBlockRewardsArgs,
      BlockReward,
      BlockRewardEdge,
      BlockRewardsConnection
    >
  > {
    this._state.request.value = request;

    return new Promise((resolve) => {
      if (!this.loaded) {
        const { data, fetching, error, isPaused } = useBlockRewardsSearchQuery({
          variables: this.state.request,
        });

        watch(data, (updatedData) => {
          this._state.connection.value =
            updatedData?.blockRewards as BlockRewardsConnection;
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
