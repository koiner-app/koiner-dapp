import { Filter } from './filter';
import { SortField } from './sort-field';

export interface SearchRequest {
  first: number;
  before?: string;
  after?: string;
  search?: string;
  filter?: Filter;
  sort?: SortField[];
}
