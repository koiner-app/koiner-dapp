<template>
  <q-header reveal elevated>
    <q-toolbar>
      <q-separator dark vertical inset class="lt-md" />
      <q-toolbar-title>
        <span class="page-title"> Coins </span>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>

  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="coins" class="tab--mobile-table">
            <token-contracts-table :mobile="true" :liquidity-pools="false" />
          </q-tab-panel>
          <q-tab-panel name="liquidity-pools" class="tab--mobile-table">
            <token-contracts-table :mobile="true" :liquidity-pools="true" />
          </q-tab-panel>
          <q-tab-panel name="token-operations" class="tab--mobile-table">
            <tokens-operations-table :mobile="true" />
          </q-tab-panel>
          <q-tab-panel name="token-events" class="tab--mobile-table">
            <tokens-events-table :mobile="true" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-page-sticky expand position="top">
      <q-tabs v-model="tab" dense align="justify" style="width: 100%">
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Coins"
          name="coins"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Liquidity Pools"
          name="liquidity-pools"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Operations"
          name="token-operations"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Events"
          name="token-events"
        />
      </q-tabs>

      <q-separator />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import TokenContractsTable from '@koiner/tokenize/components/contract/search/view/token-contracts-table.vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ChainMobileIndexPage',
  components: {
    TokensEventsTable,
    TokensOperationsTable,
    TokenContractsTable,
  },

  setup() {
    const route = useRoute();

    const tab: Ref<string> = ref('coins');

    onMounted(async () => {
      if (route.query['tab']) {
        tab.value = route.query['tab'].toString();
      }
    });

    return {
      tab,
    };
  },
});
</script>
