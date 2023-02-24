import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  EventsConnection,
  Event,
  EventEdge,
  useEventsSearchQuery,
  QueryEventsArgs,
} from '@koiner/sdk';

export class EventsSearchProvider
  implements
    SearchProvider<QueryEventsArgs, Event, EventEdge, EventsConnection>
{
  public _state = SearchState.create<
    QueryEventsArgs,
    Event,
    EventEdge,
    EventsConnection
  >();

  constructor() {
    const { data, fetching, error, isPaused } = useEventsSearchQuery({
      variables: this.state.request,
    });

    watch(data, (updatedData) => {
      this._state.connection.value = updatedData?.events as EventsConnection;
    });

    this._state.error = error;
    this._state.fetching = fetching;
    this._state.isPaused = isPaused;
  }

  public get state(): SearchState<
    QueryEventsArgs,
    Event,
    EventEdge,
    EventsConnection
  > {
    return this._state;
  }

  public search(
    request: QueryEventsArgs
  ): Promise<SearchState<QueryEventsArgs, Event, EventEdge, EventsConnection>> {
    this._state.request.value = request;

    return new Promise((resolve) => {
      resolve(this._state);
    });
  }
}
