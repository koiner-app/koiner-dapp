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
                :class="`text-caption text-${
                  koinosStore.price.change24hPercentage > 0
                    ? 'positive'
                    : 'negative'
                }`"
                >({{ koinosStore.formattedPriceChange24hPercentage }})</span
              >
            </div>
            <div class="text-caption">
              <br />Marketcap: <span class="market-cap">{{ koinosStore.formattedMarketCap }}</span>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-separator vertical />

      <q-card class="stats-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">VHP</div>
            <div class="text-h4 q-mt-sm q-mb-xs">
              1154851
              <br />&nbsp; <br />&nbsp;
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-separator vertical />

      <q-card class="stats-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Transactions</div>
            <div class="text-h4 q-mt-sm q-mb-xs">12354</div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-separator vertical />

      <q-card class="stats-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Producers</div>
            <div class="text-h4 q-mt-sm q-mb-xs">
              15
              <br />&nbsp; <br />&nbsp;
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useKoinosStore } from 'stores/koinos';

export default defineComponent({
  name: 'KoinosHomeStatsComponent',
  components: {},

  setup() {
    const koinosStore = useKoinosStore();

    return {
      koinosStore,
    };
  },
});
</script>
