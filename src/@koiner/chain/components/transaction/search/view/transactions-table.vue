<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>

    <q-space />

    <search-filters
      :request="request"
      search-placeholder="Search by transaction id or payer"
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
import transactionsSearchSchema from '@koiner/chain/components/transaction/search/transactions-search.schema.json';
import transactionsSearchUiSchema from '@koiner/chain/components/transaction/search/view/transactions-table.ui-schema.json';

export default defineComponent({
  name: 'TransactionsTable',
  components: { SearchFilters, QJsonSearch },
  props: {
    title: {
      required: false,
      type: String,
    },
    addresses: {
      required: false,
      type: Array as PropType<Array<string>>,
    },
  },

  setup(props) {
    const searchStore = useSearchStore();
    let addressFilter: any;

    const onScroll = (newScrollPosition: number) => {
      searchStore.transactions.position = newScrollPosition;
    };

    const updateFilters = () => {
      if (!searchStore.transactions.request.filter) {
        searchStore.transactions.request.filter = {};
      }

      searchStore.transactions.request.filter = { AND: [] };

      if (props.addresses && props.addresses.length > 0) {
        addressFilter = props.addresses.map((address) => {
          return {
            payer: { equals: address },
          };
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
      uiSchema: transactionsSearchUiSchema,
      request: searchStore.transactions.request,
      position: searchStore.transactions.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
