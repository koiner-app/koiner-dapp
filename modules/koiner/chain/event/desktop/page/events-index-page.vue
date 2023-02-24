<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <events-table title="Events" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import schema from '@koiner/chain/event/search/events-search.schema.json';
import uiSchema from '@koiner/chain/event/search/view/events-table.ui-schema.json';
import EventsTable from '@koiner/chain/event/search/view/events-table.vue';

export default defineComponent({
  name: 'EventsIndexPage',
  components: { EventsTable },

  setup() {
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.events.position = newScrollPosition;
    };

    return {
      onScroll,
      schema,
      uiSchema,
      request: searchStore.events.request,
      position: searchStore.events.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
