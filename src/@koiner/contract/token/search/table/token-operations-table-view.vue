<template>
  <search-table
    :config="config"
    :request="request"
    :search-manager="searchManager"
    plural-translation="operations"
  >
    <template #[`transactionId`]="{ result }">
      <router-link
        :to="`/transactions/${result.item.transactionId}`"
        class="truncated-id"
        >{{ result.item.transactionId }}</router-link
      >
      <router-link :to="`/operations/${result.item.id}`">-></router-link>
    </template>
    <template #[`from`]="{ result }">
      <address-link :address="result.item.from" />
    </template>
    <template #[`to`]="{ result }">
      <address-link :address="result.item.to" />
    </template>
  </search-table>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import SearchTable from '@appvise/component/search/table/search-table.vue';
import { TokenOperation } from '@koiner/contract/token/token-operation';
import { TokenOperationsTableBoard } from '@koiner/contract/token/search/table/token-operations-table-board';
import { TokenOperationSearchProvider } from '@koiner/contract/token/search/token-operation-search-provider';
import { SearchRequest, SimpleSearchManager } from '@appvise/search-manager-bak';
import AddressLink from '@koiner/chain/address/AddressLink.vue';

export default defineComponent({
  components: {
    AddressLink,
    SearchTable,
  },
  props: {
    contractId: {
      type: String,
    },
    name: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    const router = useRouter();
    const operationSearchProvider = new TokenOperationSearchProvider();
    const searchManager = ref(
      new SimpleSearchManager<TokenOperation>(operationSearchProvider)
    );

    let request: SearchRequest | undefined = undefined;

    if (props.contractId || props.name) {
      request = {
        first: 30,
        filter: {
          contractId: props.contractId,
          name: props.name,
        },
      } as SearchRequest;
    }

    return {
      router,
      searchManager,
      config: TokenOperationsTableBoard,
      request,
    };
  },
});
</script>
