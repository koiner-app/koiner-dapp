<template>
  <q-card-section v-if="results?.length > 0">
    <span class="text-caption"> Addresses [{{ results.length }}] </span>

    <q-list>
      <q-item
        clickable
        v-ripple
        v-for="edge in results"
        :key="edge.cursor"
        @click="addAddress(edge.node.id)"
      >
        <q-item-section>
          <q-item-label :class="dark ? 'text-white' : ''">
            {{ edge.node.id }}
          </q-item-label>
        </q-item-section>
        <q-item-section side class="help-text">
          <span
            :class="`text-caption ${dark ? 'text-white' : ''}`"
            style="display: none"
            >Add to portfolio</span
          >
        </q-item-section>
      </q-item>
    </q-list>
  </q-card-section>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { SearchRequestType, useSearchManager } from '@appvise/search-manager';
import { useAccountStore } from 'stores/account';
import { useBookmarkStore } from '@koiner/bookmarks';
import posthog from 'posthog-js';

export default defineComponent({
  name: 'AddressFilterResults',
  props: {
    search: {
      required: true,
      type: String,
    },
    dark: {
      required: false,
      type: Boolean,
      default: true,
    },
  },
  emits: ['selected'],

  setup(props, { emit }) {
    const addressesSearch = useSearchManager('addresses');
    const accountStore = useAccountStore();
    const bookmarkStore = useBookmarkStore();

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
      addAddress: (addressId: string) => {
        posthog.capture('addAddress', { property: addressId });

        bookmarkStore.addBookmark(
          { id: addressId, type: 'address' },
          'addresses'
        );

        accountStore.toggleAddressFilter(addressId);

        emit('selected', addressId);
      },
      results: computed(() => {
        return addressesSearch.connection.value?.edges?.filter(
          (edge) => !accountStore.addressesFilter.includes(edge.node.id)
        );
      }),
    };
  },
});
</script>

<style lang="scss">
.q-item:hover {
  .help-text > span {
    display: inline-block !important;
  }
}
</style>
