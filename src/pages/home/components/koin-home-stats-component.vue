<template>
  <q-card class="stats-cards" flat bordered>
    <q-card-section horizontal>
      <q-card class="stats-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">KOIN Price</div>
            <div class="text-h4 q-mt-sm q-mb-xs token-price">
              {{ koinosStore.formattedPrice }}
              <span
                v-if="koinosStore.formattedPriceChange24hPercentage"
                :class="`text-caption text-${
                  koinosStore.price.change24hPercentage > 0
                    ? 'positive'
                    : 'negative'
                }`"
                >({{ koinosStore.formattedPriceChange24hPercentage }})</span
              >
            </div>
            <div class="text-caption">
              <br />Marketcap:
              <span class="market-cap">{{
                koinosStore.formattedMarketCap
              }}</span>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-separator vertical />

      <counter-metric
        name="Transactions"
        :value="statsStore.chainStats.transactionCount"
      />

      <q-separator vertical />

      <counter-metric
        name="Token Transfers"
        :value="statsStore.tokenStats.transferCount"
      />

      <q-separator vertical />

      <counter-metric
        name="Addresses"
        :value="statsStore.chainStats.addressCount"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useKoinosStore } from 'stores/koinos';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';

export default defineComponent({
  name: 'KoinosHomeStatsComponent',
  components: { CounterMetric },

  setup() {
    const koinosStore = useKoinosStore();
    const statsStore = useStatsStore();

    return {
      koinosStore,
      statsStore,
    };
  },
});
</script>
