<template>
  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="tokens">
            <token-contracts-table />
          </q-tab-panel>
          <q-tab-panel name="token-operations">
            <tokens-operations-table />
          </q-tab-panel>
          <q-tab-panel name="token-events">
            <tokens-events-table />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-page-sticky expand position="top">
      <q-tabs v-model="tab" dense align="justify" style="width: 100%">
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Tokens"
          name="tokens"
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
import { defineComponent, Ref, ref } from 'vue';
import TokenContractsTable from '@koiner/tokenize/components/contract/search/view/token-contracts-table.vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';

export default defineComponent({
  name: 'ChainMobileIndexPage',
  components: {
    TokensEventsTable,
    TokensOperationsTable,
    TokenContractsTable,
  },

  setup() {
    const tab: Ref<string> = ref('tokens');

    return {
      tab,
    };
  },
});
</script>
