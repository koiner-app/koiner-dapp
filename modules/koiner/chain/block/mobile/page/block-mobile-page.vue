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
                <div class="stat-title">Block</div>
                <div class="stat-content" style="font-size: 1.5rem">
                  #{{ block.header.height }} <br /><span
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

            <q-card flat bordered class="details-block">
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
  name: 'BlockMobilePage',
  components: {
    ContractEventsTable,
    BlockProducerComponent,
    TransactionsTable,
    ContractOperationsTable,
    BlockDetailsComponent,
    TokensEventsTable,
    TokensOperationsTable,
  },

  setup() {
    const statsStore = useStatsStore();
    const route = useRoute();

    const tab: Ref<string> = ref('details');

    const itemState = ItemState.create<Block>();
    const variables: Ref<{ height: string }> = ref({ height: '' });

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
