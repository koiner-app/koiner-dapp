<template>
  <q-card class="stats-card" flat>
    <q-card-section>
      <div class="stat-title">Buy $KOIN</div>

      <div class="q-pt-sm">
        <q-btn
          href="https://app.koindx.com/swap"
          target="_blank"
          color="primary"
          size="sm"
          >KoinDX</q-btn
        >
        <q-btn
          href="https://www.mexc.com/en-US/register?inviteCode=mexc-1XbK7"
          target="_blank"
          color="primary"
          size="sm"
          >MEXC</q-btn
        >
        <q-btn
          href="https://www.coinstore.com/"
          target="_blank"
          color="primary"
          size="sm"
          >Coinstore</q-btn
        >
        <q-btn
          href="https://www.chainge.finance/info/currencies/KOIN"
          target="_blank"
          color="primary"
          size="sm"
          >Chainge</q-btn
        >
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
  name: 'ExchangesMobile',
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
.q-btn {
  margin-right: 0.5rem !important;
  margin-bottom: 0.5rem !important;
  border-radius: 8px !important;
}
</style>
