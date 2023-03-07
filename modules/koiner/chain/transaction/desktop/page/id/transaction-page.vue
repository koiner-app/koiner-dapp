<template>
  <q-page
    v-if="transaction"
    :class="indexed ? 'row items-baseline justify-evenly' : ''"
  >
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <counter-metric
          title="Transaction"
          :value="`${transaction.id.substring(0, 10)}...`"
        />

        <q-separator vertical />

        <q-banner class="alert q-my-lg" v-if="!indexed">
          <template v-slot:avatar>
            <q-circular-progress
              show-value
              font-size="12px"
              :value="indexProgress"
              size="50px"
              :thickness="0.22"
              color="teal"
              track-color="grey-3"
              class="q-ma-md"
            >
              &nbsp;
            </q-circular-progress>
          </template>
          <span style="font-size: 0.75rem !important; line-height: 1">
            Full data will be shown after block is irreversible and indexed by
            our servers.
            <span v-if="indexTime - Date.now() > 0"
              >Expected time to index: {{ timeToGo(indexTime) }}</span
            >
          </span>
        </q-banner>

        <counter-metric
          v-if="indexed"
          title="Operations"
          :value="transaction.operationCount"
        />

        <q-separator v-if="indexed" vertical />

        <counter-metric
          v-if="indexed"
          title="Events"
          :value="transaction.receipt.eventCount"
        />
      </q-card-section>
    </q-card>

    <q-card
      v-if="indexed"
      class="tabs-card"
      flat
      bordered
      style="max-width: 100%"
    >
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
      <q-card-section class="q-pa-none" style="padding-top: 0 !important">
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
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  Ref,
  ref,
  watch,
} from 'vue';
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
import { getTransaction } from '@koiner/chain/koilib-service';

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
    const indexed = ref(false);
    const indexTime = ref(0);
    const msToIndex = ref(0);
    const indexProgress = ref(0);
    const intervalId: Ref<NodeJS.Timeout | undefined> = ref();
    const progressIntervalId: Ref<NodeJS.Timeout | undefined> = ref();
    const transactionFromChain: Ref<Transaction | undefined> = ref();
    const itemState = ItemState.create<Transaction>();
    const variables: Ref<{ id: string }> = ref({ id: '' });
    const id: Ref<string | undefined> = ref();
    const showError = ref(false);

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useTransactionPageQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.transaction as Transaction;

        if (itemState.item.value) {
          indexed.value = true;
          transactionFromChain.value = undefined;
          stopWatcher();
        }
      });

      watch(error, (updatedError) => {
        itemState.error.value = updatedError;

        if (
          updatedError?.message.includes('Entity was not found') &&
          !transactionFromChain.value
        ) {
          // Load transaction from chain if not found
          loadFromChain();
        }
      });

      itemState.fetching = fetching;
      itemState.isPaused = isPaused;
    };

    watch(
      () => route.params.id,
      async (newId) => {
        itemState.isPaused.value = !newId;

        if (newId) {
          id.value = newId.toString();
          variables.value.id = newId.toString();
        } else {
          variables.value.id = '';
        }
      }
    );

    const updateProgress = () => {
      msToIndex.value = indexTime.value - Date.now();
      indexProgress.value = 100 - (msToIndex.value / 240000) * 100;
    };

    const tryAgain = () => {
      if (!itemState.item.value && msToIndex.value < 60000) {
        // Try again by pausing query
        itemState.isPaused.value = true;
        itemState.isPaused.value = false;
      }
    };

    const startWatcher = () => {
      intervalId.value = setInterval(updateProgress, 1000);
      progressIntervalId.value = setInterval(tryAgain, 5000);
    };

    const stopWatcher = () => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
      }

      if (progressIntervalId.value) {
        clearInterval(progressIntervalId.value);
      }
    };

    onMounted(() => {
      id.value = route.params.id.toString();
      variables.value.id = id.value;

      executeQuery();
    });

    onUnmounted(() => {
      stopWatcher();
    });

    const loadFromChain = async () => {
      console.log('loadFromChain');
      if (id.value && !transactionFromChain.value) {
        transactionFromChain.value = await getTransaction(id.value);

        if (!transactionFromChain.value) {
          // Only show error if fetching from chain has failed
          showError.value = true;
        }
      }

      indexTime.value = transactionFromChain.value?.timestamp + 240000;

      startWatcher();
    };

    return {
      tab,
      indexed,
      indexTime,
      msToIndex,
      indexProgress,
      itemState,
      id,
      transaction: computed((): Transaction | undefined => {
        if (!itemState.item.value) {
          return transactionFromChain.value;
        } else {
          return itemState.item.value;
        }
      }),
      showError,
      error: itemState.error,
    };
  },
});
</script>
