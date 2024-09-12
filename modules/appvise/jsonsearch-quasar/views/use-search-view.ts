import {
  getRecordFromDataset,
  mappedValue as utilMappedValue,
  RecordMappingConfig,
  SearchViewElement,
  SearchViewOptions,
  SearchViewOptionsDefaults,
  SearchViewRendererProps,
  UISchemaSearchViewOptions,
  useJsonFormsSearchView,
  useQuasarSearchView,
} from '@appvise/jsonsearch-quasar';
import { useI18n } from 'vue-i18n';
import { computed, ComputedRef, inject, Ref, ref, unref, watch } from 'vue';
import { ControlElement, JsonFormsSubStates } from '@jsonforms/core';
import { merge } from 'lodash';
import {
  SearchOptions,
  SearchOptionsDefaults,
  UISchemaSearchOptions,
} from '@appvise/jsonforms-search-manager';
import {
  Connection,
  Edge,
  Node,
  RawDataProvider,
  SearchManager,
  SearchRequestType,
  useSearchManager,
} from '@appvise/search-manager';
import { useWindowSize } from '@vueuse/core';

const useSearchView = (props: SearchViewRendererProps, parentResult?: any) => {
  const searchView = useQuasarSearchView(useJsonFormsSearchView(props));
  const { t } = useI18n();
  const { width } = useWindowSize();

  const jsonforms = inject<JsonFormsSubStates>('jsonforms');

  const rootI18nPrefix =
    jsonforms?.core?.uischema?.options?.i18n ?? 'appvise.jsonSearch';

  const uischema: SearchViewElement = unref(searchView.control)
    .uischema as SearchViewElement;

  // Hold selected items for this view which may be a nested search view
  // For example: multiple ListViews within an ExpansionPanelView
  const selectedItems: Ref<any[]> = ref([]);
  const selectedAll: Ref<boolean> = ref(false);
  const initialized = ref(false);

  // Inject root selection
  const rootSelection = inject<Ref<any[]>>('rootSelection') ?? ref([]);

  /**
   * Setup options + translate fields
   */
  const viewOptions: SearchViewOptions = merge(
    JSON.parse(JSON.stringify(SearchViewOptionsDefaults)), // Parsing prevents overriding defaults
    uischema.options?.view as UISchemaSearchViewOptions
  );

  // Translate messages
  // viewOptions.noData.title = t(
  //   `${rootI18nPrefix}.view.noData.title`,
  //   t(viewOptions.noData.title, viewOptions.noData.title)
  // );
  // viewOptions.noData.subTitle = t(
  //   `${rootI18nPrefix}.view.noData.subTitle`,
  //   t(viewOptions.noData.subTitle, viewOptions.noData.subTitle)
  // );
  // viewOptions.counter.item = t(
  //   `${rootI18nPrefix}.counter.item`,
  //   t(viewOptions.counter.item, viewOptions.counter.item)
  // );
  // viewOptions.counter.items = t(
  //   `${rootI18nPrefix}.counter.items`,
  //   t(viewOptions.counter.items, viewOptions.counter.items)
  // );

  /**
   * Setup Search Manager
   */
  if (!uischema?.options?.search?.provider) {
    throw new Error('No search provider defined');
  }

  const searchOptions: SearchOptions = merge(
    SearchOptionsDefaults,
    uischema.options.search as UISchemaSearchOptions
  );
  const searchProvider = searchOptions.provider;
  let searchManager: SearchManager<
    SearchRequestType,
    Node,
    Edge<Node>,
    Connection<Node, Edge<Node>>
  >;

  /**
   * Use RawDataProvider to use embedded data from parent result to display a SearchView
   */
  if (searchProvider === 'rawData' && parentResult && searchOptions?.mapping) {
    // Fetch connection from parentResult using mapping
    const searchResults = utilMappedValue(parentResult, searchOptions.mapping);

    // Set up the raw data provider with connection data as initial data
    const provider = new RawDataProvider(searchResults);

    searchManager = new SearchManager(provider);
  } else if (searchProvider === 'rawData' && searchView.connection) {
    // Create RawDataProvider from provided connection
    const provider = new RawDataProvider(searchView.connection);
    searchManager = new SearchManager(provider);
  } else {
    // Load defined SearchProvider from ./src/boot/search-client.ts
    searchManager = useSearchManager(searchProvider);
  }

  const request: Ref<SearchRequestType> = ref(
    searchView.request ?? {
      first: searchOptions.itemsPerPage,
    }
  );

  /**
   * Filters to be shown for the view
   */
  const filters: ComputedRef<any[]> = computed(() => {
    return ((uischema.filters ?? []) as ControlElement[]).map(
      (childElement: ControlElement, index: number) => {
        // TODO: Integrate uischema options
        return {
          elementIndex: index,
          name: childElement.scope?.replace('#/properties/', ''),
          label: childElement.label as string,
          field: childElement.scope?.replace('#/properties/', ''),
          align: 'left',
          visible: (childElement.options?.visible as boolean) ?? true,
        };
      }
    );
  });

  /**
   * Attributes for each result
   */
  const attributes: ComputedRef<any[]> = computed(() => {
    return (uischema.elements as ControlElement[])
      .map((childElement: ControlElement, index: number) => {
        // TODO: Integrate uischema options
        return {
          elementIndex: index,
          name: childElement.scope?.replace('#/properties/', ''),
          label: childElement.label as string,
          field: childElement.scope?.replace('#/properties/', ''),
          align: 'left',
          visible: (childElement.options?.visible as boolean) ?? true,
          screenSize: childElement.options?.screenSize
            ? (childElement.options?.screenSize as string)
            : undefined,
        };
      })
      .filter((attribute) => {
        return (
          (attribute.visible &&
            (!attribute.screenSize ||
              (attribute.screenSize === 'lt-sm' && width.value < 600) ||
              (attribute.screenSize === 'gt-sm' && width.value >= 1024) ||
              (attribute.screenSize === 'lt-md' && width.value < 1024) ||
              (attribute.screenSize === 'gt-md' && width.value >= 1440) ||
              (attribute.screenSize === 'lt-lg' && width.value < 1440))) ||
          (attribute.screenSize === 'gt-lg' && width.value >= 1920)
        );
      });
  });

  /**
   * Watch request for changes
   */
  watch(
    () => request.value.filter,
    async () => {
      await searchManager.search(request.value);
    },
    {
      deep: true,
    }
  );

  watch(
    () => request.value.sort,
    async () => {
      await searchManager.search(request.value);
    },
    {
      deep: true,
    }
  );

  /**
   * Merge new search results into current results
   */
  watch(
    searchManager.connection,
    (newValue) => {
      // Propagate updated response through data object to parent
      const data = unref(searchView.control).data;

      searchView.onChange({
        ...data,
        response: newValue,
      });

      if (selectedAll.value) {
        selectedItems.value = results.value as any[];
      }

      initialized.value = true;
    },
    { deep: true }
  );

  watch(selectedAll, () => {
    if (selectedAll.value) {
      // Select all items
      selectedItems.value = results.value as any[];
    }
  });

  const clearSelection = () => {
    selectedItems.value = [];
  };

  const emitSelectionChange = ref(true);

  /**
   * Emit selection change event
   */
  watch(
    selectedItems,
    (newSelection) => {
      if (emitSelectionChange.value) {
        // Propagate updated selection through data object to parent
        const control = unref(searchView.control);
        const data = control.data;
        const result = control.result;

        searchView.onChange({
          ...data,
          selectedItems: newSelection,
          selectionPath: viewOptions.selection.path.replace(
            '{rowIndex}',
            result?.rowIndex ?? ''
          ),
        });
      }

      // Check if all items are selected by using the q-table select all checkbox
      selectedAll.value =
        selectedItems.value.length ===
        searchManager.connection.value?.edges?.length;

      // Make sure selection change event is emitted (in case component selection
      // was merged with rootSelection)
      emitSelectionChange.value = true;
    },
    { deep: true }
  );

  watch(rootSelection, () => {
    // Merge root selection with component selection
    if (viewOptions.selection.mergeWithRootSelection) {
      // Prevent emitting selection changed event because selectionItems will be updated.
      // Not doing this will cause infinite loop
      emitSelectionChange.value = false;

      // Filter out selectedItems that were previously selected but aren't anymore in the rootSelection
      selectedItems.value = selectedItems.value.filter((selectedItem) =>
        rootSelection.value.find(
          (rootItem) => rootItem.node.id === selectedItem.node.id
        )
      );
    }
  });

  /**
   * Merge additional data into search results
   */

  // Config for adding additionalData to each row from additional data if provided
  const adConfig: RecordMappingConfig | undefined =
    uischema?.options?.search?.additionalData;

  const results = computed(() => {
    return searchManager.connection?.value?.edges?.map((edge, index) => {
      return {
        rowIndex: index,
        ...edge,

        // Map additional data to row data if mapping is provided
        additionalData: adConfig
          ? getRecordFromDataset(edge, searchView.additionalData, adConfig)
          : undefined,

        selected: !!selectedItems.value?.find(
          (selectedItem: any) => selectedItem.node.id === edge.node.id
        ),
        select: () => {
          if (viewOptions.selection.multiple) {
            // Add to selection if not present
            if (
              !selectedItems.value?.find(
                (selectedItem: any) => selectedItem.node.id === edge.node.id
              )
            ) {
              selectedItems.value.push(edge);
            }
          } else {
            // Replace selection if only 1 item can be selected at once
            selectedItems.value = [edge];
          }
        },
        deselect: () => {
          const itemIndex = selectedItems.value?.findIndex(
            (selectedItem: any) => selectedItem.node.id === edge.node.id
          );

          if (itemIndex > -1) {
            selectedItems.value.splice(itemIndex, 1);
          }
        },
      };
    });
  });

  /**
   * Update request when filters change
   *
   * @param event
   */
  const onFilterChange = (event: {
    id: string;
    value: string | number | boolean;
    type: string;
  }) => {
    const id = event.id
      // Remove property parent (filters)
      .replace('filters.', '');

    if (!request.value.filter) {
      request.value.filter = {};
    }

    if (event.type === 'text') {
      request.value.filter[id] = { iContains: event.value.toString() };
    }
  };

  /**
   * Util functions
   */

  // List options
  const translation = (key: string) => {
    const mappings = uischema.options?.mappings;
    const mapping = mappings ? mappings[key] : false;

    return mapping ? t(mapping) : '';
  };

  const option = (key: string) => {
    return uischema.options?.mappings[key];
  };

  const mappedValue = (result: Record<string, any>, key: string): any => {
    return uischema.options?.mappings[key]
      ? utilMappedValue(result, uischema.options?.mappings[key]) ?? ''
      : '';
  };

  const icon = (result: Record<string, any>): string | undefined => {
    const icon = uischema.options?.icon;

    if (icon) {
      // Hardcoded icon provided
      return icon;
    }

    const iconMapping = uischema.options?.mappings?.icon;

    // Retrieve icon by mapping field to provided mapping set
    if (iconMapping?.source && iconMapping?.mappings) {
      const sourceValue = mappedValue(result, iconMapping?.source);

      if (sourceValue && iconMapping?.mappings[sourceValue]) {
        return iconMapping?.mappings[sourceValue];
      }
    }
  };

  return {
    // Schema
    uischema,

    // Search View
    searchView,
    viewOptions,
    attributes,
    filters,
    selectedItems,
    selectedAll,
    clearSelection,
    rootSelection,
    initialized,
    onFilterChange,

    // Search Manager
    searchManager,
    searchOptions,
    request,
    results,
    fetching: searchManager.fetching,

    // Util functions
    translation,
    option,
    mappedValue,
    icon,
  };
};

export default useSearchView;
