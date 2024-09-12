export interface UISchemaSearchOptions {
  provider: string;
  valueField?: string;
  labelField?: string;
  itemsPerPage?: number;
  loadMoreThreshold?: number;
  minChars?: number;
  filterName?: string;
  autoSelectFirst?: boolean;
}

export interface SearchOptions {
  provider: string;
  mapping?: string;
  valueField: string;
  labelField: string;
  itemsPerPage: number;
  loadMoreThreshold: number;
  minChars: number;
  filterName: string;
  autoSelectFirst: boolean;
}

export const SearchOptionsDefaults = {
  valueField: 'node.id',
  labelField: 'node.name',
  itemsPerPage: 30,
  loadMoreThreshold: 2,
  minChars: 0,
  filterName: 'search',
  autoSelectFirst: false,
};
