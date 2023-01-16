<template>
  <q-card class="stats-cards" flat bordered>
    <q-card-section horizontal>
      <counter-metric
        class="token-price"
        title="KOIN Price"
        :value="statsStore.formattedKoinPrice"
        :footer="{
          title: 'Marketcap:',
          value: statsStore.formattedFDVMarketCap,
        }"
        :footer-tooltips="[
          {
            title: 'Circulating Marketcap:',
            value: statsStore.formattedMarketCap,
            unit: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Claimed KOIN (that\'s not burned)',
          },
          {
            title: 'Virtual Marketcap',
            value: statsStore.formattedVirtualMarketCap,
            unit: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;KOIN + VHP',
          },
          {
            title: 'Fully Diluted Valuation',
            value: statsStore.formattedFDVMarketCap,
            unit: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When all tokens would be claimed',
          },
        ]"
        :tooltip-title-width="125"
        :tooltip-item-width="250"
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
            title: 'KOIN Circulating Supply',
            value: statsStore.formattedKoinTotalSupply(),
            unit: koinerStore.koinContract.symbol,
          },
          {
            title: 'VHP Total Supply',
            value: statsStore.formattedVhpTotalSupply(),
            unit: koinerStore.vhpContract.symbol,
          },
          {
            title: 'Virtual Supply (KOIN + VHP)',
            value: statsStore.formattedVirtualTotalSupply(),
            unit: koinerStore.koinContract.symbol,
          },
          {
            title: 'Rewarded Koin (inflation)',
            value: statsStore.formattedInflation(),
            unit: koinerStore.koinContract.symbol,
          },
          {
            title: 'Fully Diluted Total Supply',
            value: statsStore.formattedFullyDilutedTotalSupply(),
            unit: koinerStore.koinContract.symbol,
          },
        ]"
        :tooltip-title-width="140"
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
