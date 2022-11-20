<template>
  <q-card class="stats-cards" flat bordered>
    <q-card-section horizontal>
      <counter-metric
        class="token-price"
        title="KOIN Price"
        :value="koinosStore.formattedPrice"
        :unit="`(${koinosStore.formattedPriceChange24hPercentage})`"
        :unit-class="`text-${
          koinosStore.price.change24hPercentage > 0 ? 'positive' : 'negative'
        }`"
        :footer="{
          title: 'Marketcap:',
          value: koinosStore.formattedMarketCap,
        }"
      />

      <q-separator vertical />

      <counter-metric
        title="Burned Koin"
        :value="statsStore.totalSupply.burned"
        unit="%"
        :decimals="2"
        :footer="{
          title: 'Virtual Supply:',
          value: statsStore.formattedVirtualTotalSupply(),
          unit: koinerStore.koinContract.symbol,
        }"
        :footer-tooltips="[
          {
            title: 'KOIN Total Supply',
            value: statsStore.formattedKoinTotalSupply(),
            unit: koinerStore.koinContract.symbol,
          },
          {
            title: 'VHP Total Supply',
            value: statsStore.formattedVhpTotalSupply(),
            unit: koinerStore.vhpContract.symbol,
          },
        ]"
      />

      <q-separator vertical />

      <counter-metric
        title="Transactions"
        :value="statsStore.chainStats.transactionCount"
        :footer="{
          title: 'Token transfer events:',
          value: statsStore.tokenStats.transferCount,
        }"
      />

      <q-separator vertical />

      <counter-metric
        title="Claimed Koin"
        :value="statsStore.totalSupply.claimed"
        unit="%"
        :decimals="2"
        :footer="{
          title: 'Total accounts:',
          value: statsStore.chainStats.addressCount,
        }"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useKoinosStore } from 'stores/koinos';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';

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
    };
  },
});
</script>
