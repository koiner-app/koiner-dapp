<template>
  <q-page
    v-if="transaction"
    class="row items-baseline justify-evenly"
    style="padding-top: 8rem"
  >
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <counter-metric title="Block Height" :value="transaction.blockHeight" />

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

    <q-card class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <q-tabs v-model="tab" dense align="left" style="width: 100%">
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Transfers"
            name="token-transfers"
          />
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Contract Ops"
            name="operations"
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
          <q-tab-panel name="token-transfers">
            <tokens-operations-table
              :burn-filter="false"
              :mint-filter="false"
              :transaction-ids="[transaction.id]"
              parent-type="transaction"
            />
          </q-tab-panel>
          <q-tab-panel name="operations">
            <contract-operations-table
              :burn-filter="false"
              :mint-filter="false"
              :parent-id="transaction.id"
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

    <q-card class="search-card" flat>
      <q-card-section class="q-pa-none">
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Details</div>

          <q-list bordered class="rounded-borders">
            <q-item>
              <q-item-section class="col-2 gt-sm">
                <q-item-label>Transaction Hash:</q-item-label>
              </q-item-section>

              <q-item-section>
                {{ transaction.id }}
              </q-item-section>
            </q-item>

            <q-separator inset="item" />

            <q-item>
              <q-item-section class="col-2 gt-sm">
                <q-item-label>Block:</q-item-label>
              </q-item-section>

              <q-item-section>
                {{ transaction.blockHeight }}
              </q-item-section>
            </q-item>

            <q-separator inset="item" />

            <q-item>
              <q-item-section class="col-2 gt-sm">
                <q-item-label>Timestamp</q-item-label>
              </q-item-section>
              <q-item-section></q-item-section>
            </q-item>

            <q-separator inset="item" />

            <q-item>
              <q-item-section class="col-2 gt-sm">
                <q-item-label>Operations</q-item-label>
              </q-item-section>
              <q-item-section>
                <div v-if="transaction.operationCount > 0">
                  <q-btn
                    :to="{
                      name: 'transaction.operations',
                      id: itemState.id,
                    }"
                    flat
                    class="q-pa-none"
                    style="min-height: auto"
                  >
                    <q-badge color="secondary" text-color="black"
                      >{{ transaction.operationCount }} operation
                      {{ transaction.operationCount > 1 ? 's' : '' }}</q-badge
                    >
                  </q-btn>
                </div>
                <div v-else>
                  <q-badge color="grey" text-color="black"
                    >No operations</q-badge
                  >
                </div>
              </q-item-section>
            </q-item>

            <q-separator inset="item" />

            <q-item>
              <q-item-section class="col-2 gt-sm">
                <q-item-label>Signature:</q-item-label>
              </q-item-section>

              <q-item-section>
                {{ transaction.signature }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card-section>
    </q-card>

    <error-view :error="itemState.error" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Transaction, useTransactionPageQuery } from '@koiner/sdk';
import { ItemState } from '@appvise/search-manager';
import ErrorView from 'src/components/error-view.vue';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import ContractOperationsTable from '@koiner/contracts/components/contract/search/view/contracts-operations-table.vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';
import ContractEventsTable from '@koiner/contracts/components/contract/search/view/contracts-events-table.vue';

export default defineComponent({
  components: {
    ContractEventsTable,
    TokensEventsTable,
    TokensOperationsTable,
    ContractOperationsTable,
    CounterMetric,
    ErrorView,
  },
  setup() {
    const itemState = ItemState.create<Transaction>();
    const variables: Ref<{ id: string }> = ref({ id: '' });
    const route = useRoute();

    const tab: Ref<string> = ref('token-transfers');

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

    onMounted(async () => {
      variables.value.id = route.params.id.toString();
      executeQuery();
      itemState.isPaused.value = true;
      itemState.isPaused.value = false;
    });

    watch(
      () => route.params.id,
      async (newId) => {
        itemState.isPaused.value = !newId;
        variables.value.id = newId ? newId.toString() : '';
      }
    );

    return {
      tab,

      itemState,
      transaction: itemState.item,
      error: itemState.error,
      executeQuery,
    };
  },
});
</script>
