<template>
  <q-card class="stats-card" flat>
    <q-card-section>
      <div class="stat-title">Market Cap</div>

      <div style="font-size: 0.75rem">
        <div class="q-pa-none q-gutter-xs">
          <div class="row">
            <div class="mc-title">Circulating MC</div>
            <div class="mc-amount">
              {{ statsStore.formattedMarketCap }}
            </div>
          </div>
          <div class="row">
            <div class="mc-title">
              Virtual MC
              <span class="stat-unit mc-description"> (KOIN + VHP) </span>
            </div>
            <div class="mc-amount">
              {{ statsStore.formattedFDVMarketCap }}
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useKoinosStore } from 'stores/koinos';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';

export default defineComponent({
  name: 'MarketCapsMobile',
  setup() {
    const koinosStore = useKoinosStore();
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();

    return {
      koinosStore,
      koinerStore,
      statsStore,
    };
  },
});
</script>

<style lang="scss" scoped>
.mc-description-full {
  display: none !important;
}

@media (min-width: 400px) {
  .mc-description-short {
    display: inline !important;
  }
}

@media (min-width: 460px) {
  .mc-description-short {
    display: none !important;
  }
  .mc-description-full {
    display: inline !important;
  }
}
.mc-title {
  font-size: 0.65rem !important;
  width: 100% !important;
  line-height: 1.75;
}

.mc-amount {
  //width: 5rem !important;
}

.mc-description {
  font-size: 0.625rem !important;
}
</style>
