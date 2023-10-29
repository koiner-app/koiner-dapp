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
import axios from 'axios';
import { koinerConfig } from 'app/koiner.config';
import { useAccountStore } from 'stores/account';
import { round } from 'lodash';

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
    const accountStore = useAccountStore();
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

    const checkerApi = axios.create({
      baseURL: koinerConfig[accountStore.environment].checker,
    });

    const onChainSyncTime = ref(0);

    return {
      schema: tokenHoldersSearchSchema,
      uiSchema: !props.showAddress
        ? tokenAddressBalancesSearchUiSchema // Don't show address
        : tokenBalancesSearchUiSchema,
      request: request,
      renderers: KoinerRenderers,
      onchainLoaded,
      onChange: (data: TokenHoldersConnection) => {
        // Only fetch onchain balances if last time was 10 mins ago
        if (data.edges && onChainSyncTime.value < Date.now() - 600000) {
          onChainSyncTime.value = Date.now();

          data.edges?.map(async (edge) => {
            console.log(
              `get balance: ${edge.node.contractId}/balance/${edge.node.addressId}`
            );

            const response = await checkerApi.get(
              `token/${edge.node.contractId}/balance/${edge.node.addressId}`
            );

            if (response.data) {
              console.log(
                `update balance ${edge.node.contractId}/balance/${edge.node.addressId}: ${response.data}`
              );
              edge.node.balance = round(
                response.data * Math.pow(10, 8),
                8
              ).toString();
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

<style lang="scss">
[id*='#/properties/balance'] {
  opacity: 0 !important;
}
.onchain-loaded [id*='#/properties/balance'] {
  opacity: 1 !important;
}
</style>
