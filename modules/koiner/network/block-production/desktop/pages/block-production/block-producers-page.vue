<template>
  <q-page class="row items-baseline justify-evenly">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      control-color="primary"
      animated
      class="stats-carousel lt-lg"
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

    <div class="row stats-cards gt-md">
      <div class="col-6 col-md-3">
        <counter-metric
          title="Total Rewarded"
          :value="statsStore.blockProduction.rewarded"
          :caption="koinerStore.koinContract.symbol"
          :token-decimals="koinerStore.koinContract.decimals"
        />
      </div>

      <div class="col-6 col-md-3">
        <counter-metric
          title="VHP Burned"
          :value="statsStore.blockProduction.burned"
          :caption="koinerStore.vhpContract.symbol"
          :token-decimals="koinerStore.vhpContract.decimals"
        />
      </div>

      <div class="col-6 col-md-3">
        <counter-metric
          title="ROI"
          :value="statsStore.blockProduction.roi"
          unit="%"
          :decimals="2"
        />
      </div>

      <div class="col-6 col-md-3">
        <counter-metric
          title="Block Producers"
          :value="statsStore.blockProduction.blockProducerCount"
        />
      </div>
    </div>

    <q-card class="table-card shadow-1">
      <q-card-section>
        <block-producers-component title="Producers" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BlockProducersComponent from '../../../search/view/block-producers-table.vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';

export default defineComponent({
  name: 'ProducersPage',
  components: {
    CounterMetric,
    BlockProducersComponent,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();

    return {
      koinerStore,
      statsStore,
      slide: ref(1),
    };
  },
});
</script>
