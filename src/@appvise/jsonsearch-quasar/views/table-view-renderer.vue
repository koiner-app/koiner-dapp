<template>
  <q-table
    v-if="searchView.visible"
    ref="tableView"
    :class="`pa-0 ${styles.tableView.root} ${appliedOptions.class ?? ''}`"
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
import { SearchManager, SearchRequestType } from '@appvise/search-manager';
import { ControlElement } from '@jsonforms/core';
import { dom } from 'quasar';
import offset = dom.offset;
import {
  SearchViewElement,
  useJsonFormsSearchView,
  useQuasarSearchView,
} from '..';

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

    if (!quasarSearchView.searchProvider) {
      throw new Error('No searchProvider provided');
    }

    const searchManager = new SearchManager(quasarSearchView.searchProvider);
    const request: SearchRequestType = quasarSearchView.request ?? {};

    const loadMoreThreshold = 2; // TODO: Integrate uischema options
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
        scroll.to > lastIndex - loadMoreThreshold
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
        tableOffsetTop.value = offset(newValue.$el).top + 76;
      }
    });

    const { t } = useI18n();

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

      // View
      ...quasarSearchView,
      t,
    };
  },
});
</script>
