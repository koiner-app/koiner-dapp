import { SearchRequest } from './model/search-request';
import { SearchResponse } from './model/search-response';
import { Observable } from 'rxjs';

export interface SearchProvider<T> {
  search(request: SearchRequest): Promise<SearchResponse<T>>;
  subscribe?(request: SearchRequest): Promise<Observable<SearchResponse<T>>>;
}
