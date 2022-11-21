<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>

    <q-space />

    <search-filters
      class="token-contracts-filters"
      :request="request"
      search-info="Search token name, symbol or contract id"
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import tokenContractsSearchSchema from '../token-contracts-search.schema.json';
import tokenContractsSearchUiSchema from './token-contracts-table.ui-schema.json';

export default defineComponent({
  name: 'TokenContractsTable',
  components: { SearchFilters, QJsonSearch },
  props: {
    title: {
      required: false,
      type: String,
    },
  },

  setup() {
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.tokenContracts.position = newScrollPosition;
    };

    return {
      onScroll,
      schema: tokenContractsSearchSchema,
      uiSchema: tokenContractsSearchUiSchema,
      request: searchStore.tokenContracts.request,
      position: searchStore.tokenContracts.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>

<style lang="scss">
.token-contracts-filters .wildcard-search.q-field--highlighted {
  width: 400px !important;
}
</style>
