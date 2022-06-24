<template>
  <search-table
    :config="config"
    :search-manager="searchManager"
    plural-translation="tokenContracts"
  >
    <template #[`id`]="{ result }">
      <router-link :to="`/tokens/${result.item.id}`">{{
        result.item.id
      }}</router-link>
    </template>
  </search-table>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import SearchTable from '@appvise/component/search/table/search-table.vue';
import { TokenContract } from '@koiner/contract/token/token-contract';
import { TokenContractsTableBoard } from '@koiner/contract/token/search/table/token-contracts-table-board';
import { TokenContractSearchProvider } from '@koiner/contract/token/search/token-contract-search-provider';
import { SimpleSearchManager } from '@appvise/search-manager-bak';

export default defineComponent({
  components: {
    SearchTable,
  },

  setup() {
    const router = useRouter();
    const tokenContractSearchProvider = new TokenContractSearchProvider();
    const searchManager = ref(
      new SimpleSearchManager<TokenContract>(tokenContractSearchProvider)
    );

    return {
      router,
      searchManager,
      config: TokenContractsTableBoard,
    };
  },
});
</script>
