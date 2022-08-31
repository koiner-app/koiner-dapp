<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card
      class="table-card shadow-1"
      style="
        max-width: 1288px;
        margin: 0 auto;
        box-shadow: 0 0 20px rgb(0 0 0 / 8%);
      "
    >
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Events</div>
          <q-space />
        </div>

        <search-filters
          :request="request"
          search-placeholder="Search by event id, parent (block id or transaction id), contract id, name or impacted addresses"
        />

        <q-json-search
          :schema="schema"
          :uischema="uiSchema"
          :request="request"
          :data="{}"
          @on-scroll="onScroll"
          :scroll-position="position"
          :additional-renderers="renderers"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import eventsSearchSchema from '@koiner/chain/event/search/events-search.schema.json';
import eventsSearchUiSchema from '@koiner/chain/event/search/view/events-table.ui-schema.json';

export default defineComponent({
  name: 'EventsIndexPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.events.position = newScrollPosition;
    };

    return {
      onScroll,
      schema: eventsSearchSchema,
      uiSchema: eventsSearchUiSchema,
      request: searchStore.events.request,
      position: searchStore.events.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
