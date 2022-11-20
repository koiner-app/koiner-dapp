import { SearchProvider } from '@appvise/search-manager/search-provider';
import {
  Connection,
  Edge,
  Node,
  SearchManager,
  SearchRequestType,
} from '@appvise/search-manager';

/** Options for configuring the SearchClient [client]{@link SearchClient}. */
export interface SearchClientOptions {
  /** An array of SearchProviders. */
  providers: Record<string, new () => SearchProvider<any, any, any, any>>;
}

export interface SearchClient {
  // TODO: How should we handle this?
  // eslint-disable-next-line @typescript-eslint/no-misused-new
  new (options: SearchClientOptions): SearchClient;

  getSearchManager<
    TRequest extends SearchRequestType,
    TNode extends Node,
    TEdge extends Edge<TNode>,
    TConnection extends Connection<TNode, TEdge>
  >(
    provider: string
  ): SearchManager<TRequest, TNode, TEdge, TConnection>;
}

export const SearchClient: new (opts: SearchClientOptions) => SearchClient =
  function SearchClient(
    this: SearchClient | Record<string, unknown>,
    opts: SearchClientOptions
  ) {
    if (process.env.NODE_ENV !== 'production' && !opts.providers) {
      throw new Error('You are creating an search-client without providers.');
    }

    const instance: SearchClient =
      this instanceof SearchClient
        ? this
        : Object.create(SearchClient.prototype);

    return Object.assign(instance, {
      getSearchManager<
        TRequest extends SearchRequestType,
        TNode extends Node,
        TEdge extends Edge<TNode>,
        TConnection extends Connection<TNode, TEdge>
      >(provider: string): SearchManager<TRequest, TNode, TEdge, TConnection> {
        if (!opts.providers[provider]) {
          throw new Error('Provider not defined');
        }

        return new SearchManager<TRequest, TNode, TEdge, TConnection>(
          new opts.providers[provider]()
        );
      },
    } as SearchClient);
  } as any;

export const createSearchClient = SearchClient as any as (
  opts: SearchClientOptions
) => SearchClient;
