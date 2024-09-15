<template>
  <div class="row no-wrap items-center">
    <div v-if="title" class="text-h6">{{ title }}</div>

    <q-space />

    <search-filters
      :request="request"
      search-info="Search by block id or signer"
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
import blocksSearchSchema from '../blocks-search.schema.json';
import mobileUiSchema from './blocks-table.mobile-ui-schema.json';
import desktopUiSchema from './blocks-table.ui-schema.json';
import { QueryBlocksArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'BlocksTable',
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
    let request: Ref<QueryBlocksArgs> = ref({});

    return {
      schema: blocksSearchSchema,
      uiSchema: props.mobile ? mobileUiSchema : desktopUiSchema,
      request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
