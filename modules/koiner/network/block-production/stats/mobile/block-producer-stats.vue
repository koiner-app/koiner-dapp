<template>
  <div class="column no-wrap q-py-sm">
    <div class="row">
      <div class="col">
        <div style="max-width: 100%">
          <block-producers-chart
            v-if="blockProducers?.edges"
            :block-producers="blockProducers"
            :label-max-length="8"
          />
        </div>
      </div>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <counter-metric
        class="stats-card"
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
        style="width: calc(50% - 1rem) !important"
      />
      <counter-metric
        class="stats-card"
        title="VHP Burned"
        :value="statsStore.blockProduction.burned"
        :unit="koinerStore.vhpContract.symbol"
        :token-decimals="koinerStore.vhpContract.decimals"
        :decimals="0"
        :footer="{
          title: 'Producers',
          value: blockProducers?.edges ? blockProducers.edges.length : 0,
        }"
        style="width: calc(50% - 1rem) !important"
      />
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
