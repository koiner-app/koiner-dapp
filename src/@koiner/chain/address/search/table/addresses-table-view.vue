<template>
  <search-table
    :config="config"
    :search-manager="searchManager"
    plural-translation="addresses"
  >
    <template #[`id`]="{ result }">
      <router-link :to="`/addresses/${result.item.id}`">{{
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
import { Address } from '@koiner/chain/address/address';
import { AddressesTableBoard } from '@koiner/chain/address/search/table/addresses-table-board';
import { AddressSearchProvider } from '@koiner/chain/address/search/address-search-provider';
import { SimpleSearchManager } from '@appvise/search-manager-bak';

export default defineComponent({
  components: {
    SearchTable,
  },

  setup() {
    const router = useRouter();
    const addressSearchProvider = new AddressSearchProvider();
    const searchManager = ref(
      new SimpleSearchManager<Address>(addressSearchProvider)
    );

    return {
      router,
      searchManager,
      config: AddressesTableBoard,
    };
  },
});
</script>
