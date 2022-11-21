<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Events</div>
          <q-space />
          <search-filters
            :request="request"
            search-info="Search by event id"
          />
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
import eventsSearchSchema from '../../../../components/contract/search/contract-events-search.schema.json';
import eventsSearchUiSchema from '../../../../components/contract/search/view/contract-events-table.ui-schema.json';
import { QueryContractEventsArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'ContractEventsPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    let request: Ref<QueryContractEventsArgs> = ref({ filter: {} });
    let id: Ref<string | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id.toString();
      request.value.filter = {
        contractId: { equals: id.value },
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
