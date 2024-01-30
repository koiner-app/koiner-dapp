<template>
  <q-header reveal elevated>
    <q-toolbar>
      <q-toolbar-title style="min-width: 240px">
        <span class="page-title"> Transaction </span>
      </q-toolbar-title>

      <q-space />

      <account-menu-mobile />
    </q-toolbar>
  </q-header>

  <q-page v-if="transaction" class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated swipeable>
          <q-tab-panel
            name="details"
            style="padding: 0 !important; min-height: 100vh"
          >
            <q-card class="stats-card" flat>
              <q-card-section>
                <q-banner class="alert q-mb-lg" v-if="!indexed">
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
              </q-card-section>
            </q-card>

            <tokens-transferred-view
              v-if="id"
              :transaction-id="id"
              :live="!indexed"
            />

            <q-card flat class="details-transaction q-pt-none">
              <q-card-section>
                <transaction-details-component
                  :transaction="transaction"
                  :mobile="true"
                />
              </q-card-section>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="contract-operations" class="tab--mobile-table">
            <contract-operations-table
              :transaction-id="transaction.id"
              :mobile="true"
              :live="!indexed"
            />
          </q-tab-panel>
          <q-tab-panel name="token-operations" class="tab--mobile-table">
            <tokens-operations-table
              :transaction-ids="[transaction.id]"
              :mobile="true"
              :live="!indexed"
            />
          </q-tab-panel>
          <q-tab-panel name="token-events" class="tab--mobile-table">
            <tokens-events-table
              :parent-id="transaction.id"
              parent-type="transaction"
              :mobile="true"
              :live="!indexed"
            />
          </q-tab-panel>
          <q-tab-panel name="events" class="tab--mobile-table">
            <contract-events-table
              :parent-id="transaction.id"
              :mobile="true"
              :live="!indexed"
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
  ref,
  Ref,
  watch,
} from 'vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';
import { useRoute } from 'vue-router';
import TransactionDetailsComponent from '@koiner/chain/transaction/transaction-details-component.vue';
import ContractOperationsTable from '@koiner/contracts/components/contract/search/view/contracts-operations-table.vue';
import { ItemState } from '@appvise/search-manager';
import { Transaction, useTransactionPageQuery } from '@koiner/sdk';
import ContractEventsTable from '@koiner/contracts/components/contract/search/view/contracts-events-table.vue';
import { formattedTokenAmount, timeToGo } from '@koiner/utils';
import ErrorView from 'components/error-view.vue';
import { useOnChainStore } from '@koiner/onchain';
import { ContractsWithAbiSearchProvider } from '@koiner/contracts/components/contract/search/contracts-with-abi-search-provider';
import { TokenContractsSearchProvider } from '@koiner/tokenize/components/contract/search/token-contract-search-provider';
import TokensTransferredView from '@koiner/chain/transaction/mobile/view/tokens-transferred-view.vue';
import AccountMenuMobile from '@koiner/components/account-menu-mobile.vue';

export default defineComponent({
  methods: {
    formattedTokenAmount,
    timeToGo,
  },
  name: 'TransactionMobilePage',
  components: {
    AccountMenuMobile,
    TokensTransferredView,
    ErrorView,
    ContractEventsTable,
    ContractOperationsTable,
    TransactionDetailsComponent,
    TokensEventsTable,
    TokensOperationsTable,
  },

  setup() {
    const route = useRoute();
    const onChainStore = useOnChainStore();

    const tabs = [
      'details',
      'contract-operations',
      'token-operations',
      'token-events',
      'contract-events',
    ];
    const tab: Ref<string> = ref('details');
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

    watch(
      () => route.params.tab,
      async (newTab) => {
        if (newTab && tabs.includes(newTab.toString())) {
          tab.value = newTab.toString();
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

      if (route.params.tab && tabs.includes(route.params.tab.toString())) {
        tab.value = route.params.tab.toString();
      }

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
