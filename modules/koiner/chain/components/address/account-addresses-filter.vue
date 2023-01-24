<template>
  <q-option-group
    v-model="filter"
    type="checkbox"
    :options="addressesOpts"
    class="delete-on-hover"
  >
    <template v-slot:label="opt">
      {{ opt.value }}
      <bookmark-component
        :item="{ id: opt.value, type: 'address' }"
        list-id="addresses"
        item-translation="koiner.chain.item.address"
        icon-delete="close"
        :show-delete-on-hover="true"
      />
    </template>
  </q-option-group>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref, watch } from 'vue';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';
import { useBookmarkStore } from '@koiner/bookmarks';
import { useAccountStore } from 'stores/account';
import { useBlockProductionStore } from 'stores/block-production';

export default defineComponent({
  name: 'AccountAddressesFilter',
  components: { BookmarkComponent },
  emits: ['change'],

  setup() {
    const accountStore = useAccountStore();
    const blockProductionStore = useBlockProductionStore();
    const bookmarkStore = useBookmarkStore();

    const addresses: Ref<string[]> = ref(
      bookmarkStore.bookmarkKeys('addresses')
    );

    const filter: Ref<string[]> = ref(
      accountStore[accountStore.environment].addressesFilter
    );

    watch(filter, () => {
      accountStore.syncAddressFilterSelection(filter.value);
      blockProductionStore.syncAddressFilterSelection(filter.value);
    });

    watch(
      accountStore,
      () => {
        filter.value = accountStore[accountStore.environment].addressesFilter;
      },
      { deep: true }
    );

    return {
      accountStore,
      bookmarkStore,
      filter,
      addresses,
      addressesOpts: computed(() => {
        return bookmarkStore.bookmarkKeys('addresses').map((address) => {
          return {
            value: address,
            label: address,
            icon: 'toll',
            // Always keep 1 address selected
            disable:
              accountStore.addressesFilter.length === 1 &&
              accountStore.addressesFilter[0] === address,
          };
        });
      }),
    };
  },
});
</script>

<style lang="scss">
.delete-on-hover .q-checkbox {
  width: 100%;

  .delete-icon {
    display: none;
  }

  .favorite-icon {
    position: absolute;
    right: 2rem;
  }

  &:hover {
    .delete-icon {
      display: block;
      cursor: pointer !important;
    }
  }
}
</style>
