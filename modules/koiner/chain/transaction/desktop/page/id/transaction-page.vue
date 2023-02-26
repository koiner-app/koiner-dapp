<template>
  <q-page v-if="transaction" class="row items-baseline justify-evenly">
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <counter-metric title="ID" :value="`${transaction.id.substring(0, 10)}...`" />

        <q-separator vertical />

        <counter-metric
          title="Operations"
          :value="transaction.operationCount"
        />

        <q-separator vertical />

        <counter-metric
          title="Events"
          :value="transaction.receipt.eventCount"
        />
      </q-card-section>
    </q-card>

    <q-card class="tabs-card" flat bordered style="max-width: 100%;">
      <q-card-section class="q-pt-xs">
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
            label="Token Ops"
            name="token-operations"
          />
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Token Events"
            name="token-events"
          />
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Events"
            name="events"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="contract-operations">
            <contract-operations-table
              :burn-filter="false"
              :mint-filter="false"
              :transaction-id="transaction.id"
            />
          </q-tab-panel>
          <q-tab-panel name="token-operations">
            <tokens-operations-table
              :burn-filter="false"
              :mint-filter="false"
              :transaction-ids="[transaction.id]"
              parent-type="transaction"
            />
          </q-tab-panel>
          <q-tab-panel name="token-events">
            <tokens-events-table
              :parent-id="transaction.id"
              parent-type="transaction"
            />
          </q-tab-panel>
          <q-tab-panel name="events">
            <contract-events-table
              :parent-id="transaction.id"
              parent-type="transaction"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-card class="search-card bg-transparent" flat>
      <q-card-section class="q-pa-none" style="padding-top: 0 !important;">
        <q-card flat bordered class="q-mb-lg">
          <q-card-section>
            <q-card-section class="q-pa-none q-pt-xs">
              <div class="text-overline">Details</div>

              <transaction-details-component :transaction="transaction" />
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>

  <error-view :error="itemState.error" />
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Transaction, useTransactionPageQuery } from '@koiner/sdk';
import { ItemState } from '@appvise/search-manager';
import ErrorView from 'components/error-view.vue';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import ContractOperationsTable from '@koiner/contracts/components/contract/search/view/contracts-operations-table.vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';
import ContractEventsTable from '@koiner/contracts/components/contract/search/view/contracts-events-table.vue';
import TransactionDetailsComponent from '@koiner/chain/transaction/transaction-details-component.vue';

export default defineComponent({
  components: {
    TransactionDetailsComponent,
    ContractEventsTable,
    TokensEventsTable,
    TokensOperationsTable,
    ContractOperationsTable,
    CounterMetric,
    ErrorView,
  },
  setup() {
    const route = useRoute();

    const tab: Ref<string> = ref('contract-operations');
    const itemState = ItemState.create<Transaction>();
    const variables: Ref<{ id: string }> = ref({ id: '' });

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useTransactionPageQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.transaction as Transaction;
      });

      watch(error, (updatedError) => {
        itemState.error.value = updatedError;
      });

      itemState.fetching = fetching;
      itemState.isPaused = isPaused;
    };

    onMounted(async () => {
      variables.value.id = route.params.id.toString();
      executeQuery();
    });

    watch(
      () => route.params.id,
      async (newId) => {
        variables.value.id = newId ? newId.toString() : '';
      }
    );

    return {
      tab,

      itemState,
      transaction: itemState.item,
      error: itemState.error,
    };
  },
});
</script>
