<template>
  <q-carousel
    v-model="statsSlide"
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    control-color="primary"
    animated
    class="stats-carousel"
  >
    <q-carousel-slide :name="1" class="column no-wrap">
      <div class="row">
        <counter-metric
          class="col"
          title="Total Rewarded"
          :value="statsStore.blockProduction.rewarded"
          :unit="koinerStore.koinContract.symbol"
          :token-decimals="koinerStore.koinContract.decimals"
        />

        <counter-metric
          class="col"
          title="VHP Burned"
          :value="statsStore.blockProduction.burned"
          :unit="koinerStore.vhpContract.symbol"
          :token-decimals="koinerStore.vhpContract.decimals"
        />
      </div>
    </q-carousel-slide>
    <q-carousel-slide :name="2" class="column no-wrap">
      <div class="row">
        <counter-metric
          class="col"
          title="ROI"
          :value="statsStore.blockProduction.roi"
          unit="%"
          :decimals="2"
        />

        <counter-metric
          class="col"
          title="Block Producers"
          :value="statsStore.blockProduction.blockProducerCount"
        />
      </div>
    </q-carousel-slide>
  </q-carousel>
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
