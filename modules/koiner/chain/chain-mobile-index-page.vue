<template>
  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="transactions" class="tab--mobile-table">
            <transactions-table :mobile="true" />
          </q-tab-panel>
          <q-tab-panel name="addresses" class="tab--mobile-table">
            <addresses-table :mobile="true" />
          </q-tab-panel>
          <q-tab-panel name="blocks" class="tab--mobile-table">
            <blocks-table :mobile="true" />
          </q-tab-panel>
          <q-tab-panel name="operations" class="tab--mobile-table">
            <operations-table :mobile="true" />
          </q-tab-panel>
          <q-tab-panel name="events" class="tab--mobile-table">
            <events-table :mobile="true" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-page-sticky expand position="top">
      <q-tabs v-model="tab" dense align="justify" style="width: 100%">
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Transactions"
          name="transactions"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Addresses"
          name="addresses"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Blocks"
          name="blocks"
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
      </q-tabs>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import TransactionsTable from './transaction/search/view/transactions-table.vue';
import BlocksTable from './block/search/view/blocks-table.vue';
import OperationsTable from './operation/search/view/operations-table.vue';
import EventsTable from './event/search/view/events-table.vue';
import AddressesTable from './address/search/view/addresses-table.vue';
import { useRoute } from 'vue-router';

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
    const route = useRoute();
    const tab: Ref<string> = ref('blocks');

    const loadTab = () => {
      switch (route.name) {
        case 'mobile.blocks':
          tab.value = 'blocks';
          break;
        case 'mobile.addresses':
          tab.value = 'addresses';
          break;
        case 'mobile.transactions':
          tab.value = 'transactions';
          break;
        default:
        //
      }
    };

    onMounted(() => {
      if (route.query['tab']) {
        tab.value = route.query['tab'].toString();
      }

      loadTab();
    });

    watch(
      () => route.path,
      () => {
        loadTab();
      }
    );

    return {
      tab,
    };
  },
});
</script>
