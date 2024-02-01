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
          title="APY"
          :value="statsStore.blockProductionApy"
          unit="%"
          :decimals="2"
        />

        <q-separator vertical />

        <counter-metric
          title="Block Producers"
          :value="blockProducers?.edges ? blockProducers.edges.length : ''"
        />
      </q-card-section>
    </q-card>

    <q-card class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <q-tabs v-model="tab" dense align="left" style="width: 100%">
          <q-tab
            class="text-overline"
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
          <q-tab-panel name="producers" class="tab--mobile-network">
            <block-producers-component @change="blockProducersUpdated" />
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
          <block-producers-chart
            v-if="blockProducers?.edges"
            :connection="blockProducers"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import BlockProducersComponent from '../../search/view/block-producers-table.vue';
import BlockRewardsComponent from '../../search/view/block-rewards-table.vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import { BlockProducersConnection } from '@koiner/sdk';
import BlockProducersChart from '../../components/block-producers-chart.vue';

export default defineComponent({
  name: 'NetworkIndexPage',
  components: {
    BlockProducersChart,
    CounterMetric,
    BlockRewardsComponent,
    BlockProducersComponent,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const tab: Ref<string> = ref('producers');
    const blockProducers: Ref<BlockProducersConnection | null> = ref(null);
    const blockProducersPie: Ref<
      Record<string, { percentage: number; vhp: number }>
    > = ref({});

    const blockProducersUpdated = (connection: BlockProducersConnection) => {
      blockProducers.value = connection;
    };

    return {
      koinerStore,
      statsStore,
      tab,

      blockProducers,
      blockProducersUpdated,
      blockProducersPie,

      chartOptions: {
        responsive: true,
      },
    };
  },
});
</script>
