<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>

    <q-space />

    <search-filters
      class="token-contracts-filters"
      :request="request"
      search-info="Search token name, symbol or contract id"
    />
  </div>

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :data="{}"
    @change="onChange"
    @on-scroll="onScroll"
    :scroll-position="position"
    :additional-renderers="renderers"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import schema from '../token-contracts-search.schema.json';
import mobileUiSchema from './token-contracts-table.mobile-ui-schema.json';
import desktopUiSchema from './token-contracts-table.ui-schema.json';
import { TokenContractsConnection } from '@koiner/sdk';
import { useTokensStore } from 'stores/tokens';

export default defineComponent({
  name: 'TokenContractsTable',
  components: { SearchFilters, QJsonSearch },
  props: {
    title: {
      required: false,
      type: String,
    },
    mobile: {
      required: false,
      type: Boolean,
      default: false,
    },
    liquidityPools: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
  emits: ['contractCountUpdated'],

  setup(props, { emit }) {
    const searchStore = useSearchStore();
    const tokensStore = useTokensStore();
    const loadingOnChain = ref(false);

    const onScroll = (newScrollPosition: number) => {
      searchStore.tokenContracts.position = newScrollPosition;
    };

    const onChange = async (data: TokenContractsConnection) => {
      if (data.edges) {
        if (loadingOnChain.value) {
          return;
        }

        loadingOnChain.value = true;

        const tokenIds = data.edges.map((edge) => edge.node.id);
        const supplies = await tokensStore.supplies(tokenIds);

        data.edges.map(async (edge) => {
          if (supplies[edge.node.id] != null) {
            edge.node.totalSupply = supplies[edge.node.id].toString();
          }

          return edge;
        });

        loadingOnChain.value = false;
      }

      emit('contractCountUpdated', data?.edges ? data.edges.length : 0);
    };

    return {
      onScroll,
      onChange,
      schema,
      uiSchema: props.mobile ? mobileUiSchema : desktopUiSchema,
      request: props.liquidityPools
        ? {
            filter: {
              name: {
                iContains: 'LIQUIDITY',
              },
            },
          }
        : {
            filter: {
              AND: [
                {
                  name: {
                    excludes: 'LIQUIDITY POOL',
                  },
                },
                {
                  name: {
                    excludes: 'Token',
                  },
                },
                {
                  name: {
                    excludes: 'Test',
                  },
                },
                {
                  name: {
                    excludes: 'test',
                  },
                },
                {
                  id: {
                    // Bitcoin
                    excludes: '1BzymN6NwNyQszkEPkmSjnCLxpLpxHF4p7',
                  },
                },
                {
                  id: {
                    // Test Ethereum
                    excludes: '1HZEzcttxD2HKVXdAHJwipLzix4NENMVjK',
                  },
                },
                {
                  id: {
                    excludes: '1Gov26MjgHcRP95p8WaqVNBRLVmZSThkxP',
                  },
                },
                {
                  id: {
                    excludes: '1H3NBeKhbjiviqNUqvf35ZgDJEWt9hrmmN',
                  },
                },
                {
                  id: {
                    excludes: '1LnmquvXUKPS18dFszBCvkLD9WiBsUt8eq',
                  },
                },
                {
                  id: {
                    excludes: '16QqxFiift3FhBBaNCJiGoZUivx44Seqxe',
                  },
                },
              ],
            },
          },
      position: searchStore.tokenContracts.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>

<style lang="scss">
.token-contracts-filters .wildcard-search.q-field--highlighted {
  width: 400px !important;
}
</style>
