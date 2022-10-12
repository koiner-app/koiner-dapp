<template>
  <q-option-group
    v-model="addressFilter"
    type="checkbox"
    :options="addressesOpts"
  >
    <template v-slot:label="opt">
      <bookmark-component
        :item="{ id: opt.value, type: 'address' }"
        list-id="addresses"
        item-translation="koiner.chain.item.address"
      />
    </template>
  </q-option-group>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref, watch } from 'vue';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';
import { useBookmarkStore } from '@koiner/bookmarks';

export default defineComponent({
  name: 'AccountAddressesFilter',
  components: { BookmarkComponent },
  emits: ['change'],

  setup(props, { emit }) {
    const bookmarkStore = useBookmarkStore();
    const addressFilter: Ref<string[]> = ref([]);

    const addresses = computed(() => {
      return bookmarkStore.bookmarkKeys('addresses');
    });

    onMounted(() => {
      addressFilter.value = addresses.value;
      emit('change', addressFilter.value);
    });

    watch(addressFilter, (newAddressFilter) => {
      emit('change', newAddressFilter);
    });

    return {
      addressFilter,
      addresses,
      addressesOpts: computed(() => {
        return addresses.value.map((address) => {
          return {
            value: address,
            label: address,
            icon: 'restaurant_menu',
          };
        });
      }),
    };
  },
});
</script>
