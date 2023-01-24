<template>
  <div class="column no-wrap q-py-sm">
    <div class="row">
      <counter-metric
        class="col"
        title="Total Rewarded"
        :value="statsStore.blockProduction.rewarded"
        :unit="koinerStore.koinContract.symbol"
        :token-decimals="koinerStore.koinContract.decimals"
        :decimals="0"
      />

      <counter-metric
        class="col"
        title="VHP Burned"
        :value="statsStore.blockProduction.burned"
        :unit="koinerStore.vhpContract.symbol"
        :token-decimals="koinerStore.vhpContract.decimals"
        :decimals="0"
      />
    </div>
    <div class="row no-pt">
      <counter-metric
        class="col"
        title="APY"
        :value="statsStore.blockProductionApy"
        unit="%"
        :decimals="2"
      />

      <counter-metric
        class="col"
        title="Block Producers"
        :value="statsStore.blockProduction.blockProducerCount"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';

export default defineComponent({
  name: 'BlockProducerStats',
  components: {
    CounterMetric,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();

    const tab: Ref<string> = ref('producers');

    return {
      koinerStore,
      statsStore,
      statsSlide: ref(1),
      tab,
    };
  },
});
</script>
