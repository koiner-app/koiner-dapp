<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">System operations</div>
          <q-space />
          <search-filters
            :request="request"
            search-placeholder="Search by operation id or transaction id"
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
import operationsSearchSchema from '@koiner/chain/operation/search/operations-search.schema.json';
import operationsSearchUiSchema from '@koiner/chain/operation/search/view/operations-table.ui-schema.json';

export default defineComponent({
  name: 'OperationsIndexPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.operations.position = newScrollPosition;
    };

    return {
      onScroll,
      schema: operationsSearchSchema,
      uiSchema: operationsSearchUiSchema,
      request: searchStore.operations.request,
      position: searchStore.operations.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
