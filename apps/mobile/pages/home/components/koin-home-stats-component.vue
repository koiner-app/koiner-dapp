<template>
  <div class="large-stats-cards">
    <counter-metric
      class="token-price"
      title="KOIN Price"
      :value="statsStore.formattedKoinPrice"
      :footer="{
        title: 'Marketcap:',
        value: statsStore.formattedVirtualFDVMarketCap,
      }"
      :footer-tooltips="[
        {
          title: 'Circulating Marketcap:',
          value: statsStore.formattedMarketCap,
          unit: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Claimed KOIN (not burned)',
        },
        {
          title: 'Virtual Marketcap',
          value: statsStore.formattedVirtualMarketCap,
          unit: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;KOIN + VHP',
        },
        {
          title: 'Fully Diluted Valuation',
          value: statsStore.formattedFDVMarketCap,
          unit: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All tokens claimed',
        },
        {
          title: 'FDV Virtual MC',
          value: statsStore.formattedVirtualFDVMarketCap,
          unit: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All tokens claimed + VHP',
        },
      ]"
      :footer-tooltip-hide-delay="4000"
      :tooltip-title-width="110"
      :tooltip-item-width="200"
    />

    <q-card
      class="stats-card"
      flat
      v-if="accountStore.addressesFilter.length > 0"
    >
      <q-card-section>
        <div class="stat-title">
          Mana
          <q-icon
            @click="accountStore.loadOnChainBalances"
            flat
            class="absolute-top-right"
            name="sync"
            style="
              opacity: 0.5;
              font-size: 0.875rem;
              margin: 1.375rem 1.375rem 0 0;
            "
          ></q-icon>
        </div>
        <div class="text-center" style="padding-top: 1.75rem;">
          <mana-bar />
        </div>
      </q-card-section>
    </q-card>

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
      :footer-tooltip-hide-delay="4000"
      :tooltip-title-width="110"
      :tooltip-item-width="100"
    />

    <counter-metric
      title="Transactions"
      :value="statsStore.chainStats.transactionCount"
      :footer="{
        title: 'Token transfer events:',
        value: statsStore.tokenStats.transferCount,
      }"
    />

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

    <q-card class="stats-card" flat>
      <q-card-section>
        <div class="stat-title">Exchanges</div>

        <div class="text-center q-pt-lg">
          <q-btn
            href="https://www.mexc.com/en-US/register?inviteCode=mexc-1XbK7"
            target="_blank"
            solid
            color="primary"
            size="sm"
            class="q-mb-md"
            style="border-radius: 8px"
            >MEXC Global</q-btn
          >
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useKoinosStore } from 'stores/koinos';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import { useAccountStore } from 'stores/account';
import ManaBar from '@koiner/components/mana-bar.vue';

export default defineComponent({
  name: 'KoinosHomeStatsComponent',
  components: { ManaBar, CounterMetric },
  setup() {
    const koinosStore = useKoinosStore();
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const accountStore = useAccountStore();

    return {
      koinosStore,
      koinerStore,
      statsStore,
      accountStore,
      manaCharged: ref(0),
    };
  },
});
</script>
