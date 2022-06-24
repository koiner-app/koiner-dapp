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
          <div class="text-h6">Blocks</div>
          <q-space />
        </div>

        <blocks-search-view
          @on-scroll="onScroll"
          :scroll-position="searchStore.blocks.position"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BlocksSearchView from '@koiner/chain/block/search/blocks-search-view.vue';
import { useSearchStore } from 'stores/search';

export default defineComponent({
  name: 'BlocksIndexPage',
  components: { BlocksSearchView },

  setup() {
    const searchStore = useSearchStore();

    const onScroll = (newScrollPosition: number) => {
      searchStore.blocks.position = newScrollPosition;
    };

    return {
      onScroll,
      searchStore,
    };
  },
});
</script>
