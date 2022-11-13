<template>
  <div class="row no-wrap items-center">
    <search-filters
      :request="request"
      search-placeholder="Search by block id or signer"
    />
  </div>

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :data="{}"
    :additional-renderers="renderers"
    class="dashboard-home-search"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import blocksSearchSchema from '@koiner/chain/components/block/search/blocks-search.schema.json';
import blocksHomeSearchUiSchema from '@koiner/chain/components/block/search/view/blocks-home-table.ui-schema.json';
import { useSearchStore } from 'stores/search';

export default defineComponent({
  name: 'BlocksComponent',
  components: { SearchFilters, QJsonSearch },

  setup() {
    const searchStore = useSearchStore();

    return {
      schema: blocksSearchSchema,
      uiSchema: blocksHomeSearchUiSchema,
      request: searchStore.blocks.request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
