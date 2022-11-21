<template>
  <q-page v-if="id" class="row items-start">
    <q-card class="tabs-card" flat bordered style="max-width: 100%">
      <q-card-section class="q-pt-xs">
        <q-tabs v-model="tokenTab" dense align="left" style="width: 100%">
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
            class="text-overline"
            :ripple="false"
            label="Contract Events"
            name="contract-events"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tokenTab" animated>
          <q-tab-panel name="token-transfers">
            <tokens-operations-table
              :addresses="[id]"
              :burn-filter="false"
              :mint-filter="false"
            />
          </q-tab-panel>
          <q-tab-panel name="transactions">
            <transactions-table :addresses="[id]" />
          </q-tab-panel>
          <q-tab-panel name="contract-events">
            <contract-events-table :addresses="[id]" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TransactionsTable from '@koiner/chain/components/transaction/search/view/transactions-table.vue';
import ContractEventsTable from '@koiner/contracts/components/contract/search/view/contracts-events-table.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AccountHistoryPage',
  components: {
    ContractEventsTable,
    TransactionsTable,
    TokensOperationsTable,
  },

  setup() {
    let id: Ref<string | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id.toString();
    });

    watch(
      () => route.params.id,
      async (newId) => {
        id.value = newId.toString();
      }
    );

    const tokenTab: Ref<string> = ref('token-transfers');
    const addressFilter: Ref<string[]> = ref([]);

    const updateFilter = (newFilter: string[]) => {
      addressFilter.value = newFilter;
    };

    return {
      id,
      tokenTab,
      addressFilter,
      updateFilter,
    };
  },
});
</script>
