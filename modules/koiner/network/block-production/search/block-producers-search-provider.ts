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
      const sortedConnection =
        updatedData?.blockProducers as BlockProducersConnection;

      sortedConnection.edges = sortedConnection.edges
        .filter((edge) => Number(edge.node.vhpBalance.balance) > 10000000000)
        .sort((a, b) => {
          const balanceA = Number(a.node.vhpBalance.balance);
          const balanceB = Number(b.node.vhpBalance.balance);

          if (balanceA > balanceB) {
            return -1;
          }

          if (balanceA < balanceB) {
            return 1;
          }

          return 0;
        });

      this._state.connection.value = sortedConnection;
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
