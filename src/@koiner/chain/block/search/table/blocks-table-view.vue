<template>
  <search-table
    :config="config"
    :search-manager="searchManager"
    plural-translation="blocks"
  >
    <template #[`height`]="{ result }">
      <router-link :to="`/blocks/${result.item.header.height}`">{{
        result.item.header.height
      }}</router-link>
    </template>
    <template #[`timestamp`]="{ result }">
      <span
        >{{ timeAgo(result.item.header.timestamp) }}
        <q-tooltip>
          {{
            date.formatDate(
              result.item.header.timestamp,
              'YYYY-MM-DD HH:mm:ss.SSSZ'
            )
          }}
        </q-tooltip>
      </span>
    </template>
    <template #[`transactionCount`]="{ result }">
      <router-link :to="`/blocks/${result.item.header.height}/transactions`">{{
          result.item.transactionCount
        }}</router-link>
    </template>
    <template #[`producer`]="{ result }">
      <span v-if="result.item.reward">
        <address-link :address="result.item.reward.producerId" />
      </span>
    </template>
  </search-table>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import SearchTable from '@appvise/component/search/table/search-table.vue';
import { Block } from '@koiner/chain/block/block';
import { BlocksTableBoard } from '@koiner/chain/block/search/table/blocks-table-board';
import { BlockSearchProvider } from '@koiner/chain/block/search/block-search-provider';
import { SimpleSearchManager } from '@appvise/search-manager';
import { timeAgo } from '@koiner/utils/date';
import { date } from 'quasar';
import AddressLink from '@koiner/chain/address/AddressLink.vue';

export default defineComponent({
  components: {
    AddressLink,
    SearchTable,
  },

  setup() {
    const router = useRouter();
    const blockSearchProvider = new BlockSearchProvider();
    const searchManager = ref(
      new SimpleSearchManager<Block>(blockSearchProvider)
    );

    return {
      timeAgo,
      date,
      router,
      searchManager,
      config: BlocksTableBoard,
    };
  },
});
</script>
