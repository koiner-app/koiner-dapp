<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <counter-metric
          title="Tokens"
          :value="statsStore.tokenStats.contractCount"
        />

        <q-separator vertical />

        <counter-metric
          title="Transfers"
          :value="statsStore.tokenStats.transferCount"
        />
      </q-card-section>
    </q-card>

    <q-card class="table-card shadow-1">
      <q-card-section>
        <token-contracts-table title="Tokens" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import schema from '../../../components/contract/search/token-contracts-search.schema.json';
import uiSchema from '../../../components/contract/search/view/token-contracts-table.ui-schema.json';
import TokenContractsTable from '../../../components/contract/search/view/token-contracts-table.vue';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import { useStatsStore } from 'stores/stats';

export default defineComponent({
  name: 'TokenContractsIndexPage',
  components: { CounterMetric, TokenContractsTable },

  setup() {
    const statsStore = useStatsStore();
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.tokenContracts.position = newScrollPosition;
    };

    return {
      statsStore,
      onScroll,
      schema,
      uiSchema,
      request: searchStore.tokenContracts.request,
      position: searchStore.tokenContracts.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
