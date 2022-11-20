<template>
  <q-card-section v-if="transactionsSearch.connection.value?.edges?.length > 0">
    <span class="text-caption">
      Transactions [{{ transactionsSearch.connection.value?.edges?.length }}]
    </span>

    <q-list>
      <q-item
        clickable
        v-ripple
        v-for="edge in transactionsSearch.connection.value.edges"
        :key="edge.cursor"
        @click.prevent="
          router.push({ name: 'transaction', params: { id: edge.node.id } })
        "
      >
        <q-item-section>
          <q-item-label class="text-white">
            {{ edge.node.id }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption>
            <bookmark-component
              :item="{
                id: edge.node.id,
                height: edge.node.id,
                type: 'transaction',
              }"
              list-id="main"
              item-translation="koiner.chain.item.transaction"
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
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TransactionsSearch',
  components: { BookmarkComponent },
  props: {
    search: {
      required: true,
      type: String,
    },
  },

  setup(props) {
    const transactionsSearch = useSearchManager('transactions');
    const router = useRouter();

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

            await transactionsSearch.search(request);
          }
        } else {
          transactionsSearch.reset();
        }
      },
      { deep: true }
    );

    return {
      transactionsSearch,
      router,
    };
  },
});
</script>
