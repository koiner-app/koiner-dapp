<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>

    <q-space />

    <search-filters :request="request" search-info="Search by address id" />
  </div>

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :data="{}"
    @change="onChange"
    :additional-renderers="renderers"
  />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import schema from '../token-holders-search.schema.json';
import mobileUiSchema from './token-holders-table.mobile-ui-schema.json';
import desktopUiSchema from './token-holders-table.ui-schema.json';
import { TokenHoldersConnection } from '@koiner/sdk';
import { useTokensStore } from 'stores/tokens';

export default defineComponent({
  name: 'TokenHoldersTable',
  components: { SearchFilters, QJsonSearch },
  props: {
    title: {
      required: false,
      type: String,
    },
    contractId: {
      required: true,
      type: String,
    },
    mobile: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const tokensStore = useTokensStore();
    const handled: Ref<string[]> = ref([]);

    return {
      schema,
      uiSchema: props.mobile ? mobileUiSchema : desktopUiSchema,
      request: {
        filter: {
          contractId: { equals: props.contractId },
        },
      },
      onChange: async (data: TokenHoldersConnection) => {
        if (data.edges) {
          const onChainBalances: Record<string, number> = {};

          data.edges?.forEach((edge) => {
            if (!handled.value.includes(edge.node.addressId)) {
              onChainBalances[edge.node.addressId] = 0;

              // Prevent double handling
              handled.value.push(edge.node.addressId);
            }
          });

          // Fetch on chain balances for all onChainBalances at once
          const balances = await tokensStore.balances(
            props.contractId,
            Object.keys(onChainBalances)
          );

          for (const [address, balance] of Object.entries(balances)) {
            onChainBalances[address] = balance;
          }

          data.edges?.map(async (edge) => {
            // Map on chain balances to results
            if (onChainBalances[edge.node.addressId] != null) {
              edge.node.balance =
                onChainBalances[edge.node.addressId].toString();
            }

            return edge;
          });
        }
      },
      renderers: KoinerRenderers,
    };
  },
});
</script>
