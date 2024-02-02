<template>
  <div class="column no-wrap q-py-sm">
    <div class="row">
      <div class="col">
        <div style="max-width: 100%">
          <block-producers-chart
            v-if="blockProducers?.edges"
            :block-producers="blockProducers"
          />
        </div>
      </div>
    </div>
    <div class="row q-pb-lg">
      <div class="col-6 text-center">
        <counter-metric
          class="col"
          title="Total Rewarded"
          :value="statsStore.blockProduction.rewarded"
          :unit="koinerStore.koinContract.symbol"
          :token-decimals="koinerStore.koinContract.decimals"
          :decimals="0"
          :footer="{
            title: 'APY',
            value: parseFloat(
              statsStore.blockProductionApy.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })
            ),
            unit: '%',
          }"
        />
      </div>
      <div class="col-6 text-center">
        <counter-metric
          class="col"
          title="VHP Burned"
          :value="statsStore.blockProduction.burned"
          :unit="koinerStore.vhpContract.symbol"
          :token-decimals="koinerStore.vhpContract.decimals"
          :decimals="0"
          :footer="{
            title: 'Producers',
            value: blockProducers?.edges ? blockProducers.edges.length : 0,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from 'vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import BlockProducersChart from '@koiner/network/block-production/components/block-producers-chart.vue';
import { BlockProducersConnection } from '@koiner/sdk';

export default defineComponent({
  name: 'BlockProducerStats',
  components: {
    BlockProducersChart,
    CounterMetric,
  },
  props: {
    blockProducers: {
      required: true,
      type: Object as PropType<BlockProducersConnection>,
    },
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
