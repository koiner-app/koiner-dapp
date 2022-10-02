import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  TokenEventsConnection,
  TokenEvent,
  TokenEventEdge,
  useTokenEventsSearchQuery,
  QueryTokenEventsArgs,
} from '@koiner/sdk';

export class TokenEventsSearchProvider
  implements
    SearchProvider<
      QueryTokenEventsArgs,
      TokenEvent,
      TokenEventEdge,
      TokenEventsConnection
    >
{
  private loaded = false;
  public _state = SearchState.create<
    QueryTokenEventsArgs,
    TokenEvent,
    TokenEventEdge,
    TokenEventsConnection
  >();

  public get state(): SearchState<
    QueryTokenEventsArgs,
    TokenEvent,
    TokenEventEdge,
    TokenEventsConnection
  > {
    return this._state;
  }

  public search(
    request: QueryTokenEventsArgs
  ): Promise<
    SearchState<
      QueryTokenEventsArgs,
      TokenEvent,
      TokenEventEdge,
      TokenEventsConnection
    >
  > {
    this._state.request.value = request;

    return new Promise((resolve) => {
      if (!this.loaded) {
        const { data, fetching, error, isPaused } = useTokenEventsSearchQuery({
          variables: this.state.request,
        });

        watch(data, (updatedData) => {
          this._state.connection.value =
            updatedData?.tokenEvents as TokenEventsConnection;
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
