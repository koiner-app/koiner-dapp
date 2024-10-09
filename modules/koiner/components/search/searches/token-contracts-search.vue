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
        @click.prevent="
          router.push({
            name: mobile ? 'mobile.token' : 'token',
            params: { id: edge.node.id },
          })
        "
      >
        <q-item-section>
          <q-item-label
            >{{ edge.node.name
            }}<q-chip dense square size="sm" class="q-ml-sm">{{
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
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TokenContractsSearch',
  components: { BookmarkComponent },
  props: {
    search: {
      required: true,
      type: String,
    },
    mobile: {
      required: false,
      type: Boolean,
    },
  },

  setup(props) {
    const tokenContractsSearch = useSearchManager('tokenContracts');
    const router = useRouter();

    watch(
      props,
      async () => {
        if (props.search !== '' && props.search.length > 1) {
          const request: SearchRequestType = {
            first: 10,
            filter: {
              search: {
                iContains: props.search,
              },
              id: {
                excludes: '1Gov26MjgHcRP95p8WaqVNBRLVmZSThkxP', // VHP Governance contract
              },
              name: {
                excludes: 'LIQUIDITY POOL',
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
      router,
    };
  },
});
</script>
