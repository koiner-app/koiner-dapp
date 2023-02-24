<template>
  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="blocks">
            <blocks-table :mobile="true" />
          </q-tab-panel>
          <q-tab-panel name="transactions">
            <transactions-table :mobile="true" />
          </q-tab-panel>
          <q-tab-panel name="operations">
            <operations-table />
          </q-tab-panel>
          <q-tab-panel name="events">
            <events-table />
          </q-tab-panel>
          <q-tab-panel name="addresses">
            <addresses-table :mobile="true" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-page-sticky expand position="top">
      <q-tabs v-model="tab" dense align="justify" style="width: 100%">
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Blocks"
          name="blocks"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Transactions"
          name="transactions"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Operations"
          name="operations"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Events"
          name="events"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Addresses"
          name="addresses"
        />
      </q-tabs>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import TransactionsTable from './transaction/search/view/transactions-table.vue';
import BlocksTable from './block/search/view/blocks-table.vue';
import OperationsTable from './operation/search/view/operations-table.vue';
import EventsTable from './event/search/view/events-table.vue';
import AddressesTable from './address/search/view/addresses-table.vue';

export default defineComponent({
  name: 'ChainMobileIndexPage',
  components: {
    AddressesTable,
    EventsTable,
    OperationsTable,
    BlocksTable,
    TransactionsTable,
  },

  setup() {
    const tab: Ref<string> = ref('blocks');

    return {
      tab,
    };
  },
});
</script>
