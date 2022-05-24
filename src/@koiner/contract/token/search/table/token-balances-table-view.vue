<template>
  <search-table
    :config="config"
    :request="request"
    :search-manager="searchManager"
    plural-translation="balances"
  >
    <template #[`addressId`]="{ result }">
      <address-link :address="result.item.addressId" />
    </template>
    <template #[`contract`]="{ result }">
      <router-link :to="`/tokens/${result.item.contract.id}`"
        >{{ result.item.contract.name }}
        <q-chip>{{ result.item.contract.symbol }}</q-chip></router-link
      >
    </template>
    <template #[`balance`]="{ result }">
      {{ result.item.balance }}
    </template>
  </search-table>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import SearchTable from '@appvise/component/search/table/search-table.vue';
import { TokenBalance } from '@koiner/contract/token/token-balance';
import {
  AddressBalancesTableBoard,
  TokenBalancesTableBoard,
} from '@koiner/contract/token/search/table/token-balances-table-board';
import { TokenBalanceSearchProvider } from '@koiner/contract/token/search/token-balance-search-provider';
import { SearchRequest, SimpleSearchManager } from '@appvise/search-manager';
import AddressLink from '@koiner/chain/address/AddressLink.vue';

export default defineComponent({
  components: {
    AddressLink,
    SearchTable,
  },
  props: {
    contractId: {
      type: String,
      required: false,
    },
    addressId: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    const router = useRouter();
    const balanceSearchProvider = new TokenBalanceSearchProvider(
      props.addressId != null
    );
    const searchManager = ref(
      new SimpleSearchManager<TokenBalance>(balanceSearchProvider)
    );

    let request: SearchRequest | undefined = undefined;

    if (props.contractId || props.addressId) {
      request = {
        first: 30,
        filter: {
          contractId: props.contractId,
          addressId: props.addressId,
        },
      } as SearchRequest;
    }

    return {
      router,
      searchManager,
      config:
        props.addressId != null
          ? AddressBalancesTableBoard
          : TokenBalancesTableBoard,
      request,
    };
  },
});
</script>
