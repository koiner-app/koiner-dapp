<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card
      class="table-card shadow-1"
      style="
        max-width: 1288px;
        margin: 0 auto;
        box-shadow: 0 0 20px rgb(0 0 0 / 8%);
      "
    >
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Tokens</div>
          <q-space />
        </div>

        <search-filters
          :request="request"
          search-placeholder="Search by address id"
        />

        <q-json-search
          :schema="schema"
          :uischema="uiSchema"
          :request="request"
          :data="{}"
          :additional-renderers="renderers"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { KoinerRenderers } from '@koiner/renderers';
import SearchFilters from '@appvise/search-manager/search-filters.vue';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import tokenHoldersSearchSchema from '@koiner/contract/token/search/token-holders-search.schema.json';
import addressTokenHoldersSearchUiSchema from '@koiner/contract/token/search/view/address-tokens-table.ui-schema.json';
import { QueryTokenHoldersArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'TokenHoldersPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    let request: Ref<QueryTokenHoldersArgs> = ref({ filter: {} });
    let id: Ref<string | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id.toString();
      request.value.filter = {
        addressId: { equals: id.value },
      };
    });

    return {
      schema: tokenHoldersSearchSchema,
      uiSchema: addressTokenHoldersSearchUiSchema,
      request: request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
