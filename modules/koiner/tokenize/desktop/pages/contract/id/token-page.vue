<template>
  <q-page v-if="tokenContract" class="row items-start">
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <counter-metric
          :style="totalSupply == null ? 'opacity: 0;' : ''"
          title="Total Supply"
          :value="totalSupply"
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
            <tokens-operations-table :contract-ids="[tokenContract.id]" />
          </q-tab-panel>
          <q-tab-panel name="token-events">
            <tokens-events-table :contract-ids="[tokenContract.id]" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <q-card class="search-card gt-md" flat bordered>
      <q-card-section>
        <div class="text-overline">Token Holders</div>

        <div class="search-card-content">
          <token-holders-table :contract-id="tokenContract.id" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, Ref, watch } from 'vue';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import { TokenContract } from '@koiner/sdk';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import TokenHoldersTable from '../../../../components/holder/search/view/token-holders-table.vue';
import TokensOperationsTable from '../../../../components/operation/search/view/tokens-operations-table.vue';
import TokensEventsTable from '../../../../components/event/search/view/tokens-events-table.vue';
import { useTokensStore } from 'stores/tokens';

export default defineComponent({
  name: 'TokenPage',
  components: {
    TokenHoldersTable,
    TokensEventsTable,
    TokensOperationsTable,
    CounterMetric,
  },
  props: {
    tokenContract: {
      required: true,
      type: Object as PropType<TokenContract>,
    },
  },

  setup(props) {
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const tokensStore = useTokensStore();

    const tab: Ref<string> = ref('token-operations');

    const totalSupply: Ref<number | null> = ref(null);

    const loadOnChainSupply = async () => {
      const newSupply = await tokensStore.supply(props.tokenContract.id);

      if (newSupply) {
        totalSupply.value = newSupply.supply;
      } else {
        totalSupply.value = null;
      }
    };
    watch(props.tokenContract, async () => {
      await loadOnChainSupply();
    });

    onMounted(async () => {
      await loadOnChainSupply();
    });

    return {
      totalSupply,
      tab,
      koinerStore,
      statsStore,
    };
  },
});
</script>
