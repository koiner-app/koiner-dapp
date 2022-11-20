<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>
    <q-space />
    <search-filters
      :request="request"
      search-placeholder="Search by event id or contract id"
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
import contractEventsSearchSchema from '../contract-events-search.schema.json';
import contractEventsSearchUiSchema from './contract-events-table.ui-schema.json';
import { useSearchStore } from 'stores/search';

export default defineComponent({
  name: 'ContractEventsTable',
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
      searchStore.contractEvents.position = newScrollPosition;
    };

    const updateFilters = () => {
      if (!searchStore.contractEvents.request.filter) {
        searchStore.contractEvents.request.filter = {};
      }

      searchStore.contractEvents.request.filter = { AND: [] };

      if (props.addresses && props.addresses.length > 0) {
        addressFilter = props.addresses.map((address) => {
          return {
            impacted: { contains: address },
          };
        });
      }

      if (addressFilter) {
        searchStore.contractEvents.request.filter.AND!.push({
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
      schema: contractEventsSearchSchema,
      uiSchema: contractEventsSearchUiSchema,
      request: searchStore.contractEvents.request,
      position: searchStore.contractEvents.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
