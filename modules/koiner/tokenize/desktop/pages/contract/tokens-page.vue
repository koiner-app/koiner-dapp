<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <counter-metric title="Tokens" :value="tokenContractsCount" />

        <q-separator vertical />

        <counter-metric title="Liquidity Pools" :value="liquidityPoolsCount" />

        <q-separator vertical />

        <counter-metric
          title="Transfers"
          :value="statsStore.tokenStats.transferCount"
        />
      </q-card-section>
    </q-card>

    <q-card class="table-card" flat bordered style="width: 100%">
      <q-card-section>
        <q-tabs v-model="tab" dense align="left" style="width: 100%">
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Tokens"
            name="tokens"
          />
          <q-tab
            class="text-overline"
            :ripple="false"
            label="Liquidity Pools"
            name="liquidity-pools"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="tokens" class="tab--mobile-table">
            <token-contracts-table
              :liquidity-pools="false"
              @contract-count-updated="(newCount: number) => tokenContractsCount = newCount"
            />

            <!-- Hacky way for now to fetch liquidityPoolsCount before opening liquidity-pool tab -->
            <div
              style="
                height: 0 !important;
                width: 0 !important;
                opacity: 0 !important;
              "
            >
              <token-contracts-table
                :liquidity-pools="true"
                @contract-count-updated="(newCount: number) => liquidityPoolsCount = newCount"
              />
            </div>
          </q-tab-panel>
          <q-tab-panel
            name="liquidity-pools"
            class="tab--mobile-table liquidity-pools"
          >
            <token-contracts-table
              :liquidity-pools="true"
              @contract-count-updated="(newCount: number) => liquidityPoolsCount = newCount"
            />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import schema from '../../../components/contract/search/token-contracts-search.schema.json';
import uiSchema from '../../../components/contract/search/view/token-contracts-table.ui-schema.json';
import TokenContractsTable from '../../../components/contract/search/view/token-contracts-table.vue';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import { useStatsStore } from 'stores/stats';

export default defineComponent({
  name: 'TokenContractsIndexPage',
  components: {
    CounterMetric,
    TokenContractsTable,
  },

  setup() {
    const statsStore = useStatsStore();
    const searchStore = useSearchStore();

    const tab: Ref<string> = ref('tokens');

    const tokenContractsCount = ref(0);
    const liquidityPoolsCount = ref(0);

    return {
      tab,
      statsStore,
      tokenContractsCount,
      liquidityPoolsCount,
      schema,
      uiSchema,
      request: searchStore.tokenContracts.request,
      position: searchStore.tokenContracts.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
