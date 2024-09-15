<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>
    <q-space />
    <search-filters
      :request="request"
      search-info="Search by operation name, id or contract id"
    />
  </div>

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :additional-renderers="renderers"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref, watch } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import schema from '../contract-operations-search.schema.json';
import mobileUiSchema from './contract-operations-table.mobile-ui-schema.json';
import desktopUiSchema from './contract-operations-table.ui-schema.json';
import { QueryContractOperationsArgs } from '@koiner/sdk';

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
    contractIds: {
      required: false,
      type: Array as PropType<Array<string>>,
    },
    transactionId: {
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
    let request: Ref<QueryContractOperationsArgs> = ref({ filter: {} });
    let heightsFilter: any;
    let addressFilter: any;
    let contractsFilter: any;

    const uiSchema = ref(props.mobile ? mobileUiSchema : desktopUiSchema);

    if (props.live) {
      // Use on chain search provider
      uiSchema.value.elements[0].options.search.provider =
        'onChainContractOperations';
    }

    const updateFilters = () => {
      if (!request.value.filter) {
        request.value.filter = {};
      }

      request.value.filter = { AND: [] };

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

      if (props.contractIds && props.contractIds.length > 0) {
        contractsFilter = props.contractIds.map((contractId) => {
          return {
            contractId: { equals: contractId },
          };
        });
      }

      if (heightsFilter) {
        request.value.filter.AND!.push({
          OR: heightsFilter,
        });
      }

      if (addressFilter) {
        request.value.filter.AND!.push({
          OR: addressFilter,
        });
      }

      if (contractsFilter) {
        request.value.filter.AND!.push({
          OR: contractsFilter,
        });
      }

      if (props.transactionId) {
        request.value.filter.AND!.push({
          transactionId: {
            equals: props.transactionId,
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
      schema,
      uiSchema: uiSchema.value,
      request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
