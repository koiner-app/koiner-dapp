<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Operations</div>
          <q-space />
          <search-filters
            :request="request"
            search-placeholder="Search by from/to addresses, operation name/id or transaction id"
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
import tokenOperationsSearchSchema from '@koiner/tokenize/operation/search/token-operations-search.schema.json';
import tokenOperationsSearchUiSchema from '@koiner/tokenize/operation/search/view/token-operations-table.ui-schema.json';
import { QueryTokenOperationsArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'TokenOperationsPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    let request: Ref<QueryTokenOperationsArgs> = ref({ filter: {} });
    let id: Ref<string | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id.toString();
      request.value.filter = {
        contractId: { equals: id.value },
      };
    });

    return {
      schema: tokenOperationsSearchSchema,
      uiSchema: tokenOperationsSearchUiSchema,
      request: request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
