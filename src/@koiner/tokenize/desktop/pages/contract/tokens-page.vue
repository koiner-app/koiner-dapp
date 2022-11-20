<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <token-contracts-table title="Tokens" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import tokenContractsSearchSchema from '../../../components/contract/search/token-contracts-search.schema.json';
import tokenContractsSearchUiSchema from '../../../components/contract/search/view/token-contracts-table.ui-schema.json';
import TokenContractsTable from '../../../components/contract/search/view/token-contracts-table.vue';

export default defineComponent({
  name: 'TokenContractsIndexPage',
  components: { TokenContractsTable },

  setup() {
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.tokenContracts.position = newScrollPosition;
    };

    return {
      onScroll,
      schema: tokenContractsSearchSchema,
      uiSchema: tokenContractsSearchUiSchema,
      request: searchStore.tokenContracts.request,
      position: searchStore.tokenContracts.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
