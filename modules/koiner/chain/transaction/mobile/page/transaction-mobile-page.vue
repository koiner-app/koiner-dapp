<template>
  <q-page v-if="transaction" class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="details">
            <q-card class="stats-cards" flat bordered>
              <q-card-section horizontal>
                <counter-metric title="Transaction Id" :value="transaction.id" />

                <q-separator vertical />

                <counter-metric
                  title="Events"
                  :value="transaction.receipt.eventCount"
                />
              </q-card-section>
              <q-card-section
                class="q-pa-none"
                style="padding-top: 0 !important"
              >
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
          </q-tab-panel>
          <q-tab-panel name="contract-operations" class="tab--mobile-table">
            <contract-operations-table
              :transaction-id="transaction.id"
              :mobile="true"
            />
          </q-tab-panel>
          <q-tab-panel name="token-operations" class="tab--mobile-table">
            <tokens-operations-table
              :transaction-ids="[transaction.id]"
              :mobile="true"
            />
          </q-tab-panel>
          <q-tab-panel name="token-events" class="tab--mobile-table">
            <tokens-events-table
              :parent-id="transaction.id"
              parent-type="transaction"
              :mobile="true"
            />
          </q-tab-panel>
          <q-tab-panel name="events" class="tab--mobile-table">
            <contract-events-table
              :parent-id="transaction.id"
              :mobile="true"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-page-sticky expand position="top">
      <q-tabs v-model="tab" dense align="justify" style="width: 100%">
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Tx Details"
          name="details"
        />
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
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';
import { useRoute } from 'vue-router';
import TransactionDetailsComponent from '@koiner/chain/transaction/transaction-details-component.vue';
import ContractOperationsTable from '@koiner/contracts/components/contract/search/view/contracts-operations-table.vue';
import { ItemState } from '@appvise/search-manager';
import { Transaction, useTransactionPageQuery } from '@koiner/sdk';
import ContractEventsTable from '@koiner/contracts/components/contract/search/view/contracts-events-table.vue';

export default defineComponent({
  name: 'TransactionMobilePage',
  components: {
    ContractEventsTable,
    ContractOperationsTable,
    TransactionDetailsComponent,
    TokensEventsTable,
    TokensOperationsTable,
    CounterMetric,
  },

  setup() {
    const statsStore = useStatsStore();
    const route = useRoute();

    const tab: Ref<string> = ref('details');

    const itemState = ItemState.create<Transaction>();
    const variables: Ref<{ id: string }> = ref({ id: '' });

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useTransactionPageQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.transaction as Transaction;
      });

      itemState.error = error;
      itemState.fetching = fetching;
      itemState.isPaused = isPaused;
    };

    variables.value.id = route.params.id.toString();

    executeQuery();

    // Workaround to reactivate urql to resume on a re-entering of page
    // TODO: Find out why this is necessary
    itemState.isPaused.value = true;
    itemState.isPaused.value = false;

    watch(
      () => route.params.id,
      async (newId) => {
        itemState.isPaused.value = !newId;
        variables.value.id = newId ? newId.toString() : '';
      }
    );

    return {
      tab,
      statsStore,

      itemState,
      transaction: itemState.item,
      error: itemState.error,
    };
  },
});
</script>
