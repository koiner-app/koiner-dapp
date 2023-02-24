<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <blocks-table title="Blocks" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSearchStore } from 'stores/search';
import { KoinerRenderers } from '@koiner/renderers';
import schema from '../../search/blocks-search.schema.json';
import uiSchema from '../../search/view/blocks-table.ui-schema.json';
import BlocksTable from '@koiner/chain/block/search/view/blocks-table.vue';

export default defineComponent({
  name: 'BlocksIndexPage',
  components: { BlocksTable },

  setup() {
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.blocks.position = newScrollPosition;
    };

    return {
      onScroll,
      schema,
      uiSchema,
      request: searchStore.blocks.request,
      position: searchStore.blocks.position,
      renderers: KoinerRenderers,
    };
  },
});
</script>
