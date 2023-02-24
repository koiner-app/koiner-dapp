<template>
  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat bordered v-if="height">
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            name="portfolio"
            style="padding: 0 !important; min-height: 100vh"
          >
            <q-card class="stats-card" flat>
              <q-card-section>
                <div class="text-caption">Block</div>
                <div class="stat-title">{{ height }}</div>
              </q-card-section>
              <q-card-section> ... </q-card-section>
            </q-card>
          </q-tab-panel>

          <q-tab-panel
            name="rewards"
            class="tab--mobile-network"
            style="padding: 0 !important; min-height: 100vh"
          >
            ...
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-page-sticky expand position="top">
      <q-tabs v-model="tab" dense align="justify" style="width: 100%">
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Portfolio"
          name="portfolio"
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
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'BlockMobilePage',
  components: {},

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const route = useRoute();

    const height: Ref<string | undefined> = ref();
    const tab: Ref<string> = ref('portfolio');

    onMounted(async () => {
      height.value = route.params.height.toString();
    });

    watch(
      () => route.params.height,
      async (newHeight) => {
        if (newHeight) {
          height.value = newHeight.toString();

          await loadBlock();
        }
      }
    );

    const loadBlock = async () => {
      //
    };

    onMounted(async () => {
      await loadBlock();
    });

    return {
      height,
      tab,
      koinerStore,
      statsStore,
    };
  },
});
</script>
