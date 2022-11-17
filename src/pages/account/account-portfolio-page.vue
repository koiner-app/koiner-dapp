<template>
  <q-page
    v-if="accountStore.addressesFilter.length > 0"
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <q-card class="stats-cards" flat bordered>
      <q-card-section horizontal>
        <token-holder-balances-metric
          v-if="tokenHolders && tokenHolders.length > 0"
          :token-holders="tokenHolders"
          :contract="koinerStore.koinContract"
        />
        <q-separator vertical />
        <token-holder-balances-metric
          v-if="tokenHolders && tokenHolders.length > 0"
          :token-holders="tokenHolders"
          :contract="koinerStore.vhpContract"
          @calculated="updateTotalVhp"
        />
        <q-separator vertical />
        <token-holder-balances-metric
          v-if="tokenHolders && tokenHolders.length > 0"
          title="Virtual total"
          :token-holders="tokenHolders"
          :contract="koinerStore.koinContract"
          :contract-ids="[
            koinerStore.koinContract.id,
            koinerStore.vhpContract.id,
          ]"
          @calculated="updateTotalVirtualKoin"
        />
        <q-separator vertical />
        <counter-metric
          name="Burned"
          :value="burned"
          :decimals="2"
          caption="%"
        />
      </q-card-section>
    </q-card>

    <q-card class="tabs-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Portfolio</div>

        <token-balances-table
          v-if="accountStore.addressesFilter.length > 0"
          :addresses="accountStore.addressesFilter"
          @change="updateTokenHolders"
        />
      </q-card-section>
    </q-card>

    <q-card class="sidebar-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Addresses</div>

        <div class="q-pa-lg">
          <account-addresses-filter />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref } from 'vue';
import AccountAddressesFilter from '@koiner/chain/components/address/account-addresses-filter.vue';
import TokenBalancesTable from '@koiner/tokenize/components/holder/search/view/token-balances-table.vue';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metric/token-holder-balances-metric.vue';
import { TokenHolder, TokenHoldersConnection } from '@koiner/sdk';
import CounterMetric from '@koiner/components/metrics/counter-metric.vue';
import { useAccountStore } from 'stores/account';
import { useKoinerStore } from 'stores/koiner';

export default defineComponent({
  name: 'AccountPortfolioPage',
  components: {
    CounterMetric,
    AccountAddressesFilter,
    TokenBalancesTable,
    TokenHolderBalancesMetric,
  },

  setup() {
    const accountStore = useAccountStore();
    const koinerStore = useKoinerStore();
    const tokenHolders: Ref<TokenHolder[]> = ref([]);
    const totalVhp: Ref<number | undefined> = ref();
    const totalVirtualKoin: Ref<number | undefined> = ref();

    const updateTokenHolders = (newConnection: TokenHoldersConnection) => {
      if (newConnection?.edges) {
        tokenHolders.value = newConnection.edges.map((edge) => edge.node);
      }
    };

    return {
      accountStore,
      koinerStore,
      updateTokenHolders,
      tokenHolders,

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
          ? (totalVhp.value / totalVirtualKoin.value) * 100
          : 0;
      }),
    };
  },
});
</script>
