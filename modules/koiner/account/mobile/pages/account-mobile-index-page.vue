<template>
  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="portfolio"> Portfolio </q-tab-panel>
          <q-tab-panel name="history"> History </q-tab-panel>
          <q-tab-panel name="rewards"> Rewards </q-tab-panel>
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
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';

export default defineComponent({
  name: 'NetworkIndexPage',
  components: {},

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
