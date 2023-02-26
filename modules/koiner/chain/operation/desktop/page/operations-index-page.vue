<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card">
      <q-card-section>
        <operations-table title="System operations" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import schema from '@koiner/chain/operation/search/operations-search.schema.json';
import uiSchema from '@koiner/chain/operation/search/view/operations-table.ui-schema.json';
import OperationsTable from '@koiner/chain/operation/search/view/operations-table.vue';

export default defineComponent({
  name: 'OperationsIndexPage',
  components: { OperationsTable },

  setup() {
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.operations.position = newScrollPosition;
    };

    return {
      onScroll,
      schema,
      uiSchema,
      request: searchStore.operations.request,
      position: searchStore.operations.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
