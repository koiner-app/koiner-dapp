<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>

    <q-space />

    <search-filters
      :request="request"
      search-info="Search by address id"
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
import schema from '../token-holders-search.schema.json';
import uiSchema from './token-holders-table.ui-schema.json';

export default defineComponent({
  name: 'TokenHoldersTable',
  components: { SearchFilters, QJsonSearch },
  props: {
    title: {
      required: false,
      type: String,
    },
    contractId: {
      required: true,
      type: String,
    },
  },

  setup(props) {
    return {
      schema,
      uiSchema,
      request: {
        filter: {
          contractId: { equals: props.contractId },
        },
      },
      renderers: KoinerRenderers,
    };
  },
});
</script>
