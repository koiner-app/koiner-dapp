<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Contracts</div>
          <q-space />
          <search-filters
            :request="request"
            search-info="Search by contract id"
          />
        </div>

        <q-json-search
          :schema="schema"
          :uischema="uiSchema"
          :request="request"
          :additional-renderers="renderers"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import schema from '../../../components/contract/search/contracts-search.schema.json';
import uiSchema from '../../../components/contract/search/view/contracts-table.ui-schema.json';
import { QueryContractsArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'ContractsIndexPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    const searchStore = useSearchStore();

    let request: Ref<QueryContractsArgs> = ref({});

    return {
      schema,
      uiSchema,
      request,
      searchStore,
      renderers: KoinerRenderers,
    };
  },
});
</script>
