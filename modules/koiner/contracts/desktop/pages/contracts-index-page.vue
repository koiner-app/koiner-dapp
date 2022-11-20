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
            class="text-overline lt-lg"
            :ripple="false"
            label="Contracts"
            name="contracts"
          />
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
          <q-tab-panel name="contracts">
            <contracts-table />
          </q-tab-panel>
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

    <q-card class="search-card gt-md" flat bordered>
      <q-card-section>
        <div class="text-overline">Contracts</div>

        <div class="search-card-content">
          <contracts-table />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref, Ref, watch} from 'vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import ContractsTable from '../../components/contract/search/view/contracts-table.vue';
import ContractEventsTable from '../../components/contract/search/view/contracts-events-table.vue';
import ContractOperationsTable from '../../components/contract/search/view/contracts-operations-table.vue';
import {useWindowSize} from '@vueuse/core';

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

    const { width } = useWindowSize();

    const tab: Ref<string> = ref(
      width.value < 1440 ? 'contracts' : 'contract-operations'
    );

    watch(width, () => {
      if (width.value > 1439.99 && tab.value === 'contracts') {
        tab.value = 'contract-operations';
      }
    });

    return {
      tab,
      koinerStore,
      statsStore,
    };
  },
});
</script>
