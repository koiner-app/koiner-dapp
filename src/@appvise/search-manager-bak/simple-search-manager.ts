import { SearchManager } from './search-manager';
import { SearchResponse } from './model/search-response';
import { SearchRequest } from './model/search-request';
import { SearchProvider } from './search-provider';

export class SimpleSearchManager<T> extends SearchManager<T> {
  private _active = false;
  private _loading = false;
  private _pageCount = 0;
  private _request: SearchRequest | null = null;
  private _response: SearchResponse<T> | null = null;
  private _scrollPosition = 0;

  constructor(protected searchProvider: SearchProvider<T>) {
    super(searchProvider);
  }

  get isActive(): boolean {
    return this._active;
  }

  set isActive(active: boolean) {
    this._active = active;
  }

  get isLoading(): boolean {
    return this._loading;
  }

  set isLoading(loading: boolean) {
    this._loading = loading;
  }

  get pageCount(): number {
    return this._pageCount;
  }

  set pageCount(pageCount: number) {
    this._pageCount = pageCount;
  }

  get request(): SearchRequest | null {
    return this._request;
  }

  set request(request: SearchRequest | null) {
    this._request = request;
  }

  get response(): SearchResponse<T> | null {
    return this._response;
  }

  set response(response: SearchResponse<T> | null) {
    this._response = response;
  }

  get scrollPosition(): number {
    return this._scrollPosition;
  }

  set scrollPosition(position: number) {
    this._scrollPosition = position;
  }
}
