<template>
  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            name="producers"
            class="tab--mobile-network"
            style="padding: 0 !important; min-height: 100vh"
          >
            <block-producer-stats />

            <block-producers-component :mobile="true" />
          </q-tab-panel>
          <q-tab-panel
            name="rewards"
            class="tab--mobile-network"
            style="padding: 0 !important; min-height: 100vh"
          >
            <block-rewards-component :mobile="true" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-page-sticky expand position="top">
      <q-tabs v-model="tab" dense align="justify" style="width: 100%">
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
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import BlockProducersComponent from '../../components/block-production/search/view/block-producers-table.vue';
import BlockRewardsComponent from '../../components/block-production/search/view/block-rewards-table.vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import BlockProducerStats from '@koiner/network/components/block-production/stats/mobile/block-producer-stats.vue';

export default defineComponent({
  name: 'NetworkIndexPage',
  components: {
    BlockProducerStats,
    BlockRewardsComponent,
    BlockProducersComponent,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();

    const tab: Ref<string> = ref('producers');

    return {
      koinerStore,
      statsStore,
      tab,
    };
  },
});
</script>
