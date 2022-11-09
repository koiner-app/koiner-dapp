<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <token-amount-metric
          name="Total Rewarded"
          :value="statsStore.blockProduction.rewarded"
          :caption="koinerStore.koinContract.symbol"
          :token-decimals="koinerStore.koinContract.decimals"
        />

        <q-separator vertical />

        <token-amount-metric
          name="VHP Burned"
          :value="statsStore.blockProduction.burned"
          :caption="koinerStore.vhpContract.symbol"
          :token-decimals="koinerStore.vhpContract.decimals"
        />

        <q-separator vertical />

        <counter-metric
          name="ROI"
          :value="statsStore.blockProduction.roi"
          caption="%"
          :decimals="2"
        />

        <q-separator vertical />

        <counter-metric
          name="Block Producers"
          :value="statsStore.blockProduction.blockProducerCount"
        />
      </q-card-section>
    </q-card>

    <q-card class="rewards-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Rewards</div>
        <block-rewards-component />
      </q-card-section>
    </q-card>

    <q-card class="producers-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Producers</div>
        <block-producers-component />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BlockProducersComponent from '../components/block-production/search/view/block-producers-table.vue';
import BlockRewardsComponent from '../components/block-production/search/view/block-rewards-table.vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import TokenAmountMetric from '@koiner/components/metrics/token-amount-metric.vue';

export default defineComponent({
  name: 'NetworkIndexPage',
  components: {
    TokenAmountMetric,
    CounterMetric,
    BlockRewardsComponent,
    BlockProducersComponent,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();

    return {
      koinerStore,
      statsStore,
    };
  },
});
</script>

<style lang="scss" scoped>
.rewards-card {
  width: 100%;
  max-width: calc(60% - 24px);
}
.producers-card {
  width: 100%;
  max-width: calc(40% - 24px);
}
</style>
