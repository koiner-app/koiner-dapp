<template>
  <q-table
    v-if="computedResponse != null"
    ref="resultsTable"
    v-model:pagination="pagination"
    v-model:selected="selected"
    class="search-table"
    :rows-per-page-options="[0]"
    :row-key="rowKeyName"
    :rows="computedResponse.results"
    :columns="config.getFields()"
    :loading="isLoading"
    binary-state-sort
    virtual-scroll
    :selection="selectionMode"
    flat
    :style="`height: calc(90vh - ${tableOffsetTop}px)`"
    @virtual-scroll="onScroll"
    @request="onRequest"
  >
    <template #top>
      <slot name="top-title">
        <div class="col-6">
          <div v-if="title != null" class="q-table__control">
            <div class="q-table__title">
              {{ title }}
            </div>
          </div>
        </div>
      </slot>
      <div class="col-6">
        <slot name="top-actions" />
      </div>
      <slot name="filters" />
    </template>

    <template
      v-for="(column, i) of columns.filter((_column) => _column.customized)"
      #[`body-cell-${column.name}`]="props"
      :key="i"
    >
      <q-td :props="props">
        <slot :name="[`${column.name}`]" :props="props" :result="props.row" />
      </q-td>
    </template>
    <template #bottom>
      <slot name="bottom">
        {{ computedResponse.results.length }}&nbsp;
        <span v-if="computedResponse.results.length === 1">{{
          singularTranslation
        }}</span>
        <span v-if="computedResponse.results.length > 1">{{
          pluralTranslation
        }}</span>
        <span v-if="computedResponse.totalCount > 1">
          &nbsp;{{ t('appvise.board.itemCountOf') }}
          {{ computedResponse.totalCount }}
        </span>
      </slot>
    </template>
  </q-table>
</template>

<script lang="ts">
/* eslint-disable */

