<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>
  </div>

  <q-space />

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :additional-renderers="renderers"
    @change="onChange"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref, watch } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import tokenHoldersSearchSchema from '../token-holders-search.schema.json';
import tokenAddressBalancesSearchUiSchema from './address-token-balances-table.ui-schema.json';
import tokenBalancesSearchUiSchema from './token-balances-table.ui-schema.json';
import { QueryTokenHoldersArgs, TokenHoldersConnection } from '@koiner/sdk';

export default defineComponent({
  name: 'TokenBalancesTable',
  components: { QJsonSearch },
  props: {
    title: {
      required: false,
      type: String,
    },
    contractIds: {
      required: false,
      type: Array as PropType<Array<string>>,
    },
    addresses: {
      required: false,
      type: Array as PropType<Array<string>>,
    },
    showAddress: {
      required: false,
      type: Boolean,
      default: true,
    },
  },
  emits: ['change'],

  setup(props, { emit }) {
    let request: Ref<QueryTokenHoldersArgs> = ref({ filter: {} });
    let contractIdsFilter: any;
    let addressFilter: any;

    const updateFilters = () => {
      request.value.filter = { AND: [] };

      if (props.contractIds && props.contractIds.length > 0) {
        contractIdsFilter = {
          OR: props.contractIds.map((contractId) => {
            return {
              contractId: { equals: contractId },
            };
          }),
        };
      }

      if (props.addresses && props.addresses.length > 0) {
        addressFilter = {
          OR: props.addresses.map((address) => {
            return {
              addressId: { equals: address },
            };
          }),
        };
      }

      if (contractIdsFilter) {
        request.value.filter.AND?.push(contractIdsFilter);
      }

      if (addressFilter) {
        request.value.filter.AND?.push(addressFilter);
      }
    };

    onMounted(() => {
      updateFilters();
    });

    // Update filters when addresses change
    watch(
      props,
      () => {
        updateFilters();
      },
      { deep: true }
    );

    return {
      schema: tokenHoldersSearchSchema,
      uiSchema: !props.showAddress
        ? tokenAddressBalancesSearchUiSchema // Don't show address
        : tokenBalancesSearchUiSchema,
      request,
      renderers: KoinerRenderers,
      onChange: async (data: TokenHoldersConnection) => {
        emit('change', data);
      },
    };
  },
});
</script>
