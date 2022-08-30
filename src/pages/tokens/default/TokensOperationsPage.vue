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
          <div class="text-h6">Operations</div>
          <q-space />
        </div>

        <search-filters
          :request="request"
          search-placeholder="Search for from/to addresses, operation name/id, contract id or transaction id"
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
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import operationsSearchSchema from '@koiner/contract/token/search/token-operations-search.schema.json';
import operationsSearchUiSchema from '@koiner/contract/token/search/view/token-operations-table.ui-schema.json';
import { useSearchStore } from 'stores/search';

export default defineComponent({
  name: 'TokenOperationsPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.tokenOperations.position = newScrollPosition;
    };

    return {
      onScroll,
      schema: operationsSearchSchema,
      uiSchema: operationsSearchUiSchema,
      request: searchStore.tokenOperations.request,
      position: searchStore.tokenOperations.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
