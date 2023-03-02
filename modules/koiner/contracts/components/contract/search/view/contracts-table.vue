<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import schema from '../contracts-search.schema.json';
import mobileUiSchema from './contracts-table.mobile-ui-schema.json';
import desktopUiSchema from './contracts-table.ui-schema.json';

export default defineComponent({
  name: 'ContractsTable',
  components: { SearchFilters, QJsonSearch },
  props: {
    title: {
      required: false,
      type: String,
    },
    mobile: {
      required: false,
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.contracts.position = newScrollPosition;
    };

    return {
      onScroll,
      schema,
      uiSchema: props.mobile ? mobileUiSchema : desktopUiSchema,
      request: searchStore.contracts.request,
      position: searchStore.contracts.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
