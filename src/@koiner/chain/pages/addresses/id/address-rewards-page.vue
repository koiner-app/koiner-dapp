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

    <q-card flat bordered style="width: 100%">
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Blocks Produced</div>
        <block-rewards-component v-if="id" :producer-ids="[id]" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import BlockRewardsComponent from '@koiner/network/components/block-production/search/view/block-rewards-table.vue';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metric/token-holder-balances-metric.vue';
import { SearchRequestType, useSearchManager } from '@appvise/search-manager';
import { TokenHolder } from '@koiner/sdk';
import { useKoinerStore } from 'stores/koiner';

export default defineComponent({
  name: 'AddressRewardsPage',
  components: {
    BlockRewardsComponent,
    CounterMetric,
    TokenHolderBalancesMetric,
  },

  setup() {
    const koinerStore = useKoinerStore();
    let id: Ref<string | undefined> = ref();
    const route = useRoute();
    const blockProducersSearch = useSearchManager('blockProducers');

    const loadBlockProducer = async () => {
      if (id.value) {
        const request: SearchRequestType = {
          first: 100,
          filter: {
            addressId: {
              equals: id.value,
            },
          },
        };

        await blockProducersSearch.search(request);
      } else {
        blockProducersSearch.reset();
      }
    };

    onMounted(async () => {
      id.value = route.params.id.toString();
      await loadBlockProducer();
    });

    watch(
      () => route.params.id,
      async (newId) => {
        if (newId) {
          id.value = newId.toString();
          await loadBlockProducer();
        }
      }
    );

    return {
      id,
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
