<template>
  <q-page
    v-if="tokenHolders && tokenHolders.length > 0"
    class="row items-start"
  >
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <token-holder-balances-metric
          title="Rewards"
          :token-holders="tokenHolders"
        />
        <q-separator vertical />
        <token-holder-balances-metric
          v-if="vhpBurners && vhpBurners.length > 0"
          title="VHP Burned"
          :token-holders="vhpBurners"
          :contract="koinerStore.vhpContract"
        />
        <q-separator vertical />
        <!--        <counter-metric title="ROI" :value="apy" :decimals="2" unit="%" />-->
        <!--        <q-separator vertical />-->
        <counter-metric
          v-if="blockProducersSearch.connection.value"
          title="Blocks Produced"
          :value="blocksProduced"
        />
      </q-card-section>
    </q-card>

    <q-card flat bordered style="width: 100%">
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Blocks Produced</div>
        <block-rewards-component
          v-if="address.id"
          :producer-ids="[address.id]"
        />
      </q-card-section>
    </q-card>
  </q-page>

  <q-page class="row items-start" v-else>
    <q-card flat bordered style="width: 100%">
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Not a producer</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, watch } from 'vue';
import BlockRewardsComponent from '@koiner/network/block-production/search/view/block-rewards-table.vue';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metric/token-holder-balances-metric.vue';
import { SearchRequestType, useSearchManager } from '@appvise/search-manager';
import { Address, TokenHolder } from '@koiner/sdk';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';

export default defineComponent({
  name: 'AddressRewardsPage',
  components: {
    BlockRewardsComponent,
    CounterMetric,
    TokenHolderBalancesMetric,
  },
  props: {
    address: {
      required: true,
      type: Object as PropType<Address>,
    },
  },

  setup(props) {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const blockProducersSearch = useSearchManager('blockProducers');

    const loadBlockProducer = async () => {
      if (props.address?.id) {
        const request: SearchRequestType = {
          first: 100,
          filter: {
            addressId: {
              equals: props.address.id,
            },
          },
        };

        await blockProducersSearch.search(request);
      } else {
        blockProducersSearch.reset();
      }
    };

    onMounted(async () => {
      await loadBlockProducer();
    });

    watch(
      () => props.address.id,
      async () => {
        await loadBlockProducer();
      }
    );

    return {
      koinerStore,
      blockProducersSearch,

      tokenHolders: computed(() => {
        return blockProducersSearch.connection.value?.edges?.map((edge) => {
          return {
            addressId: edge.node.addressId,
            balance: edge.node.balance,
            contract: koinerStore.koinContract,
            contractId: koinerStore.koinContract.id,
          } as TokenHolder;
        });
      }),
      vhpBurners: computed(() => {
        // Transform BlockProducer profits to TokenHolder for input of component
        return blockProducersSearch.connection.value?.edges?.map((edge) => {
          return {
            addressId: edge.node.addressId,
            balance: edge.node.burnedTotal,
            contract: koinerStore.vhpContract,
            contractId: koinerStore.vhpContract.id,
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
      burnedTotal: computed(() => {
        let burnedTotal = 0;

        blockProducersSearch.connection.value?.edges?.forEach((edge) => {
          burnedTotal += parseInt(edge.node.burnedTotal);
        });

        return burnedTotal;
      }),
      apy: computed(() => {
        return statsStore.blockProductionApy;
      }),
    };
  },
});
</script>
