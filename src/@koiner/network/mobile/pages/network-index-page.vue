<template>
  <q-page class="row items-start">
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
            <block-producer-stats />

            <block-producers-component :mobile="true" />
          </q-tab-panel>
          <q-tab-panel name="rewards">
            <block-rewards-component />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
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
      statsSlide: ref(1),
      tab,
    };
  },
});
</script>
