<template>
  <search-table
    :config="config"
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
    <template #[`to`]="{ result }">
      <address-link :address="result.item.to" />
    </template>
  </search-table>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import SearchTable from '@appvise/component/search/table/search-table.vue';
import { ContractOperation } from '@koiner/contract/contract/contract-operation';
import { ContractOperationsTableBoard } from '@koiner/contract/contract/search/table/contract-operations-table-board';
import { ContractOperationSearchProvider } from '@koiner/contract/contract/search/contract-operation-search-provider';
import { SimpleSearchManager } from '@appvise/search-manager-bak';
import AddressLink from '@koiner/chain/address/AddressLink.vue';

export default defineComponent({
  components: {
    AddressLink,
    SearchTable,
  },
  props: {
    name: {
      type: String,
      required: false,
    },
  },

  setup() {
    const router = useRouter();
    const operationSearchProvider = new ContractOperationSearchProvider();
    const searchManager = ref(
      new SimpleSearchManager<ContractOperation>(operationSearchProvider)
    );

    return {
      router,
      searchManager,
      config: ContractOperationsTableBoard,
    };
  },
});
</script>
