<script lang="ts">
import { ControlElement } from '@jsonforms/core';
import { RendererProps, useJsonFormsOneOfEnumControl } from '@jsonforms/vue';
import {
  defineComponent,
  OneOfEnumControlRenderer,
  useQuasarControl,
} from '@appvise/jsonforms-quasar';
import { SearchFilter, useSearchManager } from '@appvise/search-manager';
import { ref, Ref, unref } from 'vue';
import {
  SearchOptions,
  SearchOptionsDefaults,
  UISchemaSearchOptions,
} from '@appvise/jsonforms-search-manager';

export default defineComponent({
  name: 'SearchControlRenderer',
  extends: OneOfEnumControlRenderer,
  setup(props: RendererProps<ControlElement>) {
    const typing: Ref<boolean> = ref(false);

    const control = useQuasarControl(
      useJsonFormsOneOfEnumControl(props),
      (value: any) => value || undefined
    );

    const uischema = unref(control.control).uischema;

    if (!uischema?.options?.search?.provider) {
      throw new Error('No search provider defined');
    }

    const searchOptions: SearchOptions = Object.assign(
      SearchOptionsDefaults,
      uischema.options.search as UISchemaSearchOptions
    );
    const searchManager = useSearchManager(searchOptions.provider);

    // Use empty filter to prevent double initial request
    // First request on typing will the same and will be loaded from cache
    let filter: SearchFilter = {
      [searchOptions.filterName]: { iContains: '' },
    };

    const unreffedControl = unref(control.control);
    if (unreffedControl && unreffedControl.data) {
      // Make sure the initial selected option is included in results
      // We need it for displaying selectedLabel
      filter = {
        OR: [
          {
            [searchOptions.filterName]: { iContains: '' },
          },
          {
            [searchOptions.valueField]: { equals: unreffedControl.data },
          },
        ],
      };
    }

    // SearchManager must be initialized within setup
    searchManager.search({
      first: searchOptions.itemsPerPage,
      filter,
    });

    const loadMore = (scroll: any) => {
      searchManager.saveScrollPosition(scroll.index);

      const lastIndex =
        searchManager.connection.value && searchManager.connection.value?.edges
          ? searchManager.connection.value.edges.length - 1
          : -1;

      if (
        searchManager.connection.value &&
        searchManager.connection.value.pageInfo.hasNextPage &&
        scroll.to > lastIndex - searchOptions.loadMoreThreshold
      ) {
        searchManager.loadMore();
      }
    };

    return {
      ...control,
      searchOptions,
      searchManager,
      loadMore,

      typing,
    };
  },
  computed: {
    useInput() {
      return true;
    },
    computedOptions() {
      return this.searchManager.connection?.value?.edges?.map((edge) => {
        return {
          value: edge.node[this.searchOptions.valueField],
          label: edge.node[this.searchOptions.labelField],
        };
      });
    },
    selectedOption() {
      const edge = this.searchManager.connection?.value?.edges?.find(
        (edge) => edge.node[this.searchOptions.valueField] === this.control.data
      );

      if (edge) {
        return {
          value: edge.node[this.searchOptions.valueField],
          label: edge.node[this.searchOptions.labelField],
        };
      }

      return undefined;
    },
    selectedLabel() {
      return this.selectedOption ? this.selectedOption.label : '';
    },
  },
  methods: {
    onScroll(scroll: any) {
      this.loadMore(scroll);
    },
    filterFn(
      val: string,
      update: (arg0: () => void) => void,
      abort: () => void
    ) {
      this.typing = val.length > 0;

      // Only search when input length matches minChars
      if (val.length < this.searchOptions.minChars) {
        abort();
        return;
      }

      update(async () => {
        await this.searchManager.search({
          first: this.searchOptions.itemsPerPage,
          filter: {
            [this.searchOptions.filterName]: { iContains: val },
          },
        });
      });
    },
  },
});
</script>
