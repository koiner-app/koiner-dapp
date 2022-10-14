<template>
  <q-card-section v-if="addressesSearch.connection.value?.edges?.length > 0">
    <span class="text-caption">
      Addresses [{{ addressesSearch.connection.value?.edges?.length }}]
    </span>

    <q-list>
      <q-item
        clickable
        v-ripple
        v-for="edge in addressesSearch.connection.value.edges"
        :key="edge.cursor"
        :to="{ name: 'address', params: { id: edge.node.id } }"
      >
        <q-item-section>
          <q-item-label class="text-white">
            {{ edge.node.id }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label caption>
            <bookmark-component
              :item="{ id: edge.node.id, type: 'address' }"
              list-id="addresses"
              item-translation="koiner.chain.item.address"
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
  name: 'AddressesSearch',
  components: { BookmarkComponent },
  props: {
    search: {
      required: true,
      type: String,
    },
  },

  setup(props) {
    const addressesSearch = useSearchManager('addresses');

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
          };

          await addressesSearch.search(request);
        } else {
          addressesSearch.reset();
        }
      },
      { deep: true }
    );

    return {
      addressesSearch,
    };
  },
});
</script>
