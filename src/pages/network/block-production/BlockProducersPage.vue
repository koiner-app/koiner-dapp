<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Block Producers</div>
          <q-space />
          <search-filters
            :request="request"
            search-placeholder="Search by address id"
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
import tokenHoldersSearchSchema from '@koiner/tokenize/holder/search/token-holders-search.schema.json';
import tokenHoldersSearchUiSchema from '@koiner/tokenize/holder/search/view/token-holders-table.ui-schema.json';
import { QueryTokenHoldersArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'BlockProducersPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    let request: Ref<QueryTokenHoldersArgs> = ref({ filter: {} });
    let id: Ref<string | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id.toString();
      request.value.filter = {
        contractId: { equals: id.value },
      };
    });

    return {
      schema: tokenHoldersSearchSchema,
      uiSchema: tokenHoldersSearchUiSchema,
      request: request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
