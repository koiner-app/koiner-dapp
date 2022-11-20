import { CombinedError } from '@urql/core';
import {
  Connection,
  Edge,
  Node,
  SearchRequestType,
} from '@appvise/search-manager';
import { ref, Ref } from 'vue';

export class SearchState<
  TRequest extends SearchRequestType,
  TNode extends Node,
  TEdge extends Edge<TNode>,
  TConnection extends Connection<TNode, TEdge>
> {
  public request: Ref<TRequest>;
  public connection: Ref<TConnection | undefined>;
  public error: Ref<CombinedError | undefined>;
  public fetching: Ref<boolean>;
  public isPaused: Ref<boolean>;
  public scrollPosition: Ref<number>;

  constructor(props: {
    request: Ref<TRequest>;
    connection: Ref<TConnection | undefined>;
    error: Ref<CombinedError | undefined>;
    fetching: Ref<boolean>;
    isPaused: Ref<boolean>;
    scrollPosition: Ref<number>;
  }) {
    this.request = props.request;
    this.connection = props.connection;
    this.error = props.error;
    this.fetching = props.fetching;
    this.isPaused = props.isPaused;
    this.scrollPosition = props.scrollPosition;
  }

  static create<
    TRequest extends SearchRequestType,
    TNode extends Node,
    TEdge extends Edge<TNode>,
    TConnection extends Connection<TNode, TEdge>
  >(): SearchState<TRequest, TNode, TEdge, TConnection> {
    return new SearchState<TRequest, TNode, TEdge, TConnection>({
      request: ref({} as any),
      connection: ref(),
      error: ref(),
      fetching: ref(false),
      isPaused: ref(false),
      scrollPosition: ref(0),
    });
  }

  public reset(): void {
    this.request.value = {} as any;
    this.connection.value = undefined;
    this.error.value = undefined;
    this.fetching.value = false;
    this.isPaused.value = false;
    this.scrollPosition.value = 0;
  }

  public saveScrollPosition(position: number): void {
    this.scrollPosition.value = position;
  }
}
