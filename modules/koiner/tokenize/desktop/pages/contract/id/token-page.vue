<template>
  <q-page v-if="tokenContract" class="row items-start">
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <counter-metric
          title="Total Supply"
          :value="parseInt(tokenContract.totalSupply)"
          :unit="tokenContract.symbol"
          :token-decimals="tokenContract.decimals"
          :decimals="0"
        />

        <q-separator vertical />

        <counter-metric
          title="Holders"
          :value="tokenContract.holders.totalCount"
        />

        <q-separator vertical />

        <counter-metric
          title="Transfers"
          :value="tokenContract.transferCount"
        />

        <q-separator vertical />

        <counter-metric
          title="Events"
          :value="
            parseInt(tokenContract.burnCount) +
            parseInt(tokenContract.mintCount) +
            parseInt(tokenContract.transferCount)
          "
        />
      </q-card-section>
    </q-card>

    <q-card class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <q-tabs v-model="tab" dense align="left" style="width: 100%">
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Operations"
            name="token-operations"
          />
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Events"
            name="token-events"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="token-operations">
            <tokens-operations-table :contract-ids="[id]" />
          </q-tab-panel>
          <q-tab-panel name="token-events">
            <tokens-events-table :contract-ids="[id]" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-card class="search-card gt-md" flat bordered>
      <q-card-section>
        <div class="text-overline">Token Holders</div>

        <div class="search-card-content">
          <token-holders-table :contract-id="id" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import TokensOperationsTable from '../../../../components/operation/search/view/tokens-operations-table.vue';
import TokensEventsTable from '../../../../components/event/search/view/tokens-events-table.vue';
import { ItemState } from '@appvise/search-manager';
import { TokenContract, useTokenDesktopLayoutQuery } from '@koiner/sdk';
import { useRoute } from 'vue-router';
import TokenHoldersTable from '@koiner/tokenize/components/holder/search/view/token-holders-table.vue';

export default defineComponent({
  name: 'NetworkIndexPage',
  components: {
    TokenHoldersTable,
    TokensEventsTable,
    TokensOperationsTable,
    CounterMetric,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();

    const tab: Ref<string> = ref('token-operations');
    let id: Ref<string | undefined> = ref();

    const itemState = ItemState.create<TokenContract>();
    const variables: Ref<{ id: string }> = ref({ id: '' });
    const route = useRoute();

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useTokenDesktopLayoutQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.tokenContract as TokenContract;
      });

      itemState.error = error;
      itemState.fetching = fetching;
      itemState.isPaused = isPaused;
    };

    onMounted(async () => {
      id.value = route.params.id.toString();
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
      id,

      tab,
      koinerStore,
      statsStore,

      itemState,
      tokenContract: itemState.item,
      error: itemState.error,
      executeQuery,
    };
  },
});
</script>
