<template>
  <search-table
    :config="config"
    :search-manager="searchManager"
    plural-translation="transactions"
  >
    <template #[`id`]="{ result }">
      <router-link :to="`/transactions/${result.item.id}`">{{
        result.item.id
      }}</router-link>
    </template>
    <template #[`blockHeight`]="{ result }">
      <router-link :to="`/blocks/${result.item.blockHeight}`">{{
        result.item.blockHeight
      }}</router-link>
    </template>
  </search-table>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import SearchTable from '@appvise/component/search/table/search-table.vue';
import { Transaction } from '@koiner/chain/transaction/transaction';
import { TransactionsTableBoard } from '@koiner/chain/transaction/search/table/transactions-table-board';
import { TransactionSearchProvider } from '@koiner/chain/transaction/search/transaction-search-provider';
import { SimpleSearchManager } from '@appvise/search-manager';

export default defineComponent({
  components: {
    SearchTable,
  },

  setup() {
    const router = useRouter();
    const transactionSearchProvider = new TransactionSearchProvider();
    const searchManager = ref(
      new SimpleSearchManager<Transaction>(transactionSearchProvider)
    );

    return {
      router,
      searchManager,
      config: TransactionsTableBoard,
    };
  },
});
</script>
