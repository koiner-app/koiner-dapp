<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <token-holder-balances-metric
          v-if="blockProducersSearch.connection.value"
          title="Rewards"
          :token-holders="tokenHolders"
        />
        <q-separator vertical />
        <counter-metric name="VHP" :value="0" />
        <q-separator vertical />
        <counter-metric name="ROI" :value="0" />
        <q-separator vertical />
        <counter-metric
          v-if="blockProducersSearch.connection.value"
          name="Blocks Produced"
          :value="blocksProduced"
        />
      </q-card-section>
    </q-card>

    <q-card class="transactions-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Blocks Produced</div>
        <block-rewards-component
          v-if="addressFilter.length > 0"
          :producer-ids="addressFilter"
        />
      </q-card-section>
    </q-card>

    <q-card class="blocks-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Addresses</div>

        <div class="q-pa-lg">
          <account-addresses-filter @change="updateFilter" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue';
import BlockRewardsComponent from '@koiner/network/components/block-production/search/view/block-rewards-table.vue';
import AccountAddressesFilter from '@koiner/chain/components/address/account-addresses-filter.vue';
import { SearchRequestType, useSearchManager } from '@appvise/search-manager';
import { koinerConstants } from '@koiner/koiner-constants';
import { TokenHolder } from '@koiner/sdk';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metric/token-holder-balances-metric.vue';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';

export default defineComponent({
  name: 'AccountRewardsPage',
  components: {
    AccountAddressesFilter,
    BlockRewardsComponent,
    CounterMetric,
    TokenHolderBalancesMetric,
  },

  setup() {
    const addressFilter: Ref<string[]> = ref([]);
    const blockProducersSearch = useSearchManager('blockProducers');

    watch(
      addressFilter,
      async () => {
        if (addressFilter.value.length > 0) {
          const request: SearchRequestType = {
            first: 100,
            filter: {
              AND: [
                {
                  OR: addressFilter.value.map((address) => {
                    return {
                      addressId: {
                        equals: address,
                      },
                    };
                  }),
                },
              ],
            },
          };

          await blockProducersSearch.search(request);
        } else {
          blockProducersSearch.reset();
        }
      },
      { deep: true }
    );

    const updateFilter = (newFilter: string[]) => {
      addressFilter.value = newFilter;
    };

    return {
      addressFilter,
      updateFilter,
      blockProducersSearch,

      tokenHolders: computed(() => {
        return blockProducersSearch.connection.value?.edges?.map((edge) => {
          return {
            addressId: edge.node.addressId,
            balance: edge.node.balance,
            contract: {
              id: koinerConstants.contracts.koin,
              name: 'Test Koinos',
              symbol: 'KOIN',
              decimals: 8,
            },
            contractId: koinerConstants.contracts.koin,
          } as TokenHolder;
        });
      }),
      blocksProduced: computed(() => {
        let total = 0;

        blockProducersSearch.connection.value?.edges?.forEach(
          (blockProducerEdge) => {
            total += blockProducerEdge.node.blocksProduced;
          }
        );

        return total;
      }),
    };
  },
});
</script>
