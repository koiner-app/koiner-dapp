<template>
  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :data="{}"
    :additional-renderers="renderers"
    @change="onChange"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref, watch } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import tokenHoldersSearchSchema from '../token-holders-search.schema.json';
import tokenBalancesSearchUiSchema from './token-balances-table.ui-schema.json';
import { QueryTokenHoldersArgs, TokenHoldersConnection } from '@koiner/sdk';

export default defineComponent({
  name: 'TokenBalancesTable',
  components: { QJsonSearch },
  props: {
    contractIds: {
      required: false,
      type: Array as PropType<Array<string>>,
    },
    addresses: {
      required: false,
      type: Array as PropType<Array<string>>,
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
      uiSchema: tokenBalancesSearchUiSchema,
      request: request,
      renderers: KoinerRenderers,
      onChange: (data: TokenHoldersConnection) => {
        emit('change', data);
      },
    };
  },
});
</script>
