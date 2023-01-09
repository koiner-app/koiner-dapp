<template>
  <q-list separator class="mobile-addresses-filter">
    <q-slide-item
      v-for="address in addressesOpts"
      :key="address"
      @right="(opt) => onRight(opt, address)"
      right-color="red"
      @click="toggleAddress(address)"
      :class="isSelected(address) ? 'address-filter-active' : ''"
    >
      <template v-slot:right>
        <q-icon name="fa-solid fa-trash" />
      </template>

      <q-item>
        <q-item-section class="q-py-md">
          <q-item-label class="q-py-xs">{{ address }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle
            v-model="filter"
            :val="address"
            @click="toggleAddress(address)"
            checked-icon="check"
            color="green"
            left-label
            unchecked-icon="clear"
          />
        </q-item-section>
      </q-item>
    </q-slide-item>
  </q-list>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref, watch } from 'vue';
import { useBookmarkStore } from '@koiner/bookmarks';
import { useAccountStore } from 'stores/account';

export default defineComponent({
  name: 'MobileAddressesFilter',
  emits: ['change'],

  setup() {
    const accountStore = useAccountStore();
    const bookmarkStore = useBookmarkStore();

    const addresses: Ref<string[]> = ref(
      bookmarkStore.bookmarkKeys('addresses')
    );

    const filter: Ref<string[]> = ref(
      accountStore[accountStore.environment].addressesFilter
    );

    watch(filter, () => {
      accountStore.syncAddressFilterSelection(filter.value);
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
        return bookmarkStore.bookmarkKeys('addresses');
      }),

      selectedValues: computed(() => {
        return accountStore[accountStore.environment].addressesFilter;
      }),
      onRight({}, address: string) {
        bookmarkStore.removeBookmark(address, 'addresses');
      },
      isSelected(address: string): boolean {
        return accountStore[accountStore.environment].addressesFilter.includes(
          address
        );
      },
      toggleAddress(address: string) {
        accountStore.toggleAddressFilter(address);
      },
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
