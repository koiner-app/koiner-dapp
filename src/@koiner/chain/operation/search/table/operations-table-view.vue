<template>
  <search-table
    :config="config"
    :search-manager="searchManager"
    plural-translation="operations"
  >
    <template #[`id`]="{ result }">
      <router-link :to="`/operations/${result.item.id}`">{{
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
import { Operation } from '@koiner/chain/operation/operation';
import { OperationsTableBoard } from '@koiner/chain/operation/search/table/operations-table-board';
import { OperationSearchProvider } from '@koiner/chain/operation/search/operation-search-provider';
import { SimpleSearchManager } from '@appvise/search-manager';

export default defineComponent({
  components: {
    SearchTable,
  },

  setup() {
    const router = useRouter();
    const operationSearchProvider = new OperationSearchProvider();
    const searchManager = ref(
      new SimpleSearchManager<Operation>(operationSearchProvider)
    );

    return {
      router,
      searchManager,
      config: OperationsTableBoard,
    };
  },
});
</script>
