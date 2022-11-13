<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <counter-metric
          name="Transfers"
          :value="statsStore.tokenStats.transferCount"
        />

        <q-separator vertical />

        <counter-metric
          name="Tokens"
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
            name="contract-operations"
          />
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Events"
            name="contract-events"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="contract-operations">
            <contract-operations-table
              :burn-filter="false"
              :mint-filter="false"
            />
          </q-tab-panel>
          <q-tab-panel name="contract-events">
            <contract-events-table />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-card class="contract-contracts-card" flat bordered>
      <q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Contracts</div>

          <contracts-table />
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import ContractsTable from '../../components/contract/search/view/contracts-table.vue';
import ContractEventsTable from '../../components/contract/search/view/contracts-events-table.vue';
import ContractOperationsTable from '../../components/contract/search/view/contracts-operations-table.vue';

export default defineComponent({
  name: 'ContractsIndexPage',
  components: {
    ContractOperationsTable,
    ContractEventsTable,
    ContractsTable,
    CounterMetric,
  },

  setup() {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();

    const tab: Ref<string> = ref('contract-operations');

    return {
      tab,
      koinerStore,
      statsStore,
    };
  },
});
</script>

<style lang="scss" scoped>
.tabs-card {
  width: 100%;
  max-width: calc(60% - 24px);
}
.contract-contracts-card {
  width: 100%;
  max-width: calc(40% - 24px);
}
</style>
