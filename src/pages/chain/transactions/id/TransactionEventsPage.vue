<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Events</div>
          <q-space />
          <search-filters :request="request" />
        </div>

        <q-json-search
          :schema="schema"
          :uischema="uiSchema"
          :request="request"
          :data="{}"
          :additional-renderers="renderers"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import eventsSearchSchema from '@koiner/chain/event/search/events-search.schema.json';
import eventsSearchUiSchema from '@koiner/chain/event/search/view/events-table.ui-schema.json';
import { QueryEventsArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'TransactionEventsPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    let request: Ref<QueryEventsArgs> = ref({ filter: {} });
    let id: Ref<string | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id.toString();
      request.value.filter = {
        parentId: { equals: id.value },
        parentType: { equals: 'transaction' },
      };
    });

    return {
      schema: eventsSearchSchema,
      uiSchema: eventsSearchUiSchema,
      request: request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
