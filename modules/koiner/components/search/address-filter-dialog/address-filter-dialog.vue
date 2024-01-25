<template>
  <q-btn
    size="sm"
    @click="dialog = true"
    class="btn-search-dialog btn-address-filter"
  >
    <q-chip
      v-if="showChip && accountStore.addressesFilter.length > 0"
      size="sm"
      style="margin-right: -0.25rem"
    >
      <span class="stat-footer-stat" style="opacity: 0.5"
        >{{ accountStore.addressesFilter.length }}x
      </span> </q-chip
    ><q-icon name="fa-solid fa-filter" />
  </q-btn>

  <q-dialog
    v-model="dialog"
    transition-show="fade-in"
    transition-hide="fade-out"
    maximized
    full-width
    full-height
  >
    <q-card style="width: 700px; max-width: 80vw; max-height: 80vh">
      <q-bar class="bg-primary text-white">
        <span class="text-caption">Filter addresses</span>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-px-none q-pt-lg">
        <p class="caption text-grey q-px-md">
          Select one or more addresses to display in your portfolio
        </p>

        <q-separator />

        <mobile-addresses-filter v-if="!searchActive" />

        <q-separator v-if="!searchActive" class="q-mb-lg" />

        <q-input
          v-if="searchActive || accountStore.addressesFilter.length === 0"
          dense
          bg-color="primary"
          color="white"
          standout
          v-model="search"
          autofocus
          class="q-mx-md q-mt-md"
          ref="searchInput"
        >
          <template v-slot:prepend>
            <q-icon name="search" size="xs" />
          </template>
          <template v-slot:append>
            <q-icon
              v-if="search !== ''"
              name="clear"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </q-input>
      </q-card-section>

      <address-filter-results
        :search="trimmedSearch"
        :dark="false"
        @selected="
          search = '';
          searchActive = false;
          $refs.searchInput.$el.focus();
        "
      />

      <q-card-actions class="absolute-bottom q-pb-md q-px-md">
        <q-btn label="Close" @click="dialog = false" flat />
        <q-space />
        <q-btn
          v-if="!searchActive"
          label="Add another address"
          @click="searchActive = true"
          flat
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import posthog from 'posthog-js';
import AddressFilterResults from '@koiner/components/search/address-filter-dialog/address-filter-results.vue';
import MobileAddressesFilter from '@koiner/chain/address/mobile-addresses-filter.vue';
import { useAccountStore } from 'stores/account';

export default defineComponent({
  name: 'AddressFilterDialog',
  components: {
    MobileAddressesFilter,
    AddressFilterResults,
  },
  props: {
    openDialog: {
      required: false,
      type: Boolean,
    },
    showChip: {
      required: false,
      type: Boolean,
    },
  },
  emits: ['closed'],

  setup(props, { emit }) {
    const accountStore = useAccountStore();
    const dialog = ref(false);
    const search = ref('');
    const searchActive = ref(false);

    watch(
      props,
      () => {
        if (props.openDialog) {
          dialog.value = true;
        }
      },
      { deep: true }
    );

    watch(dialog, (newValue) => {
      if (!newValue) {
        search.value = '';
        searchActive.value = false;
        emit('closed');
      }
    });

    onMounted(() => {
      if (accountStore.addressesFilter.length === 0) {
        searchActive.value = true;
      }
    });

    watch(
      accountStore,
      () => {
        if (accountStore.addressesFilter.length === 0) {
          searchActive.value = true;
        }
      },
      { deep: true }
    );

    return {
      accountStore,
      dialog,
      search,
      searchActive,
      trimmedSearch: computed(() => {
        posthog.capture('searchedAddressMobile', {
          property: search.value.trim(),
        });

        return search.value.trim();
      }),
    };
  },
});
</script>

<style lang="scss">
.btn-search-dialog {
  .q-icon.on-left {
    margin-right: 0.25rem;
    font-size: 0.75rem;
  }
}

.q-dialog .q-item__section--side .favorite-icon {
  color: yellow !important;
}
.q-dialog {
  .q-card__section > .text-caption {
    padding-bottom: 0.5rem;
    display: inline-block;
  }
  .q-list > .q-item,
  .q-item {
    min-height: 32px;
    padding: 2px 16px;
  }
  .favorite-icon .q-icon {
    padding: 0.25rem 1rem;
  }
}
</style>
