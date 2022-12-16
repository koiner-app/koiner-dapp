<template>
  <q-page class="row items-start">
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <counter-metric
          title="Total Rewarded"
          :value="statsStore.blockProduction.rewarded"
          :unit="koinerStore.koinContract.symbol"
          :decimals="0"
          :token-decimals="koinerStore.koinContract.decimals"
        />

        <q-separator vertical />

        <counter-metric
          title="VHP Burned"
          :value="statsStore.blockProduction.burned"
          :unit="koinerStore.vhpContract.symbol"
          :decimals="0"
          :token-decimals="koinerStore.vhpContract.decimals"
        />

        <q-separator vertical />

        <counter-metric
          title="ROI"
          :value="statsStore.blockProductionApy"
          unit="%"
          :decimals="2"
        />

        <q-separator vertical />

        <counter-metric
          title="Block Producers"
          :value="statsStore.blockProduction.blockProducerCount"
        />
      </q-card-section>
    </q-card>

    <q-card class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <q-tabs v-model="tab" dense align="left" style="width: 100%">
          <q-tab
            class="text-overline lt-lg"
            :ripple="false"
            label="Producers"
            name="producers"
          />
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Rewards"
            name="rewards"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="producers">
            <block-producers-component />
          </q-tab-panel>
          <q-tab-panel name="rewards">
            <block-rewards-component />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-card class="search-card gt-md" flat bordered>
      <q-card-section>
        <div class="text-overline">Producers</div>

        <div class="search-card-content">
          <block-producers-component />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import BlockProducersComponent from '../../components/block-production/search/view/block-producers-table.vue';
import BlockRewardsComponent from '../../components/block-production/search/view/block-rewards-table.vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import { useWindowSize } from '@vueuse/core';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NetworkIndexPage',
  components: {
    CounterMetric,
    BlockRewardsComponent,
    BlockProducersComponent,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const router = useRouter();

    const { width } = useWindowSize();

    const tab: Ref<string> = ref(width.value < 1440 ? 'producers' : 'rewards');

    watch(width, () => {
      if (width.value > 1439.99 && tab.value === 'producers') {
        tab.value = 'rewards';
      }

      if (width.value < 1024) {
        router.push({ name: 'network.block-producers' });
      }
    });

    onMounted(() => {
      if (width.value < 1024) {
        router.push({ name: 'network.block-producers' });
      }
    });

    return {
      koinerStore,
      statsStore,
      tab,
    };
  },
});
</script>
