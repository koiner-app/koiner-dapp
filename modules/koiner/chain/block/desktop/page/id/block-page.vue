<template>
  <q-page
    v-if="block"
    class="row items-start"
  >
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <counter-metric title="Height" :value="block.header.height" />

        <q-separator vertical />

        <counter-metric title="Transactions" :value="block.transactionCount" />

        <q-separator vertical />

        <counter-metric title="Events" :value="block.receipt.eventCount" />
      </q-card-section>
    </q-card>

    <q-card class="tabs-card" flat bordered>
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
            <contract-operations-table
              :heights="[block.header.height]"
            />
          </q-tab-panel>
          <q-tab-panel name="token-operations">
            <tokens-operations-table
              :heights="[block.header.height]"
            />
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
      <q-card-section class="q-pa-none" style="padding-top: 0 !important;">
        <q-card flat bordered class="q-mb-lg">
          <q-card-section>
            <q-card-section class="q-pa-none q-pt-xs">
              <div class="text-overline">Details</div>

              <block-details-component :block="block" />
            </q-card-section>
          </q-card-section>
        </q-card>

        <q-card flat bordered>
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
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';
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

export default defineComponent({
  name: 'NetworkIndexPage',
  components: {
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

    const itemState = ItemState.create<Block>();
    const variables: Ref<{ height: string }> = ref({ height: '' });

    // const account = useAccountStore();
    // const block: Ref<Block | undefined> = ref();

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useBlockPageQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.block as Block;
      });

      itemState.error = error;
      itemState.fetching = fetching;
      itemState.isPaused = isPaused;
    };

    variables.value.height = route.params.height.toString();

    executeQuery();

    // Workaround to reactivate urql to resume on a re-entering of page
    // TODO: Find out why this is necessary
    itemState.isPaused.value = true;
    itemState.isPaused.value = false;

    watch(
      () => route.params.height,
      async (newHeight) => {
        itemState.isPaused.value = !newHeight;
        variables.value.height = newHeight ? newHeight.toString() : '';
      }
    );

    return {
      tab,
      statsStore,

      itemState,
      block: itemState.item,
      error: itemState.error,
    };
  },
});
</script>
