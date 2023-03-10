<template>
  <q-page v-if="transaction" class="row items-baseline">
    <q-banner class="alert q-my-xs" v-if="!indexed">
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
        Transaction is being confirmed by the network.
        <span v-if="indexTime - Date.now() > 0"
          >Expected time until parent block is irreversible:
          {{ timeToGo(indexTime) }}</span
        >
      </span>
    </q-banner>

    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <q-card class="search-card bg-transparent" flat>
          <q-card-section class="q-mt-sm">
            <div class="text-overline">Details</div>

            <q-list v-if="transaction">
              <q-item>
                <q-item-section class="id-section">
                  <q-item-label caption>ID</q-item-label>
                  <q-item-label lines="2" style="word-break: break-word">
                    {{ transaction.id }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="id-section">
                  <q-item-label caption>Block</q-item-label>
                  <q-item-label lines="2"
                    ><router-link
                      :to="{
                        name: 'block',
                        params: { height: transaction.blockHeight },
                      }"
                      >{{ transaction.blockHeight }}</router-link
                    ></q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Timestamp</q-item-label>
                  <q-item-label lines="2">
                    {{ timeAgo(transaction.timestamp) }}
                    <span class="timestamp"
                      >({{
                        new Date(transaction.timestamp).toLocaleString()
                      }})</span
                    >
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <q-separator vertical style="max-height: 180px !important" />

        <q-card class="search-card bg-transparent" flat>
          <q-card-section class="q-mt-sm">
            <div class="text-overline">&nbsp;</div>

            <q-list v-if="transaction">
              <q-item>
                <q-item-section>
                  <q-item-label caption>Operations:</q-item-label>
                  <q-item-label>{{ transaction.operationCount }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label caption>Events:</q-item-label>
                  <q-item-label>{{
                    transaction.receipt.eventCount
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <q-separator vertical style="max-height: 180px !important" />

        <q-card class="search-card bg-transparent" flat>
          <q-card-section class="q-mt-sm">
            <div class="text-overline">Resources Used</div>

            <q-list v-if="transaction">
              <q-item v-if="transaction.receipt?.diskStorageUsed">
                <q-item-section>
                  <q-item-label caption>Disk Storage Used:</q-item-label>
                  <q-item-label>{{
                    transaction.receipt.diskStorageUsed
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-if="transaction.receipt?.networkBandwidthUsed">
                <q-item-section>
                  <q-item-label caption>Network Bandwidth Used:</q-item-label>
                  <q-item-label>{{
                    transaction.receipt.networkBandwidthUsed
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-if="transaction.receipt?.computeBandwidthUsed">
                <q-item-section>
                  <q-item-label caption>Compute Bandwidth Used:</q-item-label>
                  <q-item-label>{{
                    transaction.receipt.computeBandwidthUsed
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <q-card class="tabs-card" flat bordered style="max-width: 100%">
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
              :live="!indexed"
            />
          </q-tab-panel>
          <q-tab-panel name="token-operations">
            <tokens-operations-table
              :burn-filter="false"
              :mint-filter="false"
              :transaction-ids="[transaction.id]"
              parent-type="transaction"
              :live="!indexed"
            />
          </q-tab-panel>
          <q-tab-panel name="token-events">
            <tokens-events-table
              :parent-id="transaction.id"
              parent-type="transaction"
              :live="!indexed"
            />
          </q-tab-panel>
          <q-tab-panel name="events">
            <contract-events-table
              :parent-id="transaction.id"
              parent-type="transaction"
              :live="!indexed"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-page>

  <error-view
    v-if="id && !transaction && showError && itemState.id"
    :error="itemState.error"
  />
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
import ContractOperationsTable from '@koiner/contracts/components/contract/search/view/contracts-operations-table.vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';
import ContractEventsTable from '@koiner/contracts/components/contract/search/view/contracts-events-table.vue';
import { timeAgo, timeToGo } from '@koiner/utils';
import { useOnChainStore } from '@koiner/onchain';
import { ContractsWithAbiSearchProvider } from '@koiner/contracts/components/contract/search/contracts-with-abi-search-provider';
import { TokenContractsSearchProvider } from '@koiner/tokenize/components/contract/search/token-contract-search-provider';

export default defineComponent({
  components: {
    ContractEventsTable,
    TokensEventsTable,
    TokensOperationsTable,
    ContractOperationsTable,
    ErrorView,
  },
  setup() {
    const route = useRoute();
    const onChainStore = useOnChainStore();

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
    const contractsSearch = new ContractsWithAbiSearchProvider();
    const tokenContractsSearch = new TokenContractsSearchProvider();

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
        await onChainStore.loadTransaction(
          id.value,
          contractsSearch,
          tokenContractsSearch
        );

        transactionFromChain.value = onChainStore.transaction(
          id.value
        )?.edge.node;

        if (!transactionFromChain.value) {
          // Only show error if fetching from chain has failed
          showError.value = true;
        }
      }

      indexTime.value = transactionFromChain.value?.timestamp + 180000;

      startWatcher();
    };

    return {
      timeAgo,
      timeToGo,
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
