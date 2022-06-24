import { PageInfo } from './page-info';
import { SearchResult } from './search-result';

export class SearchResponse<T> {
  constructor(
    public results: SearchResult<T>[],
    public pageInfo: PageInfo,
    public totalCount?: number
  ) {}

  static clone<T>(response: SearchResponse<T>): SearchResponse<T> {
    return new SearchResponse(
      response.results,
      response.pageInfo,
      response.totalCount
    );
  }

  append(response: SearchResponse<T>): void {
    this.results = [...this.results, ...response.results];
    this.pageInfo = response.pageInfo;
    this.totalCount = response.totalCount;
  }

  prepend(response: SearchResponse<T>): void {
    this.results = [...response.results, ...this.results];
    this.pageInfo = response.pageInfo;
    this.totalCount = response.totalCount;
  }
}
