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

      <q-card class="stats-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Burned Koin</div>
            <div class="text-h4 q-mt-sm q-mb-xs">
              {{ formattedBurn }}
              <span style="font-size: 1.25rem">%</span>
            </div>
            <div
              class="text-caption"
              v-if="statsStore.totalSupply.virtualTotalSupply"
            >
              <br />Virtual Supply:
              <span class="market-cap"
                >{{ statsStore.formattedVirtualTotalSupply() }} KOIN
              </span>
              <q-tooltip
                anchor="bottom start"
                self="top left"
                class="bg-primary text-white shadow-4"
              >
                <div class="q-pa-sm q-gutter-xs">
                  <div class="row q-gutter-xs">
                    <div class="col" style="min-width: 100px">KOIN Total Supply</div>
                    <div class="col">
                      {{ statsStore.formattedKoinTotalSupply() }}
                      &nbsp;
                      {{ koinerStore.koinContract.symbol }}
                    </div>
                  </div>
                  <div class="row q-gutter-xs">
                    <div class="col" style="min-width: 100px">VHP Total Supply</div>
                    <div class="col">
                      {{ statsStore.formattedVhpTotalSupply() }}
                      &nbsp;
                      {{ koinerStore.vhpContract.symbol }}
                    </div>
                  </div>
                </div>
              </q-tooltip>
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
        name="Addresses"
        :value="statsStore.chainStats.addressCount"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useKoinosStore } from 'stores/koinos';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import { round } from 'lodash';

export default defineComponent({
  name: 'KoinosHomeStatsComponent',
  components: { CounterMetric },

  setup() {
    const koinosStore = useKoinosStore();
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();

    return {
      koinosStore,
      koinerStore,
      statsStore,
      formattedBurn: computed(() => {
        return round(statsStore.totalSupply.burned ?? 0, 2).toLocaleString();
      }),
    };
  },
});
</script>
