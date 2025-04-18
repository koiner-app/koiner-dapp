<template>
  <q-btn
    color="primary"
    size="sm"
    icon="search"
    @click="dialog = true"
    class="btn-search-dialog q-px-sm q-mx-sm"
  >
    <span class="gt-sm">Search</span>
  </q-btn>

  <q-dialog
    v-model="dialog"
    transition-show="fade-in"
    transition-hide="fade-out"
  >
    <q-card
      class="bg-primary text-white search-dialog-results"
      style="width: 700px; max-width: 80vw; max-height: 80vh"
    >
      <q-bar>
        <span class="text-caption">Search anything</span>

        <q-space />
        <span
          class="text-caption q-pr-md text-italic desktop-only gt-sm"
          style="opacity: 0.7"
          >Double tap ctrl to open this dialog next time</span
        >

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pt-lg">
        <q-input dark dense standout v-model="search" autofocus>
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

      <addresses-name-search :search="trimmedSearch" :mobile="mobile" />
      <pages-search :search="trimmedSearch" :mobile="mobile" />
      <token-contracts-search :search="trimmedSearch" :mobile="mobile" />
      <projects-search :search="trimmedSearch" />
      <addresses-search :search="trimmedSearch" :mobile="mobile" />
      <contracts-name-search :search="trimmedSearch" :mobile="mobile" />
      <contracts-search :search="trimmedSearch" :mobile="mobile" />
      <blocks-search :search="trimmedSearch" :mobile="mobile" />
      <transactions-search :search="trimmedSearch" :mobile="mobile" />
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch, watchEffect } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import AddressesSearch from './searches/addresses-search.vue';
import TokenContractsSearch from './searches/token-contracts-search.vue';
import ContractsSearch from '@koiner/components/search/searches/contracts-search.vue';
import BlocksSearch from '@koiner/components/search/searches/blocks-search.vue';
import TransactionsSearch from '@koiner/components/search/searches/transactions-search.vue';
import PagesSearch from '@koiner/components/search/searches/pages-search.vue';
import posthog from 'posthog-js';
import ProjectsSearch from '@koiner/components/search/searches/projects-search.vue';
import ContractsNameSearch from '@koiner/components/search/searches/contracts-name-search.vue';
import AddressesNameSearch from '@koiner/components/search/searches/addresses-name-search.vue';

export default defineComponent({
  name: 'SearchDialog',
  components: {
    AddressesNameSearch,
    ContractsNameSearch,
    ProjectsSearch,
    AddressesSearch,
    BlocksSearch,
    ContractsSearch,
    PagesSearch,
    TokenContractsSearch,
    TransactionsSearch,
  },
  props: {
    openDialog: {
      required: false,
      type: Boolean,
    },
    mobile: {
      required: false,
      type: Boolean,
    },
  },
  emits: ['closed'],

  setup(props, { emit }) {
    const { Control } = useMagicKeys();
    const dialog = ref(false);
    const search = ref('');

    let lastPressedControl: number | undefined;

    watchEffect(() => {
      if (!dialog.value && Control.value) {
        if (lastPressedControl && Date.now() - lastPressedControl < 250) {
          posthog.capture('hotkey', { property: 'searchDialog' });

          dialog.value = true;
          lastPressedControl = undefined;
        } else {
          lastPressedControl = Date.now();
        }
      }
    });

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
        emit('closed');
      }
    });

    return {
      dialog,
      search,
      trimmedSearch: computed(() => {
        posthog.capture('searched', { property: search.value.trim() });

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
