<template>
  <q-card-section v-if="contractsSearch.connection.value?.edges?.length > 0">
    <span class="text-caption">
      Contracts [{{ contractsSearch.connection.value?.edges?.length }}]
    </span>

    <q-list>
      <q-item
        clickable
        v-ripple
        v-for="edge in contractsSearch.connection.value.edges"
        :key="edge.cursor"
        @click.prevent="
          router.push({ name: 'contract', params: { id: edge.node.id } })
        "
      >
        <q-item-section>
          <q-item-label
            >{{ edge.node.id
            }}<q-chip dense square size="md" color="white" class="q-ml-sm">{{
              edge.node.contractStandardType
            }}</q-chip></q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-item-label caption
            ><bookmark-component
              :item="{ id: edge.node.id, type: 'contract' }"
              list-id="main"
              item-translation="koiner.contracts.item.contract"
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
  name: 'ContractsSearch',
  components: { BookmarkComponent },
  props: {
    search: {
      required: true,
      type: String,
    },
    mobile: {
      required: false,
      type: Boolean,
    }
  },

  setup(props) {
    const contractsSearch = useSearchManager('contracts');
    const router = useRouter();

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

          await contractsSearch.search(request);
        } else {
          contractsSearch.reset();
        }
      },
      { deep: true }
    );

    return {
      contractsSearch,
      router,
    };
  },
});
</script>
