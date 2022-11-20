import {
  Connection,
  Edge,
  Node,
  SearchRequestType,
  SearchState,
} from './index';
import { Observable } from 'rxjs';

export interface SearchProvider<
  TRequest extends SearchRequestType,
  TNode extends Node,
  TEdge extends Edge<TNode>,
  TConnection extends Connection<TNode, TEdge>
> {
  search(
    request: TRequest
  ): Promise<SearchState<TRequest, TNode, TEdge, TConnection>>;
  subscribe?(request: TRequest): Promise<Observable<TConnection>>;
  get state(): SearchState<TRequest, TNode, TEdge, TConnection>;
}
