<template>
  <q-card class="stats-card" flat>
    <q-card-section>
      <div class="stat-title">Market Cap</div>
      <div style="font-size: 0.75rem">
        <div class="q-pa-none q-gutter-xs" style="padding-top: 0.8rem">
          <div class="row">
            <div class="mc-title">Circulating:</div>
            <div class="mc-amount">
              {{ statsStore.formattedMarketCap }}
              <span class="stat-unit mc-description"> Claimed KOIN </span>
            </div>
          </div>
          <div class="row">
            <div class="mc-title">Virtual:</div>
            <div class="mc-amount">
              {{ statsStore.formattedVirtualMarketCap }}
              <span class="stat-unit mc-description"> KOIN + VHP </span>
            </div>
          </div>
          <div class="row">
            <div class="mc-title">FDV:</div>
            <div class="mc-amount">
              {{ statsStore.formattedFDVMarketCap }}
              <span class="stat-unit mc-description"> 100% claimed </span>
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
  name: 'MarketCaps',
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
.mc-description {
  display: none !important;
}

@media (min-width: 1024px) {
  .mc-title {
    font-size: 0.65rem !important;
    width: 5.5rem !important;
    line-height: 1.75;
  }

  .mc-amount {
    //width: 5rem !important;
  }
}
@media (min-width: 1320px) {
  .mc-description {
    font-size: 0.625rem !important;
    display: inline !important;
  }
}
@media (min-width: 1480px) {
  .mc-title {
    font-size: 0.75rem !important;
    width: 6.5rem !important;
  }
  .mc-amount {
    //width: 5rem !important;
  }
}
</style>
