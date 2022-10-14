<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <address-stats-component
      v-if="addressFilter.length > 0"
      :ids="addressFilter"
    />

    <q-card class="transactions-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Portfolio</div>

        <token-balances-table
          v-if="addressFilter.length > 0"
          :addresses="addressFilter"
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
import AddressStatsComponent from '@koiner/chain/components/address/address-stats-component.vue';
import AccountAddressesFilter from '@koiner/chain/components/address/account-addresses-filter.vue';
import TokenBalancesTable from '@koiner/tokenize/components/holder/search/view/token-balances-table.vue';

export default defineComponent({
  name: 'AccountPortfolioPage',
  components: {
    AccountAddressesFilter,
    AddressStatsComponent,
    TokenBalancesTable,
  },

  setup() {
    const addressFilter: Ref<string[]> = ref([]);

    const updateFilter = (newFilter: string[]) => {
      addressFilter.value = newFilter;
    };

    return {
      addressFilter,
      updateFilter,
    };
  },
});
</script>
