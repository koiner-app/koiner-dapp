<template>
  <search-table
    :config="config"
    :search-manager="searchManager"
    plural-translation="contracts"
  >
    <template #[`id`]="{ result }">
      <router-link :to="`/contracts/${result.item.id}`">{{
        result.item.id
      }}</router-link>
    </template>
    <template #[`type`]="{ result }">
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
import { Contract } from '@koiner/contract/contract/contract';
import { ContractsTableBoard } from '@koiner/contract/contract/search/table/contracts-table-board';
import { ContractSearchProvider } from '@koiner/contract/contract/search/contract-search-provider';
import { SimpleSearchManager } from '@appvise/search-manager';

export default defineComponent({
  components: {
    SearchTable,
  },

  setup() {
    const router = useRouter();
    const contractSearchProvider = new ContractSearchProvider();
    const searchManager = ref(
      new SimpleSearchManager<Contract>(contractSearchProvider)
    );

    return {
      router,
      searchManager,
      config: ContractsTableBoard,
    };
  },
});
</script>
