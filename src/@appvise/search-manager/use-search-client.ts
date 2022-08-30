import { App, getCurrentInstance, inject, provide, Ref, isRef, ref } from 'vue';
import {
  Connection,
  Edge,
  Node,
  SearchClient,
  SearchClientOptions,
  SearchManager,
  SearchRequestType,
} from '.';

export function provideSearchClient(
  opts: SearchClientOptions | SearchClient | Ref<SearchClient>
) {
  let client: Ref<SearchClient>;

  if (!isRef(opts)) {
    client = ref(opts instanceof SearchClient ? opts : new SearchClient(opts));
  } else {
    client = opts;
  }

  provide('$search', client);

  return client.value;
}

export function install(
  app: App,
  opts: SearchClientOptions | SearchClient | Ref<SearchClient>
) {
  let client: Ref<SearchClient>;

  if (!isRef(opts)) {
    client = ref(opts instanceof SearchClient ? opts : new SearchClient(opts));
  } else {
    client = opts;
  }

  app.provide('$search', client);
}

export function useSearchClient(): Ref<SearchClient> {
  if (process.env.NODE_ENV !== 'production' && !getCurrentInstance()) {
    throw new Error(
      'use* functions may only be called during the `setup()` or other lifecycle hooks.'
    );
  }

  const client = inject('$search') as Ref<SearchClient>;

  if (process.env.NODE_ENV !== 'production' && !client) {
    throw new Error(
      'No search SearchClient was provided. Did you forget to install the plugin or call `provideSearchClient` in a parent?'
    );
  }

  return client;
}

export function useSearchManager<
  TRequest extends SearchRequestType,
  TNode extends Node,
  TEdge extends Edge<TNode>,
  TConnection extends Connection<TNode, TEdge>
>(provider: string): SearchManager<TRequest, TNode, TEdge, TConnection> {
  const client = useSearchClient();

  return client.value.getSearchManager(provider);
}
