<template>
  <q-page class="row items-start">
    <koinos-home-stats-component />

    <q-card class="tabs-card" flat bordered>
      <q-card-section>
        <q-tabs v-model="tab" dense align="left" style="width: 100%">
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Contract Ops"
            name="contract-operations"
          />
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Transfers"
            name="token-transfers"
          />
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Tx"
            name="transactions"
          />
          <q-tab
            class="text-overline lt-lg"
            :ripple="false"
            label="Blocks"
            name="blocks"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="contract-operations">
            <contract-operations-table :key="componentIndex" />
          </q-tab-panel>
          <q-tab-panel name="token-transfers" class="token-transfers">
            <tokens-operations-table
              :key="componentIndex"
              :burn-filter="false"
              :mint-filter="false"
            />
          </q-tab-panel>
          <q-tab-panel name="transactions">
            <transactions-table :key="componentIndex" />
          </q-tab-panel>
          <q-tab-panel name="blocks">
            <blocks-component :key="componentIndex" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-card class="search-card gt-md" flat bordered>
      <q-card-section>
        <div class="text-overline">Blocks</div>

        <div class="search-card-content">
          <blocks-component :key="componentIndex" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  Ref,
  ref,
  watch,
} from 'vue';
import BlocksComponent from './components/blocks-component.vue';
import KoinosHomeStatsComponent from './components/koin-home-stats-component.vue';
import ContractOperationsTable from '@koiner/contracts/components/contract/search/view/contracts-operations-table.vue';
import TransactionsTable from '@koiner/chain/transaction/search/view/transactions-table.vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import { useWindowSize } from '@vueuse/core';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'DashboardIndexPage',
  components: {
    TransactionsTable,
    ContractOperationsTable,
    KoinosHomeStatsComponent,
    BlocksComponent,
    TokensOperationsTable,
  },

  setup() {
    const route = useRoute();
    const { width } = useWindowSize();

    const tab: Ref<string> = ref('contract-operations');
    const componentIndex = ref(0);

    watch(width, () => {
      if (width.value >= 1440 && tab.value === 'blocks') {
        tab.value = 'contract-operations';
      }
    });

    let intervalId: any;

    // Increment the key every minute
    const startAutoReload = () => {
      intervalId = setInterval(() => {
        componentIndex.value += 1;
      }, 60000);
    };

    onMounted(() => {
      startAutoReload();
    });

    // Clean up the interval when the component is destroyed
    onBeforeUnmount(() => {
      clearInterval(intervalId);
    });

    // Watch for route changes and update the key to force re-render
    watch(route, () => {
      componentIndex.value += 1;
    });

    return {
      tab,
      componentIndex,
    };
  },
});
</script>
