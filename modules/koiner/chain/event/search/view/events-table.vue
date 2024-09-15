<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>

    <q-space />

    <search-filters
      :request="request"
      search-info="Search block id, transaction id, contract id, name or impacted addresses"
    />
  </div>

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :additional-renderers="renderers"
  />
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import schema from '../events-search.schema.json';
import mobileUiSchema from './events-table.mobile-ui-schema.json';
import desktopUiSchema from './events-table.ui-schema.json';
import { QueryEventsArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'EventsTable',
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
    let request: Ref<QueryEventsArgs> = ref({});

    return {
      schema,
      uiSchema: props.mobile ? mobileUiSchema : desktopUiSchema,
      request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
