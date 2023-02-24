<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>

    <q-space />

    <search-filters
      :request="request"
      search-info="Search by transaction id or payer"
    />
  </div>

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :data="{}"
    @on-scroll="onScroll"
    :scroll-position="position"
    :additional-renderers="renderers"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, watch } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import transactionsSearchSchema from '@koiner/chain/transaction/search/transactions-search.schema.json';
import mobileUiSchema from './transactions-table.mobile-ui-schema.json';
import desktopUiSchema from './transactions-table.ui-schema.json';

export default defineComponent({
  name: 'TransactionsTable',
  components: { SearchFilters, QJsonSearch },
  props: {
    title: {
      required: false,
      type: String,
    },
    heights: {
      required: false,
      type: Array as PropType<Array<number>>,
    },
    addresses: {
      required: false,
      type: Array as PropType<Array<string>>,
    },
    mobile: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const searchStore = useSearchStore();
    let heightsFilter: any;
    let addressFilter: any;

    const onScroll = (newScrollPosition: number) => {
      searchStore.transactions.position = newScrollPosition;
    };

    const updateFilters = () => {
      if (!searchStore.transactions.request.filter) {
        searchStore.transactions.request.filter = {};
      }

      searchStore.transactions.request.filter = { AND: [] };

      if (props.heights && props.heights.length > 0) {
        heightsFilter = props.heights.map((height) => {
          return {
            blockHeight: { equals: height },
          };
        });
      }

      if (props.addresses && props.addresses.length > 0) {
        addressFilter = props.addresses.map((address) => {
          return {
            payer: { equals: address },
          };
        });
      }

      if (heightsFilter) {
        searchStore.transactions.request.filter.AND!.push({
          OR: heightsFilter,
        });
      }

      if (addressFilter) {
        searchStore.transactions.request.filter.AND!.push({
          OR: addressFilter,
        });
      }
    };

    // Update filters when addresses change
    watch(
      props,
      () => {
        updateFilters();
      },
      { deep: true }
    );

    onMounted(() => {
      updateFilters();
    });

    return {
      onScroll,
      schema: transactionsSearchSchema,
      uiSchema: props.mobile ? mobileUiSchema : desktopUiSchema,
      request: searchStore.transactions.request,
      position: searchStore.transactions.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
