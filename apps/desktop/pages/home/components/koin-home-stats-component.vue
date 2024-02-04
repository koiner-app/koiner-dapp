<template>
  <q-card class="stats-cards" flat bordered>
    <q-card-section horizontal>
      <counter-metric
        class="token-price"
        title="KOIN Price"
        :value="statsStore.formattedKoinPrice"
        :footer="{
          title: 'Transactions:&nbsp;',
          value: statsStore.chainStats.transactionCount,
        }"
        :footer-tooltips="[
          {
            title: 'Token transfer events:',
            value: statsStore.tokenStats.transferCount,
          },
        ]"
        :tooltip-title-width="125"
        :tooltip-item-width="250"
        :footer2="{
          title: 'Gas Fees Paid:',
          value: 0,
          unitPrefix: '$ ',
        }"
      />

      <q-separator vertical />

      <market-caps />

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
import MarketCaps from '@desktop/pages/home/components/market-caps.vue';

export default defineComponent({
  name: 'KoinosHomeStatsComponent',
  components: { MarketCaps, CounterMetric },
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
