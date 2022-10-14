<template>
  <q-card-section v-if="blocksSearch.connection.value?.edges?.length > 0">
    <span class="text-caption">
      Blocks [{{ blocksSearch.connection.value?.edges?.length }}]
    </span>

    <q-list>
      <q-item
        clickable
        v-ripple
        v-for="edge in blocksSearch.connection.value.edges"
        :key="edge.cursor"
        :to="{ name: 'block', params: { height: edge.node.header.height } }"
      >
        <q-item-section>
          <q-item-label class="text-white">
            {{ edge.node.header.height }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption>
            <bookmark-component
              :item="{
                id: edge.node.id,
                height: edge.node.header.height,
                type: 'block',
              }"
              list-id="main"
              item-translation="koiner.chain.item.block"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { SearchRequestType, useSearchManager } from '@appvise/search-manager';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';

export default defineComponent({
  name: 'BlocksSearch',
  components: { BookmarkComponent },
  props: {
    search: {
      required: true,
      type: String,
    },
  },

  setup(props) {
    const blocksSearch = useSearchManager('blocksGlobal');

    watch(
      props,
      async () => {
        if (props.search !== '') {
          const request: SearchRequestType = {
            first: 10,
            filter: {},
          };

          if (props.search.length === 70) {
            request.filter = {
              id: {
                equals: props.search,
              },
            };

            await blocksSearch.search(request);
          } else if (
            props.search.length < 70 &&
            !Number.isNaN(Number(props.search))
          ) {
            request.filter = {
              height: {
                equals: parseInt(props.search),
              },
            };

            await blocksSearch.search(request);
          }
        } else {
          blocksSearch.reset();
        }
      },
      { deep: true }
    );

    return {
      blocksSearch,
    };
  },
});
</script>
