<template>
  <search-table
    :config="config"
    :request="request"
    :search-manager="searchManager"
    plural-translation="events"
  >
    <template #[`id`]="{ result }">
      <router-link :to="`/events/${result.item.id}`">{{
        result.item.id
      }}</router-link>
    </template>
    <template #[`transactionId`]="{ result }">
      <router-link :to="`/transactions/${result.item.transactionId}`">{{
        result.item.transactionId
      }}</router-link>
    </template>
    <template #[`sequence`]="{ result }">{{ result.item.sequence }} </template>
    <template #[`contractId`]="{ result }">
      <router-link :to="`/contracts/${result.item.contractId}`">{{
        result.item.contractId
      }}</router-link>
    </template>
  </search-table>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import SearchTable from '@appvise/component/search/table/search-table.vue';
import { Event } from '@koiner/chain/event/event';
import { EventsTableBoard } from '@koiner/chain/event/search/table/events-table-board';
import { EventSearchProvider } from '@koiner/chain/event/search/event-search-provider';
import { SearchRequest, SimpleSearchManager } from '@appvise/search-manager';

export default defineComponent({
  components: {
    SearchTable,
  },
  props: {
    blockHeight: {
      type: Number,
      required: false,
    },
  },

  setup(props) {
    const router = useRouter();
    const eventSearchProvider = new EventSearchProvider();
    const searchManager = ref(
      new SimpleSearchManager<Event>(eventSearchProvider)
    );

    let request: SearchRequest | undefined = undefined;

    if (props.blockHeight) {
      request = {
        first: 30,
        filter: {
          blockHeight: props.blockHeight,
        },
      } as SearchRequest;
    }

    return {
      router,
      searchManager,
      config: EventsTableBoard,
      request,
    };
  },
});
</script>
