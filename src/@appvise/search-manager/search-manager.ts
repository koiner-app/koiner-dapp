import { SearchRequest } from './model/search-request';
import { SearchResponse } from './model/search-response';
import { SearchProvider } from './search-provider';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export abstract class SearchManager<T> {
  abstract get isActive(): boolean;
  abstract get isLoading(): boolean;
  abstract get pageCount(): number;
  abstract get request(): SearchRequest | null;
  abstract get response(): SearchResponse<T> | null;
  abstract get scrollPosition(): number;

  abstract set isActive(active: boolean);
  abstract set isLoading(loading: boolean);
  abstract set pageCount(count: number);
  abstract set scrollPosition(position: number);
  abstract set request(request: SearchRequest | null);
  abstract set response(response: SearchResponse<T> | null);

  private subscription?: Subscription;

  protected constructor(protected searchProvider: SearchProvider<T>) {}

  appendResponse(response: SearchResponse<T>): void {
    if (this.response !== null) {
      // Don't update on setter directly
      const responseFromState = SearchResponse.clone(this.response);
      responseFromState.append(response);
      this.response = responseFromState;
    } else {
      this.response = response;
    }

    // Update after cursor is there is a next page
    if (this.response.pageInfo.hasNextPage) {
      // Don't update on setter directly
      const requestFromStage = Object.assign({}, this.request);
      requestFromStage.after = this.response.pageInfo.endCursor;
      this.request = requestFromStage;
    }

    this.pageCount = this.pageCount + 1;
  }

  prependResponse(response: SearchResponse<T>): void {
    if (this.response !== null) {
      // Don't update on setter directly
      const responseFromState = SearchResponse.clone(this.response);
      responseFromState.prepend(response);
      this.response = responseFromState;
    } else {
      this.response = response;
    }

    // Update before cursor is there is a previous page
    if (this.response.pageInfo.hasPreviousPage) {
      // Don't update on setter directly
      const requestFromStage = Object.assign({}, this.request);
      requestFromStage.before = this.response.pageInfo.startCursor;
      this.request = requestFromStage;
    }
  }

  search(request: SearchRequest): void {
    this.reset();

    // Make sure before + after are reset so first results are retrieved
    request.before = undefined;
    request.after = undefined;

    this.request = request;
    this.isActive = true;

    this.searchProvider.search(request).then(async (response) => {
      this.appendResponse(response);

      // Subscribe to new results if subscriptions are provided
      await this.subscribeToNewResults();
    });
  }

  loadMoreResults(): void {
    // TODO test/improve these checks
    if (
      // this.loading ||
      this.response === null ||
      !this.response.pageInfo.hasNextPage
    ) {
      return;
    }

    if (this.isLoading || this.request == null) {
      return;
    }

    this.isLoading = true;

    this.searchProvider.search(this.request).then((response) => {
      this.appendResponse(response);

      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }

  loadNewResults(): void {
    if (this.isLoading || this.request == null || this.response == null) {
      return;
    }

    this.isLoading = true;

    const args = this.request;
    args.after = undefined;

    if (this.response.results.length > 0) {
      // Use first edge cursor as before cursor
      args.before = this.response.results[0].cursor;
    }

    this.searchProvider.search(this.request).then((response) => {
      this.prependResponse(response);

      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }

  async subscribeToNewResults(): Promise<void> {
    if (this.request && this.searchProvider.subscribe) {
      const observable = await this.searchProvider.subscribe(this.request);

      this.subscription = observable
        .pipe(
          finalize(async () => {
            console.log('Finalized SearchManager subscription');
          })
        )
        .subscribe({
          next: async (newResults: any) => {
            if (newResults != null) {
              this.prependResponse(newResults);
            }
          },
          error: (err: any) => console.error(err),
          complete: () => console.log('Completed SearchManager subscription'),
        });
    }
  }

  removeItem(item: T, matchingKey: 'id'): void {
    if (this.response !== null) {
      // Don't update on setter directly
      const responseFromState = SearchResponse.clone(this.response);

      // Remove item
      // TODO: FIX
      // responseFromState.results = responseFromState.results.filter(
      //   (result) => result.item[matchingKey] !== item[matchingKey],
      // );

      this.response = responseFromState;
    }
  }

  get hasItems(): boolean {
    return this.response != null && this.response.results.length > 0;
  }

  reset(): void {
    this.response = null;
    this.isActive = false;
    this.pageCount = 0;
    this.scrollPosition = 0;
    this.request = null;

    if (this.subscription) {
      console.log('Go reset SearchManager subscription');
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
