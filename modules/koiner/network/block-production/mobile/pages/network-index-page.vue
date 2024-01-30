<template>
  <q-header reveal elevated>
    <q-toolbar>
      <q-separator dark vertical inset class="lt-md" />
      <q-toolbar-title>
        <span class="page-title"> Network </span>
      </q-toolbar-title>

      <q-space />

      <share-dialog
        :url="`https://koiner.app/mobile/network`"
        :message="`Check Koinos block producers on Koiner`"
      />
      <account-menu-mobile />
    </q-toolbar>
  </q-header>

  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated swipeable>
          <q-tab-panel name="producers" class="tab--mobile-network">
            <block-producer-stats />

            <block-producers-component :mobile="true" />
          </q-tab-panel>
          <q-tab-panel name="rewards" class="tab--mobile-table">
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
import { defineComponent, onMounted, ref, Ref } from 'vue';
import BlockProducersComponent from '../../search/view/block-producers-table.vue';
import BlockRewardsComponent from '../../search/view/block-rewards-table.vue';
import BlockProducerStats from '@koiner/network/block-production/stats/mobile/block-producer-stats.vue';
import { useStatsStore } from 'stores/stats';
import { useRoute } from 'vue-router';
import ShareDialog from '@koiner/components/share-dialog.vue';
import AccountMenuMobile from '@koiner/components/account-menu-mobile.vue';

export default defineComponent({
  name: 'NetworkIndexPage',
  components: {
    AccountMenuMobile,
    ShareDialog,
    BlockProducerStats,
    BlockRewardsComponent,
    BlockProducersComponent,
  },

  setup() {
    const route = useRoute();
    const statsStore = useStatsStore();
    const tab: Ref<string> = ref('producers');

    onMounted(() => {
      if (route.query['tab']) {
        tab.value = route.query['tab'].toString();
      }

      // Make sure we have the latest height
      statsStore.loadHeight();
    });

    return {
      tab,
    };
  },
});
</script>
