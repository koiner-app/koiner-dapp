<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>
    <q-space />
    <search-filters
      :request="request"
      search-info="Search by event name, id or contract id"
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
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import schema from '../contract-events-search.schema.json';
import mobileUiSchema from './contract-events-table.mobile-ui-schema.json';
import desktopUiSchema from './contract-events-table.ui-schema.json';
import { useSearchStore } from 'stores/search';

export default defineComponent({
  name: 'ContractEventsTable',
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
    contractIds: {
      required: false,
      type: Array as PropType<Array<string>>,
    },
    parentId: {
      required: false,
      type: String,
    },
    mobile: {
      required: false,
      type: Boolean,
      default: false,
    },
    live: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const searchStore = useSearchStore();
    let heightsFilter: any;
    let addressFilter: any;
    let contractsFilter: any;

    const uiSchema = ref(props.mobile ? mobileUiSchema : desktopUiSchema);

    if (props.live) {
      // Use on chain search provider
      uiSchema.value.elements[0].options.search.provider =
        'onChainContractEvents';
    }

    const onScroll = (newScrollPosition: number) => {
      searchStore.contractEvents.position = newScrollPosition;
    };

    const updateFilters = () => {
      if (!searchStore.contractEvents.request.filter) {
        searchStore.contractEvents.request.filter = {};
      }

      searchStore.contractEvents.request.filter = { AND: [] };

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
            impacted: { contains: address },
          };
        });
      }

      if (props.contractIds && props.contractIds.length > 0) {
        contractsFilter = props.contractIds.map((contractId) => {
          return {
            contractId: { equals: contractId },
          };
        });
      }

      if (heightsFilter) {
        searchStore.contractEvents.request.filter.AND!.push({
          OR: heightsFilter,
        });
      }

      if (addressFilter) {
        searchStore.contractEvents.request.filter.AND!.push({
          OR: addressFilter,
        });
      }

      if (contractsFilter) {
        searchStore.contractEvents.request.filter.AND!.push({
          OR: contractsFilter,
        });
      }

      if (props.parentId) {
        searchStore.contractEvents.request.filter.AND!.push({
          parentId: {
            equals: props.parentId,
          },
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
      schema,
      uiSchema: uiSchema.value,
      request: searchStore.contractEvents.request,
      position: searchStore.contractEvents.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
