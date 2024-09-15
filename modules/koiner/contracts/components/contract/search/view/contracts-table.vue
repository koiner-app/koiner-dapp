<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>
    <q-space />
    <search-filters :request="request" search-info="Search by contract id" />
  </div>

  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :request="request"
    :additional-renderers="renderers"
  />
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import schema from '../contracts-search.schema.json';
import mobileUiSchema from './contracts-table.mobile-ui-schema.json';
import desktopUiSchema from './contracts-table.ui-schema.json';
import { QueryContractsArgs } from '@koiner/sdk';

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
    let request: Ref<QueryContractsArgs> = ref({});

    return {
      schema,
      uiSchema: props.mobile ? mobileUiSchema : desktopUiSchema,
      request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
