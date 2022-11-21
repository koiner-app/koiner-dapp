<template>
  <q-page
    v-if="accountStore.addressesFilter.length > 0"
    class="row items-start"
  >
    <q-card class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <q-tabs v-model="tab" dense align="left" style="width: 100%">
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
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Token Events"
            name="token-events"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="token-operations">
            <tokens-operations-table
              v-if="accountStore.addressesFilter.length > 0"
              :addresses="accountStore.addressesFilter"
            />
          </q-tab-panel>
          <q-tab-panel name="transactions">
            <transactions-table
              v-if="accountStore.addressesFilter.length > 0"
              :addresses="accountStore.addressesFilter"
            />
          </q-tab-panel>
          <q-tab-panel name="contract-events">
            <contract-events-table
              v-if="accountStore.addressesFilter.length > 0"
              :addresses="accountStore.addressesFilter"
            />
          </q-tab-panel>
          <q-tab-panel name="token-events">
            <tokens-events-table :addresses="accountStore.addressesFilter" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-card class="search-card" flat bordered>
      <q-card-section>
        <div class="text-overline">Addresses</div>

        <div class="search-card-content">
          <account-addresses-filter />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TransactionsTable from '@koiner/chain/components/transaction/search/view/transactions-table.vue';
import AccountAddressesFilter from '@koiner/chain/components/address/account-addresses-filter.vue';
import ContractEventsTable from '@koiner/contracts/components/contract/search/view/contracts-events-table.vue';
import { useAccountStore } from 'stores/account';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';

export default defineComponent({
  name: 'AccountHistoryPage',
  components: {
    TokensEventsTable,
    ContractEventsTable,
    AccountAddressesFilter,
    TransactionsTable,
    TokensOperationsTable,
  },

  setup() {
    const accountStore = useAccountStore();
    const tab: Ref<string> = ref('token-operations');

    return {
      accountStore,
      tab,
    };
  },
});
</script>
