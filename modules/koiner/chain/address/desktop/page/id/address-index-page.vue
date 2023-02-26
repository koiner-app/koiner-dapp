<template>
  <q-page class="row items-start">
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <token-holder-balances-metric
          v-if="tokenHolders && tokenHolders.length > 0"
          :token-holders="tokenHolders"
          :contract="koinerStore.koinContract"
          :show-address-count="false"
        />
        <q-separator vertical />
        <token-holder-balances-metric
          v-if="tokenHolders && tokenHolders.length > 0"
          :token-holders="tokenHolders"
          :contract="koinerStore.vhpContract"
          :show-address-count="false"
          @calculated="updateTotalVhp"
        />
        <token-holder-balances-metric
          v-if="tokenHolders && tokenHolders.length > 0"
          title="Virtual total"
          :token-holders="tokenHolders"
          :contract="koinerStore.koinContract"
          :contract-ids="[
            koinerStore.koinContract.id,
            koinerStore.vhpContract.id,
          ]"
          :show-address-count="false"
          @calculated="updateTotalVirtualKoin"
        />
        <q-separator vertical />
        <counter-metric title="Burned" :value="burned" :decimals="2" unit="%" />
      </q-card-section>
    </q-card>

    <q-card class="tabs-card" flat bordered style="max-width: 100%">
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Portfolio</div>

        <token-balances-table
          v-if="address"
          :addresses="[address.id]"
          :show-address="false"
          @change="updateTokenHolders"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, Ref } from 'vue';
import TokenBalancesTable from '@koiner/tokenize/components/holder/search/view/token-balances-table.vue';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metric/token-holder-balances-metric.vue';
import { Address, TokenHolder, TokenHoldersConnection } from '@koiner/sdk';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import { useKoinerStore } from 'stores/koiner';

export default defineComponent({
  name: 'AddressIndexPage',
  components: {
    CounterMetric,
    TokenBalancesTable,
    TokenHolderBalancesMetric,
  },
  props: {
    address: {
      required: true,
      type: Object as PropType<Address>,
    },
  },

  setup() {
    const koinerStore = useKoinerStore();

    const totalVhp: Ref<number | undefined> = ref();
    const totalVirtualKoin: Ref<number | undefined> = ref();
    const tokenHolders: Ref<TokenHolder[]> = ref([]);

    const updateTokenHolders = (newConnection: TokenHoldersConnection) => {
      if (newConnection?.edges) {
        tokenHolders.value = newConnection.edges.map((edge) => edge.node);
      }
    };

    return {
      updateTokenHolders,
      tokenHolders,
      koinerStore,

      totalVhp,
      totalVirtualKoin,
      updateTotalVhp: (newAmount: number) => {
        totalVhp.value = newAmount ?? 0;
      },
      updateTotalVirtualKoin: (newAmount: number) => {
        totalVirtualKoin.value = newAmount ?? 0;
      },
      burned: computed(() => {
        return totalVirtualKoin.value && totalVhp.value
          ? (totalVhp.value / totalVirtualKoin.value) * 100
          : 0;
      }),
    };
  },
});
</script>
