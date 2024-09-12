import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  ContractEventsConnection,
  ContractEventEdge,
  ContractEvent,
  useContractEventsSearchQuery,
  QueryContractEventsArgs,
} from '@koiner/sdk';

export class ContractEventsSearchProvider
  implements
    SearchProvider<
      QueryContractEventsArgs,
      ContractEvent,
      ContractEventEdge,
      ContractEventsConnection
    >
{
  public _state = SearchState.create<
    QueryContractEventsArgs,
    ContractEvent,
    ContractEventEdge,
    ContractEventsConnection
  >();

  constructor() {
    const { data, fetching, error, isPaused } = useContractEventsSearchQuery({
      variables: this.state.request,
    });

    watch(data, (updatedData) => {
      this._state.connection.value =
        updatedData?.contractEvents as ContractEventsConnection;
    });

    this._state.error = error;
    this._state.fetching = fetching;
    this._state.isPaused = isPaused;
  }

  public get state(): SearchState<
    QueryContractEventsArgs,
    ContractEvent,
    ContractEventEdge,
    ContractEventsConnection
  > {
    return this._state;
  }

  public search(
    request: QueryContractEventsArgs
  ): Promise<
    SearchState<
      QueryContractEventsArgs,
      ContractEvent,
      ContractEventEdge,
      ContractEventsConnection
    >
  > {
    this._state.request.value = request;

    return new Promise((resolve) => {
      resolve(this._state);
    });
  }

  public reset(): void {
    this._state.reset();
  }
}
