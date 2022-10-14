<template>
  <q-card-section
    v-if="tokenContractsSearch.connection.value?.edges?.length > 0"
  >
    <span class="text-caption">
      Tokens [{{ tokenContractsSearch.connection.value?.edges?.length }}]
    </span>

    <q-list>
      <q-item
        clickable
        v-ripple
        v-for="edge in tokenContractsSearch.connection.value.edges"
        :key="edge.cursor"
        :to="{ name: 'token', params: { id: edge.node.id } }"
      >
        <q-item-section>
          <q-item-label class="text-white"
            >{{ edge.node.name
            }}<q-chip dense square size="sm" color="white" class="q-ml-sm">{{
              edge.node.symbol
            }}</q-chip></q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-item-label caption
            ><bookmark-component
              :item="{ id: edge.node.id, type: 'token' }"
              list-id="tokens"
              item-translation="koiner.tokenize.item.token"
          /></q-item-label>
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
  name: 'TokenContractsSearch',
  components: { BookmarkComponent },
  props: {
    search: {
      required: true,
      type: String,
    },
  },

  setup(props) {
    const tokenContractsSearch = useSearchManager('tokenContracts');

    watch(
      props,
      async () => {
        if (props.search !== '' && props.search.length > 2) {
          const request: SearchRequestType = {
            first: 10,
            filter: {
              search: {
                iContains: props.search,
              },
            },
            sort: [],
          };

          await tokenContractsSearch.search(request);
        } else {
          tokenContractsSearch.reset();
        }
      },
      { deep: true }
    );

    return {
      tokenContractsSearch,
    };
  },
});
</script>
