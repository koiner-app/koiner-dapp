<template>
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
      <tokens-operations-table :addresses="addresses" :mobile="true" />
    </q-tab-panel>
    <q-tab-panel name="transactions">
      <transactions-table :addresses="addresses" :mobile="true" />
    </q-tab-panel>
    <q-tab-panel name="contract-events">
      <contract-events-table :addresses="addresses" :mobile="true" />
    </q-tab-panel>
    <q-tab-panel name="token-events">
      <tokens-events-table :addresses="addresses" :mobile="true" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from 'vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TransactionsTable from '@koiner/chain/transaction/search/view/transactions-table.vue';
import ContractEventsTable from '@koiner/contracts/components/contract/search/view/contracts-events-table.vue';
import { useAccountStore } from 'stores/account';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';

export default defineComponent({
  name: 'AddressMobileHistory',
  components: {
    TokensEventsTable,
    ContractEventsTable,
    TransactionsTable,
    TokensOperationsTable,
  },
  props: {
    addresses: {
      type: Array as PropType<string[]>,
      required: true,
    },
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
