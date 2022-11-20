<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>
    <q-space />
    <search-filters
      :request="request"
      search-placeholder="Search by operation id or contract id"
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
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import operationsSearchSchema from '../contract-operations-search.schema.json';
import operationsSearchUiSchema from './contract-operations-table.ui-schema.json';
import { useSearchStore } from 'stores/search';

export default defineComponent({
  name: 'ContractOperationsTable',
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
  },

  setup(props) {
    const searchStore = useSearchStore();
    let heightsFilter: any;
    let addressFilter: any;

    const onScroll = (newScrollPosition: number) => {
      searchStore.contractOperations.position = newScrollPosition;
    };

    const updateFilters = () => {
      if (!searchStore.contractOperations.request.filter) {
        searchStore.contractOperations.request.filter = {};
      }

      searchStore.contractOperations.request.filter = { AND: [] };

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
            OR: [{ from: { equals: address } }, { to: { equals: address } }],
          };
        });
      }

      if (heightsFilter) {
        searchStore.contractOperations.request.filter.AND!.push({
          OR: heightsFilter,
        });
      }

      if (addressFilter) {
        searchStore.contractOperations.request.filter.AND!.push({
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
      schema: operationsSearchSchema,
      uiSchema: operationsSearchUiSchema,
      request: searchStore.contractOperations.request,
      position: searchStore.contractOperations.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
