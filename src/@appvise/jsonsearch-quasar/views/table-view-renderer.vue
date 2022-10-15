<template>
  <q-table
    v-if="searchView.visible"
    ref="tableView"
    :class="`pa-0 ${styles.tableView.root} ${appliedOptions.class ?? ''} ${
      appliedOptions.rowHeights ?? 'regular-rows'
    }`"
    :rows-per-page-options="[0]"
    :row-key="rowKeyName"
    :rows="connection?.edges"
    :columns="columns"
    :loading="fetching"
    virtual-scroll
    flat
    :style="`height: calc(100vh - ${tableOffsetTop}px)`"
    @virtual-scroll="onScroll"
    @request="onRequest"
  >
    <template
      v-for="(column, index) in columns"
      :key="`${searchView.path}-${index}`"
      #[`body-cell-${column.name}`]="props"
    >
      <q-td :props="props">
        <slot :name="[`${column.name}`]" :props="props" :result="props.row">
          <dispatch-renderer
            :schema="searchView.schema"
            :uischema="searchView.uischema.elements[index]"
            :path="searchView.path"
            :enabled="searchView.enabled"
            :renderers="searchView.renderers"
            :cells="searchView.cells"
            :result="props.row"
          />
        </slot>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { DispatchRenderer, rendererProps, RendererProps } from '@jsonforms/vue';
import { useI18n } from 'vue-i18n';
import { onMounted, ref, unref } from 'vue';
import { SearchRequestType, useSearchManager } from '@appvise/search-manager';
import { ControlElement } from '@jsonforms/core';
import { dom } from 'quasar';
import offset = dom.offset;
import {
  SearchViewElement,
  useJsonFormsSearchView,
  useQuasarSearchView,
} from '..';
import {
  SearchOptions,
  SearchOptionsDefaults,
  UISchemaSearchOptions,
} from '@appvise/jsonforms-search-manager';

export default defineComponent({
  name: 'TableViewRenderer',
  components: {
    DispatchRenderer,
  },
  props: {
    ...rendererProps<SearchViewElement>(),
  },
  setup(props: RendererProps<SearchViewElement>) {
    const quasarSearchView = useQuasarSearchView(useJsonFormsSearchView(props));
    // TODO: Fix123
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const childElements = unref(quasarSearchView.searchView).uischema.elements;
    const columns: {
      name: string;
      label: string;
      field: string;
    }[] = childElements.map((childElement: ControlElement) => {
      // TODO: Integrate uischema options
      return {
        name: childElement.scope.replace('#/properties/', ''),
        label: childElement.label,
        field: childElement.scope.replace('#/properties/', ''),
        align: 'left',
      };
    });

    const uischema = unref(quasarSearchView.searchView).uischema;

    if (!uischema?.options?.search?.provider) {
      throw new Error('No search provider defined');
    }

    const searchOptions: SearchOptions = Object.assign(
      SearchOptionsDefaults,
      uischema.options.search as UISchemaSearchOptions
    );
    const searchManager = useSearchManager(searchOptions.provider);

    const request: SearchRequestType = quasarSearchView.request ?? {
      first: searchOptions.itemsPerPage,
    };

    const rowKeyName = 'id'; // TODO: Integrate uischema options
    const tableView = ref();

    const onRequest = async () => {
      await searchManager.search(request);

      if (quasarSearchView.scrollPosition) {
        tableView.value.scrollTo(
          quasarSearchView.scrollPosition,
          'start-force'
        );
      }
    };

    const onScroll = (scroll: any) => {
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

    onMounted(() => {
      // Get 1st page from server ()
      onRequest();
    });

    // Used for calculation height when using vh
    const tableOffsetTop = ref(0);

    watch(tableView, (newValue) => {
      if (newValue != null) {
        tableOffsetTop.value = offset(newValue.$el).top + 104;
      }
    });

    watch(
      () => request.filter,
      async () => {
        await searchManager.search(request);
      },
      {
        deep: true,
      }
    );

    watch(
      () => request.sort,
      async () => {
        await searchManager.search(request);
      },
      {
        deep: true,
      }
    );

    const { t } = useI18n();

    watch(
      searchManager.connection,
      (newValue) => {
        quasarSearchView.onChange(newValue);
      },
      { deep: true }
    );

    return {
      // Search
      connection: searchManager.connection,
      fetching: searchManager.fetching,

      // Table
      tableOffsetTop,
      tableView,
      columns,
      onScroll,
      onRequest,
      rowKeyName,
      searchOptions,

      // View
      ...quasarSearchView,
      t,
    };
  },
});
</script>
