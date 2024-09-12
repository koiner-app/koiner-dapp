export interface UISchemaSearchViewOptions {
  [key: string]: string | boolean | number | Record<string, any>;
  counter: {
    item?: string;
    items?: string;
  };
  download: {
    csvTitle?: string;
  };
  noData: {
    image?: string;
    title?: string;
    subTitle?: string;
  };
  selection: {
    multiple?: boolean;
    path?: string;
    mergeWithRootSelection?: boolean;
  };
}

export interface SearchViewOptions {
  [key: string]: string | boolean | number | Record<string, any>;
  counter: {
    item: string;
    items: string;
  };
  download: {
    csvTitle?: string;
  };
  noData: {
    image?: string;
    title: string;
    subTitle: string;
  };
  selection: {
    multiple: boolean;
    path: string;
    mergeWithRootSelection: boolean;
  };
}

export const SearchViewOptionsDefaults = {
  counter: {
    item: 'appvise.jsonSearch.counter.item',
    items: 'appvise.jsonSearch.counter.items',
  },
  download: {
    csvTitle: 'tabel',
  },
  noData: {},
  selection: {
    multiple: true,
    path: 'root',
    mergeWithRootSelection: false,
  },
};
