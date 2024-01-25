<template>
  <q-header reveal elevated>
    <q-toolbar>
      <q-separator dark vertical inset class="lt-md" />
      <q-toolbar-title>
        <span class="page-title"> Smart Contracts </span>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>

  <q-page class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat>
      <q-card-section class="q-pa-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="contracts" class="tab--mobile-table">
            <contracts-table :mobile="true" />
          </q-tab-panel>
          <q-tab-panel name="contract-operations" class="tab--mobile-table">
            <contract-operations-table :mobile="true" />
          </q-tab-panel>
          <q-tab-panel name="contract-events" class="tab--mobile-table">
            <contract-events-table :mobile="true" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-page-sticky expand position="top">
      <q-tabs v-model="tab" dense align="justify" style="width: 100%">
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Contracts"
          name="contracts"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Operations"
          name="contract-operations"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Events"
          name="contract-events"
        />
      </q-tabs>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import ContractsTable from '@koiner/contracts/components/contract/search/view/contracts-table.vue';
import ContractEventsTable from '@koiner/contracts/components/contract/search/view/contracts-events-table.vue';
import ContractOperationsTable from '@koiner/contracts/components/contract/search/view/contracts-operations-table.vue';

export default defineComponent({
  name: 'ChainMobileIndexPage',
  components: {
    ContractsTable,
    ContractEventsTable,
    ContractOperationsTable,
  },

  setup() {
    const tab: Ref<string> = ref('contracts');

    return {
      tab,
    };
  },
});
</script>
