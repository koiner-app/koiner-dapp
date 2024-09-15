<template>
  <div class="row no-wrap items-center" v-if="showFilters || title">
    <div v-if="title" class="text-h6">{{ title }}</div>

    <q-space />

    <search-filters
      v-if="showFilters"
      :request="request"
      search-info="Search by Address Id"
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
import { defineComponent, ref, Ref, watch } from 'vue';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import addressesSearchSchema from '@koiner/chain/address/search/addresses-search.schema.json';
import mobileUiSchema from './addresses-table.mobile-ui-schema.json';
import desktopUiSchema from './addresses-table.ui-schema.json';
import { QueryAddressesArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'AddressesTable',
  components: { SearchFilters, QJsonSearch },
  props: {
    title: {
      required: false,
      type: String,
    },
    showFilters: {
      required: false,
      type: Boolean,
      default: true,
    },
    search: {
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
    let request: Ref<QueryAddressesArgs> = ref({});

    const updateFilters = () => {
      if (props.search) {
        if (!request.value.filter) {
          request.value.filter = {};
        }

        request.value.filter.search = {
          contains: props.search,
        };
      }
    };

    watch(
      props,
      () => {
        updateFilters();
      },
      { deep: true }
    );

    return {
      schema: addressesSearchSchema,
      uiSchema: props.mobile ? mobileUiSchema : desktopUiSchema,
      request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
