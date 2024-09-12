import { Connection, Edge, Node, SearchRequestType, SearchState } from '.';
import { Observable } from 'rxjs';
import { Ref } from 'vue';

export interface CountableSearchProvider<
  TRequest extends SearchRequestType,
  TNode extends Node,
  TEdge extends Edge<TNode>,
  TConnection extends Connection<TNode, TEdge>
> {
  search(
    request: TRequest
  ): Promise<SearchState<TRequest, TNode, TEdge, TConnection>>;
  subscribe?(request: TRequest): Promise<Observable<TConnection>>;
  reset(): void;
  get state(): SearchState<TRequest, TNode, TEdge, TConnection>;
  get totalCount(): Ref<number | undefined>;
}
