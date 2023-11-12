<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>
  </div>

  <q-space />

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :data="{}"
    :additional-renderers="renderers"
    @change="onChange"
    :class="onchainLoaded ? 'onchain-loaded' : ''"
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
import { useTokensStore } from 'stores/tokens';

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
    const tokensStore = useTokensStore();

    let request: Ref<QueryTokenHoldersArgs> = ref({ filter: {} });
    let contractIdsFilter: any;
    let addressFilter: any;
    const onchainLoaded = ref(false);

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
      request: request,
      renderers: KoinerRenderers,
      onchainLoaded,
      onChange: (data: TokenHoldersConnection) => {
        if (data.edges) {
          data.edges?.map(async (edge) => {
            const balance = await tokensStore.balance(
              edge.node.contractId,
              edge.node.addressId
            );

            if (balance != null) {
              edge.node.balance = balance.balance.toString();
            }

            return edge;
          });
        }

        emit('change', data);

        onchainLoaded.value = true;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
[id*='#/properties/balance'] {
  opacity: 0 !important;
}
.onchain-loaded [id*='#/properties/balance'] {
  opacity: 1 !important;
}
</style>
