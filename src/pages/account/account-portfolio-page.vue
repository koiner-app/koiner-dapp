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
        />
        <q-separator vertical />
        <token-holder-balances-metric
          :token-holders="tokenHolders"
          :contract-id="koinerConstants.contracts.vhp"
        />
      </q-card-section>
    </q-card>

    <q-card class="transactions-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Portfolio</div>

        <token-balances-table
          v-if="addressFilter.length > 0"
          :addresses="addressFilter"
          @change="updateTokenHolders"
        />
      </q-card-section>
    </q-card>

    <q-card class="blocks-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Addresses</div>

        <div class="q-pa-lg">
          <account-addresses-filter @change="updateFilter" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import AccountAddressesFilter from '@koiner/chain/components/address/account-addresses-filter.vue';
import TokenBalancesTable from '@koiner/tokenize/components/holder/search/view/token-balances-table.vue';
import TokenHolderBalancesMetric from '@koiner/tokenize/components/holder/metrics/token-holder-balances-metric.vue';
import { TokenHolder, TokenHoldersConnection } from '@koiner/sdk';
import { koinerConstants } from '@koiner/koiner-constants';

export default defineComponent({
  name: 'AccountPortfolioPage',
  components: {
    AccountAddressesFilter,
    TokenBalancesTable,
    TokenHolderBalancesMetric,
  },

  setup() {
    const addressFilter: Ref<string[]> = ref([]);
    const tokenHolders: Ref<TokenHolder[]> = ref([]);

    const updateFilter = (newFilter: string[]) => {
      addressFilter.value = newFilter;
    };

    const updateTokenHolders = (newConnection: TokenHoldersConnection) => {
      if (newConnection?.edges) {
        tokenHolders.value = newConnection.edges.map((edge) => edge.node);
      }
    };

    return {
      addressFilter,
      updateFilter,
      updateTokenHolders,
      tokenHolders,
      koinerConstants,
    };
  },
});
</script>
