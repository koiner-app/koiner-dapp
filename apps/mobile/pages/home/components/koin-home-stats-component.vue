<template>
  <div class="large-stats-cards">
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
      :footer="{
        title: 'Marketcap:',
        value: statsStore.formattedFDVMarketCap,
      }"
      :footer-tooltips="[
        {
          title: 'Circulating Marketcap:',
          value: statsStore.formattedMarketCap,
          unit: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Claimed KOIN (not burned)',
        },
        {
          title: 'Virtual Marketcap',
          value: statsStore.formattedVirtualMarketCap,
          unit: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;KOIN + VHP',
        },
        {
          title: 'Fully Diluted Valuation',
          value: statsStore.formattedFDVMarketCap,
          unit: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When all tokens claimed',
        },
      ]"
      :footer-tooltip-hide-delay="10000"
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
        <div class="text-center" style="padding-top: 1.75rem">
          <mana-bar />
        </div>
      </q-card-section>
    </q-card>

    <counter-metric
      title="Burned Koin"
      :link="{
        to: {
          name: 'mobile.network',
        },
      }"
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
      :footer-tooltip-hide-delay="10000"
      :tooltip-title-width="140"
      :tooltip-item-width="100"
    />

    <block-producers-statuses
      v-if="blockProductionStore.addressesFilter.length > 0"
    />

    <counter-metric
      title="Latest block"
      class="large-number-stat"
      :link="{
        to: {
          name: 'mobile.block',
          params: { height: statsStore.chainStats.height },
        },
      }"
      :value="statsStore.chainStats.height"
      :footer="{
        title: 'Total Tx:',
        value: statsStore.chainStats.transactionCount,
      }"
    />

    <counter-metric
      title="Token transfers"
      class="large-number-stat"
      :link="{
        to: {
          name: 'mobile.tokenize',
          query: { tab: 'token-operations' },
        },
      }"
      :value="statsStore.tokenStats.transferCount"
      :footer="{
        title: 'Tokens:',
        value: statsStore.tokenStats.contractCount,
      }"
    />

    <counter-metric
      title="Claimed Koin"
      :link="{
        to: {
          name: 'mobile.token',
          params: { id: koinerStore.koinContract.id },
        },
      }"
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
import { useAccountStore } from 'stores/account';
import { useBlockProductionStore } from 'stores/block-production';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import ManaBar from '@koiner/components/mana-bar.vue';
import BlockProducersStatuses from '@koiner/network/block-production/block-producers-statuses.vue';

export default defineComponent({
  name: 'KoinosHomeStatsComponent',
  components: { BlockProducersStatuses, ManaBar, CounterMetric },
  setup() {
    const koinosStore = useKoinosStore();
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const accountStore = useAccountStore();
    const blockProductionStore = useBlockProductionStore();

    return {
      koinosStore,
      koinerStore,
      statsStore,
      accountStore,
      blockProductionStore,
      manaCharged: ref(0),
    };
  },
});
</script>
