import { Ref, watch } from 'vue';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  Connection,
  Edge,
  Node,
  SearchProvider,
  SearchRequestType,
  SearchState,
} from '.';

export class SearchManager<
  TRequest extends SearchRequestType,
  TNode extends Node,
  TEdge extends Edge<TNode>,
  TConnection extends Connection<TNode, TEdge>
> {
  protected subscription?: Subscription;

  get state(): SearchState<TRequest, TNode, TEdge, TConnection> {
    return this.searchProvider.state;
  }

  get request(): Ref<TRequest> {
    return this.state.request;
  }

  get fetching(): Ref<boolean> {
    return this.state.fetching;
  }

  get connection(): Ref<TConnection | undefined> {
    return this.searchProvider.state.connection;
  }

  constructor(
    protected searchProvider: SearchProvider<
      TRequest,
      TNode,
      TEdge,
      TConnection
    >
  ) {}

  async search(request: TRequest): Promise<void> {
    this.reset();

    await this.searchProvider.search({
      // Don't include before + after cursors for new searches
      first: request.first ?? 30, // TODO: Load default first from options?
      filter: request.filter,
      sort: request.sort,
    } as TRequest);

    // Workaround to reactivate urql to resume on a re-entering of page
    // TODO: Find out why this is necessary
    this.state.isPaused.value = true;
    this.state.isPaused.value = false;

    watch(
      () => request.filter,
      async () => {
        await this.searchProvider.search(request);
      },
      {
        deep: true,
      }
    );

    watch(
      () => request.sort,
      async () => {
        await this.searchProvider.search(request);
      },
      {
        deep: true,
      }
    );

    await this.subscribeToNewResults();
  }

  async loadMore(): Promise<void> {
    if (
      this.fetching.value ||
      !this.connection.value ||
      !this.connection.value.pageInfo?.hasNextPage ||
      !this.request
    ) {
      return;
    }

    const request = this.searchProvider.state.request.value;
    request.after = this.connection.value.pageInfo?.endCursor;

    await this.searchProvider.search(request);
  }

  saveScrollPosition(position: number): void {
    this.state.saveScrollPosition(position);
  }

  // async reset(): Promise<void> {
  //   await this.state.reset();
  reset(): void {
    this.state.reset();

    if (this.subscription) {
      console.log('Go reset SearchManager subscription');
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  // TODO: Integrate subscriptions
  async subscribeToNewResults(): Promise<void> {
    if (this.request && this.searchProvider.subscribe) {
      const observable = await this.searchProvider.subscribe(
        this.request.value
      );

      this.subscription = observable
        .pipe(
          finalize(async () => {
            console.log('Finalized SearchManager subscription');
          })
        )
        .subscribe({
          next: async (newResults: any) => {
            if (newResults != null) {
              // this.prependResponse(newResults);
            }
          },
          error: (err: any) => console.error(err),
          complete: () => console.log('Completed SearchManager subscription'),
        });
    }
  }
}
