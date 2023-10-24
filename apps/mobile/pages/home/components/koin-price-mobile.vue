<template>
  <counter-metric
    class="token-price"
    :link="{
      to: {
        name: 'mobile.token',
        params: { id: koinerStore.koinContract.id },
      },
    }"
    title="KOIN Price"
    :value="statsStore.formattedKoinPrice"
  >
    <template #title>
      KOIN Price
      <q-icon
        name="help"
        color="grey"
        style="padding-bottom: 3px; font-size: 0.75rem"
        class="q-ml-xs"
      />
      <q-tooltip
        anchor="bottom start"
        self="top left"
        class="bg-primary text-white shadow-4"
        :hide-delay="5000"
      >
        <div class="q-pa-sm q-gutter-xs">
          Price at Mexc Global at
          {{ new Date(statsStore.koinStats.timestamp).toLocaleDateString() }}
          {{ new Date(statsStore.koinStats.timestamp).toLocaleTimeString() }}
        </div>
      </q-tooltip>
    </template>
    <template #footer>
      <div class="stat-footer">
        Ask:
        <span class="stat-footer-stat">
          ${{ statsStore.koinStats.askPrice }}
          <span class="stat-unit"
            >{{ statsStore.koinStats.askQuantity }} KOIN</span
          >
        </span>
      </div>
      <div class="stat-footer" style="padding-top: 0">
        Bid:
        <span class="stat-footer-stat">
          ${{ statsStore.koinStats.bidPrice }}
          <span class="stat-unit"
            >{{ statsStore.koinStats.bidQuantity }} KOIN</span
          >
        </span>
      </div>
    </template>
  </counter-metric>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStatsStore } from 'stores/stats';
import { useKoinerStore } from 'stores/koiner';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';

export default defineComponent({
  name: 'KoinPriceMobile',
  components: {
    CounterMetric,
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
.stat-footer,
.stat-footer .stat-unit {
  font-size: 0.65rem !important;
}

.stat-footer .stat-unit {
  display: none;
}

@media (min-width: 460px) {
  .stat-footer .stat-unit {
    display: inline !important;
  }
}
</style>
