import { Ref, ref } from 'vue';
import {
  Connection,
  CountableSearchProvider,
  Edge,
  Node,
  SearchRequestType,
  SearchState,
} from '@appvise/search-manager';

/**
 * Use RawDataProvider to supply a dataset directly without leveraging any API,
 * pagination, filtering or sorting.
 */
export class RawDataProvider<
  TRequest extends SearchRequestType,
  TNode extends Node,
  TEdge extends Edge<TNode>,
  TConnection extends Connection<TNode, TEdge>
> implements CountableSearchProvider<TRequest, TNode, TEdge, TConnection>
{
  public _state = SearchState.create<TRequest, TNode, TEdge, TConnection>();
  public _countState = SearchState.create<
    TRequest,
    TNode,
    TEdge,
    TConnection
  >();
  private initialConnection = ref();
  private _totalCount: Ref<number | undefined> = ref();

  constructor(initialConnection: TConnection) {
    // SearchManager will call RawDataProvider instance.search()
    // which will reset state. Afterwards we will state with
    // provided data from initialConnection.
    this.initialConnection.value = initialConnection;
    this._totalCount.value = initialConnection.totalCount;

    this._state.error = ref();
    this._state.fetching = ref(false);
    this._state.isPaused = ref(true);
  }

  public get state(): SearchState<TRequest, TNode, TEdge, TConnection> {
    return this._state;
  }

  public get totalCount(): Ref<number | undefined> {
    return this._totalCount;
  }

  public search(
    request: any
  ): Promise<SearchState<TRequest, TNode, TEdge, TConnection>> {
    this._state.request.value = request;

    // Load initial connection data
    this._state.connection.value = this.initialConnection.value;

    return new Promise((resolve) => {
      resolve(this._state);
    });
  }

  public reset(): void {
    this._state.reset();
    this._countState.reset();
  }
}
