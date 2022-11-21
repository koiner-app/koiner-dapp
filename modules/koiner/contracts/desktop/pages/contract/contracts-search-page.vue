<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
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
import contractsSearchSchema from '../../../components/contract/search/contracts-search.schema.json';
import contractsSearchUiSchema from '../../../components/contract/search/view/contracts-table.ui-schema.json';

export default defineComponent({
  name: 'ContractsIndexPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.contracts.position = newScrollPosition;
    };

    return {
      onScroll,
      schema: contractsSearchSchema,
      uiSchema: contractsSearchUiSchema,
      request: searchStore.contracts.request,
      position: searchStore.contracts.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
