<template>
  <q-table
    v-if="control.visible && results"
    ref="tableView"
    :class="cssClass"
    :rows-per-page-options="[0]"
    row-key="rowIndex"
    :rows="results"
    :columns="attributes"
    :loading="fetching"
    :wrap-cells="
      appliedOptions.wrapCells != null ? appliedOptions.wrapCells : true
    "
    virtual-scroll
    flat
    :style="fullHeightCss"
    @virtual-scroll="onScroll"
    @request="onRequest"
    :pagination-label="
      (firstRowIndex, endRowIndex, totalRowsNumber) =>
        `${totalRowsNumber} items`
    "
    :selected-rows-label="
      (numberOfRows) => t('appvise.jsonSearch.view.selected', [numberOfRows])
    "
    :selection="appliedOptions.selection"
    v-model:selected="selectedItems"
  >
    <template
      v-for="(column, index) in attributes"
      :key="`${control.path}-${index}`"
      #[`body-cell-${column.name}`]="props"
    >
      <q-td :props="props">
        <slot :name="[`${column.name}`]" :props="props" :result="props.row">
          <dispatch-renderer
            :schema="control.schema"
            :uischema="uischema.elements[column.elementIndex]"
            :path="control.path"
            :enabled="control.enabled"
            :renderers="control.renderers"
            :cells="control.cells"
            :result="props.row"
            :index="props.row.rowIndex"
          />
        </slot>
      </q-td>
    </template>

    <template v-slot:loading>
      <q-markup-table class="no-shadow" v-if="!initialized">
        <thead>
          <tr>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-right">
              <q-skeleton animation="blink" type="text" />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="n in 10" :key="n">
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="50px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="35px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="65px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="25px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </template>

    <template v-slot:no-data>
      <div
        v-if="!fetching"
        class="full-width row flex-center text-accent q-gutter-sm text-center"
      >
        <img
          class="no-data--image"
          v-if="viewOptions.noData.image"
          :src="viewOptions.noData.image"
          :alt="viewOptions.noData.title"
        />
        <div class="full-width">
          <div class="no-data--title">{{ viewOptions.noData.title }}</div>
          <div class="no-data--subtitle">{{ viewOptions.noData.subTitle }}</div>
        </div>
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import { DispatchRenderer, rendererProps, RendererProps } from '@jsonforms/vue';
import { useI18n } from 'vue-i18n';
import { dom } from 'quasar';
import { SearchViewElement } from '../index';
import { useWindowScroll, useWindowSize } from '@vueuse/core';
import offset = dom.offset;
import useSearchView from '@appvise/jsonsearch-quasar/views/use-search-view';

export default defineComponent({
  name: 'TableViewRenderer',
  components: {
    DispatchRenderer,
  },
  props: {
    ...rendererProps<SearchViewElement>(),

    result: {
      type: Object as PropType<any>,
      required: false,
      default: null,
    },
  },
  setup(props: RendererProps<SearchViewElement> & { result: any }) {
    const { t } = useI18n();
    const {
      // Schema
      uischema,

      // Search View
      searchView,
      viewOptions,
      attributes,
      selectedItems,
      initialized,

      // Search Manager
      searchManager,
      searchOptions,
      request,
      results,
    } = useSearchView(props, props.result);

    const { width } = useWindowSize();
    const { y } = useWindowScroll();

    if (!uischema?.options?.search?.provider) {
      throw new Error('No search provider defined');
    }

    const tableView = ref();

    const onRequest = async () => {
      await searchManager.search(request.value);

      if (searchView.scrollPosition) {
        tableView.value.scrollTo(searchView.scrollPosition, 'start-force');
      }
    };

    const onScroll = (scroll: any) => {
      searchManager.saveScrollPosition(scroll.index);

      const lastIndex =
        searchManager.connection.value && searchManager.connection.value?.edges
          ? searchManager.connection.value.edges.length - 1
          : -1;

      // Load more for fixed tables with virtual scroll
      if (
        searchManager.connection.value &&
        searchManager.connection.value.pageInfo.hasNextPage &&
        scroll.to > lastIndex - searchOptions.loadMoreThreshold &&
        width.value >= 1024
      ) {
        searchManager.loadMore();
      }
    };

    watch(y, () => {
      // Load more when using unlimited height tables + window scroll
      if (
        searchManager.connection.value &&
        searchManager.connection.value.pageInfo.hasNextPage &&
        width.value < 1024 &&
        y.value >
          window.document.body.clientHeight -
            searchOptions.loadMoreThreshold * 50 -
            window.innerHeight
      ) {
        searchManager.loadMore();
      }
    });

    onMounted(() => {
      // Get 1st page from server ()
      onRequest();
    });

    // Show table in full view height - offset from top - provided margin
    const fullHeight = ref(false);
    const fullHeightMargin = ref(0);

    if (uischema?.options?.fullHeight) {
      fullHeight.value = uischema.options.fullHeight;
    }

    if (uischema?.options?.fullHeightMargin) {
      fullHeightMargin.value = uischema.options.fullHeightMargin;
    }

    // Used for calculation height when using vh
    const tableOffsetTop = ref(0);

    watch(tableView, (newValue) => {
      if (newValue != null) {
        tableOffsetTop.value =
          offset(newValue.$el).top + fullHeightMargin.value;
      }
    });

    watch(width, () => {
      tableOffsetTop.value =
        offset(tableView.value.$el).top + fullHeightMargin.value;
    });

    return {
      tableView,
      onScroll,
      onRequest,

      cssClass: computed(() => {
        return `pa-0 ${
          results.value?.length === 0 ? 'no-results ' : ' has-results'
        } ${searchView.styles.tableView.root} ${
          searchView.appliedOptions.value.class ?? ''
        } ${searchView.appliedOptions.value.rowHeights ?? 'regular-rows'}
        ${initialized.value ? ' initialized' : ''}`;
      }),
      fullHeightCss: computed(() => {
        if (fullHeight.value) {
          return `height: calc(100vh - ${tableOffsetTop.value}px);`;
        }

        return '';
      }),

      t,

      // Search
      fetching: searchManager.fetching,

      // Schema
      uischema,

      // Search View
      ...searchView,
      viewOptions,
      attributes,
      selectedItems,
      initialized,

      // Search Manager
      searchManager,
      searchOptions,
      request,
      results,
    };
  },
});
</script>
