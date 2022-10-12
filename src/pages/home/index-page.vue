<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 2.5rem !important"
  >
    <koinos-home-stats-component />

    <q-card class="transactions-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <q-tabs v-model="tokenTab" dense align="left" style="width: 100%">
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Token Ops"
            name="token-operations"
          />
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Tx"
            name="transactions"
          />
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Contract Ops"
            name="contract-operations"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tokenTab" animated>
          <q-tab-panel name="token-operations">
            <tokens-operations-table />
          </q-tab-panel>
          <q-tab-panel name="transactions">
            <transactions-table />
          </q-tab-panel>
          <q-tab-panel name="contract-operations">
            <contract-operations-table />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-card class="blocks-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Blocks</div>

          <blocks-component />
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import BlocksComponent from './components/blocks-component.vue';
import KoinosHomeStatsComponent from './components/koin-home-stats-component.vue';
import ContractOperationsTable from '@koiner/contracts/components/contract/search/view/contracts-operations-table.vue';
import TransactionsTable from '@koiner/chain/components/transaction/search/view/transactions-table.vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';

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
    const tokenTab: Ref<string> = ref('token-operations');

    return {
      tokenTab,
    };
  },
});
</script>

<style lang="scss">
.blocks-card {
  .q-table {
    min-width: 500px;
  }
}
.transactions-card {
  .q-tab__label {
    text-transform: none;
  }
}
</style>
