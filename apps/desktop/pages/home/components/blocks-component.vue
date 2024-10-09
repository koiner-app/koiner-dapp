<template>
  <div class="row no-wrap items-center">
    <q-space />

    <search-filters
      style="opacity: 0; visibility: hidden"
      :request="request"
      search-info="Search by block id or signer"
    />
  </div>

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :data="{}"
    :additional-renderers="renderers"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import schema from '@koiner/chain/block/search/blocks-search.schema.json';
import uiSchema from '@koiner/chain/block/search/view/blocks-home-table.ui-schema.json';
import { useSearchStore } from 'stores/search';

export default defineComponent({
  name: 'BlocksComponent',
  components: { SearchFilters, QJsonSearch },

  setup() {
    const searchStore = useSearchStore();

    return {
      schema,
      uiSchema,
      request: searchStore.blocks.request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
