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
          <div class="text-h6">Transactions</div>
          <q-space />
        </div>

        <search-filters
          :request="request"
          search-placeholder="Search for transaction id or payer"
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
import operationsSearchSchema from '@koiner/chain/operation/search/operations-search.schema.json';
import operationsSearchUiSchema from '@koiner/chain/operation/search/view/operations-table.ui-schema.json';
import { QueryTransactionsArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'BlockTransactionsPage',
  components: { SearchFilters, QJsonSearch },

  setup() {
    let request: Ref<QueryTransactionsArgs> = ref({ filter: {} });
    let height: Ref<number | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      height.value = parseInt(route.params.height.toString());
      request.value.filter = {
        blockHeight: { equals: height.value },
      };
    });

    return {
      schema: operationsSearchSchema,
      uiSchema: operationsSearchUiSchema,
      request: request,
      renderers: KoinerRenderers,
    };
  },
});
</script>