import {
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  watch,
  ref,
  onUnmounted,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { Board } from '../../board/lib/field/board';
import {
  SearchManager,
  SearchRequest,
  SortDirection,
} from '@appvise/search-manager-bak';
import { dom } from 'quasar';
const { offset } = dom;

export default defineComponent({
  name: 'SearchTable',

  components: {},

  props: {
    searchManager: {
      type: Object as PropType<SearchManager<any>>,
      required: true,
    },
    request: {
      type: Object as PropType<SearchRequest>,
      required: false,
      default: null,
    },
    config: {
      type: Object as PropType<Board>,
      required: true,
    },
    loadMoreThreshold: {
      type: Number,
      default: 10,
    },
    rowKeyName: {
      type: String,
      required: false,
      default: 'id',
    },
    title: {
      type: String,
      default: null,
    },
    singularTranslation: {
      type: String,
      default: 'item',
    },
    pluralTranslation: {
      type: String,
      default: 'items',
    },
    selectionMode: {
      type: String,
      default: 'none',
    },
    itemsPerPage: {
      type: Number,
      default: 50,
    },
  },

  setup(props) {
    // const searchManager = toRef(props, 'searchManager');

    const resultsTable = ref();
    const isLoading = ref(false);

    // q-table pagination
    const pagination = ref({
      sortBy: '',
      descending: false,
      page: 0,
      rowsPerPage: 0,
      rowsNumber: 0,
    });
    const selected = ref([]);

    const updateCheckedRows = (rowsKey: any) => {
      // do your checkbox click event
      console.log(rowsKey);
    };

    const onRequest = (requestProps: {
      pagination: any;
      filter?: undefined;
    }) => {
      // Update q-table sort props
      pagination.value.sortBy = requestProps.pagination.sortBy;
      pagination.value.descending = requestProps.pagination.descending;

      let newInput: any;

      if (props.request != null) {
        newInput = {};
        Object.assign(newInput, props.request);
      } else {
        newInput = {
          first: props.itemsPerPage,
        };
      }

      // Load sort field from q-table pagination props
      newInput.sort = [
        {
          field: requestProps.pagination.sortBy,
          direction: requestProps.pagination.descending
            ? SortDirection.desc
            : SortDirection.asc,
        },
      ];

      console.log('searchTable: onRequest searc(newInput)', newInput);

      props.searchManager.search(newInput);
    };

    const saveScroll = (position: number) => {
      // eslint-disable-next-line vue/no-mutating-props
      props.searchManager.scrollPosition = position;
    };

    const loadMore = () => {
      props.searchManager.loadMoreResults();
    };

    // TODO: Fix
    // @ts-ignore
    const onScroll = ({ to, ref }) => {
      // TODO: Fix
      const lastIndex =
        props.searchManager.response != null
          ? props.searchManager.response.results.length - 1
          : -1;

      if (
        isLoading.value !== true &&
        props.searchManager.response != null &&
        props.searchManager.response.pageInfo.hasNextPage &&
        to > lastIndex - props.loadMoreThreshold
      ) {
        isLoading.value = true;

        loadMore();

        setTimeout(() => {
          nextTick(() => {
            ref.refresh();
            isLoading.value = false;
          });
        }, 500);
      }
    };

    onMounted(() => {
      console.log('searchTable: onMounted');
      if (
        props.request &&
        props.request.sort &&
        props.request.sort.length > 0
      ) {
        // Load initial sort from request
        pagination.value.sortBy = props.request.sort[0].field;
        pagination.value.descending =
          props.request.sort[0].direction === SortDirection.desc;
      } else {
        // Use default sort field
        const sortField = props.config.getSortField();

        pagination.value.sortBy = sortField ? sortField.name : 'id';
        pagination.value.descending =
          props.config.getSortDirection() === SortDirection.desc;
      }

      console.log('searchTable: response == null?');

      if (props.searchManager.response == null) {
        console.log('searchTable: before onRequest');

        // Get initial data from server (1st page)
        onRequest({
          pagination: pagination.value,
          filter: undefined,
        });

        console.log('searchTable: after onRequest');
        console.log(props.searchManager);
      } else {
        console.log('searchTable: else');

        // If response is provided scroll back to saved scroll position
        if (props.searchManager && props.searchManager.scrollPosition) {
          isLoading.value = true;
          resultsTable.value.scrollTo(props.searchManager.scrollPosition - 21);

          // Make sure loadMore isn't triggered
          setTimeout(() => {
            nextTick(() => {
              isLoading.value = false;
            });
          }, 500);
        }
      }
    });

    onUnmounted(async () => {
      console.log('searchTable: onUnmounted');
      props.searchManager.reset();
    });

    // watch(props.request, (currentValue) => {
    //   console.log('UPDATED!');
    //   console.log(currentValue);
    //   props.searchManager.search(currentValue);
    // });

    const tableOffsetTop = ref(0);

    watch(resultsTable, (newValue) => {
      console.log('WACTH RESLTTABLE');
      console.log(newValue);
      if (newValue != null) {
        console.log(offset(newValue.$el));
        tableOffsetTop.value = offset(newValue.$el).top + 60 + 32;
      }
    });

    const { t } = useI18n();

    return {
      t,
      resultsTable,
      messages: {
        pagingInfo: t('appvise.board.pagination.pagingInfo'),
        pageSizeChangeLabel: t('appvise.board.pagination.pageSizeChangeLabel'),
        gotoPageLabel: t('appvise.board.pagination.gotoPageLabel'),
        noDataAvailable: t('appvise.board.pagination.noDataAvailable'),
      },
      updateCheckedRows,
      onScroll,
      onRequest,

      pagination,
      selected,
      tableOffsetTop,

      columns: props.config.getFields(),
      filterOptions: [
        {
          name: 'filterOpen',
          label: 'Open',
          selected: true,
        },
        {
          name: 'filterClosed',
          label: 'Gesloten',
          selected: true,
        },
        {
          name: 'filterUnknown',
          label: 'Onbekend',
          selected: true,
        },
        {
          name: 'filterDraft',
          label: 'Draft',
          selected: false,
        },
      ],
    };
  },

  computed: {
    computedResponse() {
      return this.searchManager.response;
    },
    isLoading() {
      return this.searchManager.isLoading;
    },
  },

  // watch: {
  //   'response.totalCount'(newValue: any) {
  //     // Update total count of response
  //     this.pagination.rowsNumber = newValue ?? 0;
  //   },
  //   'response.results'(newValue: any) {
  //     // Update number of rows loaded
  //     this.pagination.rowsPerPage = newValue != null ? newValue.length : 0;
  //   },
  // },
});
</script>
