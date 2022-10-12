<template>
  <div class="row no-wrap items-center" v-if="showFilters || title">
    <div v-if="title" class="text-h6">{{ title }}</div>
    <q-space />
    <search-filters
      v-if="showFilters"
      :request="request"
      search-placeholder="Search by Address Id"
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
import { defineComponent, watch } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import addressesSearchSchema from '@koiner/chain/components/address/search/addresses-search.schema.json';
import addressesSearchUiSchema from '@koiner/chain/components/address/search/view/addresses-table.ui-schema.json';

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
  },

  setup(props) {
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.addresses.position = newScrollPosition;
    };

    const updateFilters = () => {
      if (props.search) {
        if (!searchStore.addresses.request.filter) {
          searchStore.addresses.request.filter = {};
        }

        searchStore.addresses.request.filter.search = {
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
      onScroll,
      schema: addressesSearchSchema,
      uiSchema: addressesSearchUiSchema,
      request: searchStore.addresses.request,
      position: searchStore.addresses.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
