<template>
  <q-page v-if="block" class="row items-start mobile-tab-page">
    <q-card class="tabs-card" flat>
      <q-card-section class="q-pt-xs q-px-none">
        <q-tab-panels v-model="tab" animated>
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
                    Full data will be shown after block is irreversible and
                    indexed by our servers.
                    <span v-if="indexTime - Date.now() > 0"
                      >Expected time to index: {{ timeToGo(indexTime) }}</span
                    >
                  </span>
                </q-banner>

                <div class="stat-title">Block</div>
                <div class="stat-content" style="font-size: 1.5rem">
                  #{{ block.header.height }} <br /><span
                    v-if="block.transactionCount != null"
                    :class="`stat-unit`"
                    style="font-size: 0.875rem"
                    >{{ block.transactionCount }} Transaction<span
                      v-if="block.transactionCount > 1"
                      >s</span
                    ></span
                  >
                </div>
              </q-card-section>
            </q-card>

            <q-card flat bordered class="details-block">
              <q-card-section>
                <q-card-section class="q-pa-none q-pt-xs">
                  <div class="text-overline">Details</div>

                  <block-details-component :block="block" />
                </q-card-section>
              </q-card-section>
            </q-card>

            <q-card flat bordered class="details-block" v-if="indexed">
              <q-card-section>
                <q-card-section class="q-pa-none q-pt-xs">
                  <div class="text-overline">Block Reward</div>
                  <block-producer-component :block="block" :mobile="true" />
                </q-card-section>
              </q-card-section>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="transactions" class="tab--mobile-table">
            <transactions-table
              :heights="[block.header.height]"
              :mobile="true"
            />
          </q-tab-panel>
          <q-tab-panel name="contract-operations" class="tab--mobile-table">
            <contract-operations-table
              :heights="[block.header.height]"
              :mobile="true"
            />
          </q-tab-panel>
          <q-tab-panel name="token-operations" class="tab--mobile-table">
            <tokens-operations-table
              :heights="[block.header.height]"
              :mobile="true"
            />
          </q-tab-panel>
          <q-tab-panel name="token-events" class="tab--mobile-table">
            <tokens-events-table
              :heights="[block.header.height]"
              :mobile="true"
            />
          </q-tab-panel>
          <q-tab-panel name="events" class="tab--mobile-table">
            <contract-events-table
              :heights="[block.header.height]"
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
          label="Details"
          name="details"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Tx"
          name="transactions"
          :disable="!indexed"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Contract Ops"
          name="contract-operations"
          :disable="!indexed"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Token Ops"
          name="token-operations"
          :disable="!indexed"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Token Events"
          name="token-events"
          :disable="!indexed"
        />
        <q-tab
          class="text-overline"
          :ripple="false"
          label="Events"
          name="events"
          :disable="!indexed"
        />
      </q-tabs>
    </q-page-sticky>
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
import { timeAgo, timeToGo } from '@koiner/utils';
import { getBlock } from '@koiner/chain/koilib-service';

export default defineComponent({
  name: 'BlockMobilePage',
  methods: { timeToGo, timeAgo },
  components: {
    ErrorView,
    ContractEventsTable,
    BlockProducerComponent,
    TransactionsTable,
    ContractOperationsTable,
    BlockDetailsComponent,
    TokensEventsTable,
    TokensOperationsTable,
  },

  setup() {
    const route = useRoute();

    const tab: Ref<string> = ref('details');
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
