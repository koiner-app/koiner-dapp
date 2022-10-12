<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Operations</div>
          <q-space />
          <search-filters
            :request="request"
            search-placeholder="Search by operation id"
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
import operationsSearchSchema from '@koiner/chain/components/operation/search/operations-search.schema.json';
import operationsSearchUiSchema from '@koiner/chain/components/operation/search/view/operations-table.ui-schema.json';
import { QueryOperationsArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'TransactionOperationsPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    let request: Ref<QueryOperationsArgs> = ref({ filter: {} });
    let id: Ref<string | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id.toString();
      request.value.filter = {
        transactionId: { equals: id.value },
      };
    });

    return {
      schema: operationsSearchSchema,
      uiSchema: operationsSearchUiSchema,
      request: request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
