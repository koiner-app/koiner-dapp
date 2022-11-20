export interface UISchemaSearchOptions {
  provider: string;
  valueField?: string;
  labelField?: string;
  itemsPerPage?: number;
  loadMoreThreshold?: number;
  minChars?: number;
  filterName?: string;
}

export interface SearchOptions {
  provider: string;
  valueField: string;
  labelField: string;
  itemsPerPage: number;
  loadMoreThreshold: number;
  minChars: number;
  filterName: string;
}

export const SearchOptionsDefaults = {
  valueField: 'id',
  labelField: 'name',
  itemsPerPage: 30,
  loadMoreThreshold: 2,
  minChars: 0,
  filterName: 'search',
};
