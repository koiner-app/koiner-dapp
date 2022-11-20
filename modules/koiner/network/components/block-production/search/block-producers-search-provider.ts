import { watch } from 'vue';
import { SearchProvider, SearchState } from '@appvise/search-manager';
import {
  BlockProducersConnection,
  BlockProducer,
  BlockProducerEdge,
  useBlockProducersSearchQuery,
  QueryBlockProducersArgs,
} from '@koiner/sdk';

export class BlockProducersSearchProvider
  implements
    SearchProvider<
      QueryBlockProducersArgs,
      BlockProducer,
      BlockProducerEdge,
      BlockProducersConnection
    >
{
  public _state = SearchState.create<
    QueryBlockProducersArgs,
    BlockProducer,
    BlockProducerEdge,
    BlockProducersConnection
  >();

  constructor() {
    const { data, fetching, error, isPaused } = useBlockProducersSearchQuery({
      variables: this.state.request,
    });

    watch(data, (updatedData) => {
      this._state.connection.value =
        updatedData?.blockProducers as BlockProducersConnection;
    });

    this._state.error = error;
    this._state.fetching = fetching;
    this._state.isPaused = isPaused;
  }

  public get state(): SearchState<
    QueryBlockProducersArgs,
    BlockProducer,
    BlockProducerEdge,
    BlockProducersConnection
  > {
    return this._state;
  }

  public search(
    request: QueryBlockProducersArgs
  ): Promise<
    SearchState<
      QueryBlockProducersArgs,
      BlockProducer,
      BlockProducerEdge,
      BlockProducersConnection
    >
  > {
    this._state.request.value = request;

    return new Promise((resolve) => {
      resolve(this._state);
    });
  }
}
