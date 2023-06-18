import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  TokenHoldersConnection,
  TokenHolder,
  TokenHolderEdge,
  useTokenHoldersSearchQuery,
  QueryTokenHoldersArgs,
} from '@koiner/sdk';
import { koinerConfig } from 'app/koiner.config';

export class TokenHoldersSearchProvider
  implements
    SearchProvider<
      QueryTokenHoldersArgs,
      TokenHolder,
      TokenHolderEdge,
      TokenHoldersConnection
    >
{
  public _state = SearchState.create<
    QueryTokenHoldersArgs,
    TokenHolder,
    TokenHolderEdge,
    TokenHoldersConnection
  >();

  constructor() {
    const { data, fetching, error, isPaused } = useTokenHoldersSearchQuery({
      variables: this.state.request,
    });

    watch(data, (updatedData) => {
      const newConnection = updatedData?.tokenHolders as TokenHoldersConnection;

      // Exclude old VHP contract
      newConnection.edges = newConnection.edges.filter(
        (edge) =>
          edge.node.contractId !== koinerConfig.production.contracts.oldVhp.id
      );

      this._state.connection.value = newConnection;
    });

    this._state.error = error;
    this._state.fetching = fetching;
    this._state.isPaused = isPaused;
  }

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
      resolve(this._state);
    });
  }
}
