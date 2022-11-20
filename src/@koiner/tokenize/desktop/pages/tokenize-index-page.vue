<template>
  <q-page class="row items-start">
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <counter-metric
          title="Transfers"
          :value="statsStore.tokenStats.transferCount"
        />

        <q-separator vertical />

        <counter-metric
          title="Tokens"
          :value="statsStore.tokenStats.contractCount"
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
            <tokens-operations-table
              :burn-filter="false"
              :mint-filter="false"
            />
          </q-tab-panel>
          <q-tab-panel name="token-events">
            <tokens-events-table />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-card class="search-card gt-md" flat bordered>
      <q-card-section>
        <div class="text-overline">Tokens</div>

        <div class="search-card-content">
          <token-contracts-table />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import TokensOperationsTable from '../../components/operation/search/view/tokens-operations-table.vue';
import TokensEventsTable from '../../components/event/search/view/tokens-events-table.vue';
import TokenContractsTable from '../../components/contract/search/view/token-contracts-table.vue';

export default defineComponent({
  name: 'TokenizeIndexPage',
  components: {
    TokenContractsTable,
    TokensEventsTable,
    TokensOperationsTable,
    CounterMetric,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();

    const tab: Ref<string> = ref('token-operations');

    return {
      tab,
      koinerStore,
      statsStore,
    };
  },
});
</script>
