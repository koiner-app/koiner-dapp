<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <token-holder-balances-metric
          :token-holders="tokenHolders"
          :contract-id="koinerConstants.contracts.koin"
          :show-address-count="false"
        />
        <q-separator vertical />
        <token-holder-balances-metric
          :token-holders="tokenHolders"
          :contract-id="koinerConstants.contracts.vhp"
          :show-address-count="false"
          @calculated="updateTotalVhp"
        />
        <token-holder-balances-metric
          title="Virtual total"
          :token-holders="tokenHolders"
          :contract-ids="[
            koinerConstants.contracts.koin,
            koinerConstants.contracts.vhp,
          ]"
          :show-address-count="false"
          @calculated="updateTotalVirtualKoin"
        />
        <q-separator vertical />
        <counter-metric
          v-if="totalVhp && totalVirtualKoin"
          name="Burned"
          :value="burned"
          :decimals="2"
          caption="%"
        />
      </q-card-section>
    </q-card>

    <q-card class="transactions-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Portfolio</div>

        <token-balances-table
          v-if="id"
          :addresses="[id]"
          @change="updateTokenHolders"
        />
      </q-card-section>
    </q-card>

    <q-card class="blocks-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">...</div>

        <div class="q-pa-lg">
          <br />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref, watch } from 'vue';
import TokenBalancesTable from '@koiner/tokenize/components/holder/search/view/token-balances-table.vue';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metric/token-holder-balances-metric.vue';
import { TokenHolder, TokenHoldersConnection } from '@koiner/sdk';
import { koinerConstants } from '@koiner/koiner-constants';
import { useRoute } from 'vue-router';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';

export default defineComponent({
  name: 'AccountPortfolioPage',
  components: {
    CounterMetric,
    TokenBalancesTable,
    TokenHolderBalancesMetric,
  },

  setup() {
    let id: Ref<string | undefined> = ref();
    const route = useRoute();
    const totalVhp: Ref<number | undefined> = ref();
    const totalVirtualKoin: Ref<number | undefined> = ref();

    onMounted(async () => {
      id.value = route.params.id.toString();
    });

    watch(
      () => route.params.id,
      async (newId) => {
        id.value = newId.toString();
      }
    );

    const tokenHolders: Ref<TokenHolder[]> = ref([]);

    const updateTokenHolders = (newConnection: TokenHoldersConnection) => {
      if (newConnection?.edges) {
        tokenHolders.value = newConnection.edges.map((edge) => edge.node);
      }
    };

    return {
      id,
      updateTokenHolders,
      tokenHolders,
      koinerConstants,

      totalVhp,
      totalVirtualKoin,
      updateTotalVhp: (newAmount: number) => {
        totalVhp.value = newAmount;
      },
      updateTotalVirtualKoin: (newAmount: number) => {
        totalVirtualKoin.value = newAmount;
      },
      burned: computed(() => {
        return totalVirtualKoin.value && totalVhp.value
          ? totalVhp.value / totalVirtualKoin.value
          : 0;
      }),
    };
  },
});
</script>
