<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Addresses</div>
          <q-space />
          <search-filters
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
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import addressesSearchSchema from '@koiner/chain/components/address/search/addresses-search.schema.json';
import addressesSearchUiSchema from '@koiner/chain/components/address/search/view/addresses-table.ui-schema.json';

export default defineComponent({
  name: 'AddressesIndexPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.addresses.position = newScrollPosition;
    };

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
