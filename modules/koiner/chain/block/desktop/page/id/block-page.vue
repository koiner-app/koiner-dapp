<template>
  <q-page v-if="block" :class="indexed ? 'row items-start' : ''">
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <counter-metric title="Height" :value="block.header.height" />

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
          title="Transactions"
          :value="block.transactionCount"
        />

        <q-separator v-if="indexed" vertical />

        <counter-metric
          v-if="indexed"
          title="Events"
          :value="block.receipt.eventCount"
        />
      </q-card-section>
    </q-card>

    <q-card v-if="indexed" class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <q-tabs v-model="tab" dense align="left" style="width: 100%">
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Tx"
            name="transactions"
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

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="transactions">
            <transactions-table :heights="[block.header.height]" />
          </q-tab-panel>
          <q-tab-panel name="contract-operations">
            <contract-operations-table :heights="[block.header.height]" />
          </q-tab-panel>
          <q-tab-panel name="token-operations">
            <tokens-operations-table :heights="[block.header.height]" />
          </q-tab-panel>
          <q-tab-panel name="token-events">
            <tokens-events-table :heights="[block.header.height]" />
          </q-tab-panel>
          <q-tab-panel name="events">
            <contract-events-table :heights="[block.header.height]" />
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

              <block-details-component :block="block" />
            </q-card-section>
          </q-card-section>
        </q-card>

        <q-card flat bordered v-if="indexed">
          <q-card-section>
            <q-card-section class="q-pa-none q-pt-xs">
              <div class="text-overline">Block Reward</div>
              <block-producer-component :block="block" />
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>

  <error-view
    v-if="height && !block && showError && itemState.id"
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
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import TokensOperationsTable from '@koiner/tokenize/components/operation/search/view/tokens-operations-table.vue';
import TokensEventsTable from '@koiner/tokenize/components/event/search/view/tokens-events-table.vue';
import { useRoute } from 'vue-router';
import BlockDetailsComponent from '@koiner/chain/block/block-details-component.vue';
import ContractOperationsTable from '@koiner/contracts/components/contract/search/view/contracts-operations-table.vue';
import TransactionsTable from '@koiner/chain/transaction/search/view/transactions-table.vue';
import { ItemState } from '@appvise/search-manager';
import { Block, useBlockPageQuery } from '@koiner/sdk';
import BlockProducerComponent from '@koiner/chain/block/block-producer-component.vue';
import ContractEventsTable from '@koiner/contracts/components/contract/search/view/contracts-events-table.vue';
import ErrorView from 'components/error-view.vue';
import { getBlock } from '@koiner/chain/koilib-service';
import { timeToGo } from '@koiner/utils';

export default defineComponent({
  name: 'BlockPage',
  methods: { timeToGo },
  components: {
    ErrorView,
    ContractEventsTable,
    BlockProducerComponent,
    TransactionsTable,
    ContractOperationsTable,
    BlockDetailsComponent,
    TokensEventsTable,
    TokensOperationsTable,
    CounterMetric,
  },

  setup() {
    const statsStore = useStatsStore();
    const route = useRoute();

    const tab: Ref<string> = ref('transactions');
    const indexed = ref(false);
    const indexTime = ref(0);
    const msToIndex = ref(0);
    const indexProgress = ref(0);
    const intervalId: Ref<NodeJS.Timeout | undefined> = ref();
    const progressIntervalId: Ref<NodeJS.Timeout | undefined> = ref();
    const blockFromChain: Ref<Block | undefined> = ref();
    const itemState = ItemState.create<Block>();
    const variables: Ref<{ height: string }> = ref({ height: '' });
    const height: Ref<number | undefined> = ref();
    const showError = ref(false);

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useBlockPageQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.block as Block;

        if (itemState.item.value) {
          indexed.value = true;
          blockFromChain.value = undefined;
          stopWatcher();
        }
      });

      watch(error, (updatedError) => {
        itemState.error.value = updatedError;

        if (
          updatedError?.message.includes('Entity was not found') &&
          !blockFromChain.value
        ) {
          // Load block from chain if not found
          loadFromChain();
        }
      });

      itemState.fetching = fetching;
      itemState.isPaused = isPaused;
    };

    watch(
      () => route.params.height,
      async (newHeight) => {
        itemState.isPaused.value = !newHeight;

        if (newHeight) {
          height.value = Number(newHeight.toString());
          variables.value.height = newHeight.toString();
        } else {
          variables.value.height = '';
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
      height.value = Number(route.params.height.toString());
      variables.value.height = height.value.toString();

      executeQuery();
    });

    onUnmounted(() => {
      stopWatcher();
    });

    const loadFromChain = async () => {
      if (height.value && !blockFromChain.value) {
        blockFromChain.value = await getBlock(height.value);

        if (!blockFromChain.value) {
          // Only show error if fetching from chain has failed
          showError.value = true;
        }
      }

      indexTime.value = blockFromChain.value?.header.timestamp + 240000;

      startWatcher();
    };

    return {
      tab,
      statsStore,
      indexed,
      indexTime,
      msToIndex,
      indexProgress,
      itemState,
      height,
      block: computed((): Block | undefined => {
        if (!itemState.item.value) {
          return blockFromChain.value;
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
