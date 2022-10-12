<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <address-stats-component :ids="addressFilter" />

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
            label="Contract Events"
            name="contract-events"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tokenTab" animated>
          <q-tab-panel name="token-operations">
            <tokens-operations-table
              v-if="addressFilter.length > 0"
              :addresses="addressFilter"
            />
          </q-tab-panel>
          <q-tab-panel name="transactions">
            <transactions-table
              v-if="addressFilter.length > 0"
              :addresses="addressFilter"
            />
          </q-tab-panel>
          <q-tab-panel name="contract-events">
            <contract-events-table
              v-if="addressFilter.length > 0"
              :addresses="addressFilter"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-card class="blocks-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Addresses</div>

        <div class="q-pa-lg">
          <account-addresses-filter @change="updateFilter" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TransactionsTable from '@koiner/chain/components/transaction/search/view/transactions-table.vue';
import AddressStatsComponent from '@koiner/chain/components/address/address-stats-component.vue';
import AccountAddressesFilter from '@koiner/chain/components/address/account-addresses-filter.vue';
import ContractEventsTable from '@koiner/contracts/components/contract/search/view/contracts-events-table.vue';

export default defineComponent({
  name: 'AccountHistoryPage',
  components: {
    ContractEventsTable,
    AccountAddressesFilter,
    AddressStatsComponent,
    TransactionsTable,
    TokensOperationsTable,
  },

  setup() {
    const tokenTab: Ref<string> = ref('token-operations');
    const addressFilter: Ref<string[]> = ref([]);

    const updateFilter = (newFilter: string[]) => {
      addressFilter.value = newFilter;
    };

    return {
      tokenTab,
      addressFilter,
      updateFilter,
    };
  },
});
</script>
