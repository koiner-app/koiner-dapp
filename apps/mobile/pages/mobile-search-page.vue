<template>
  <q-header reveal elevated>
    <q-toolbar>
      <q-toolbar-title>
        <span class="page-title"> Search </span>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>

  <q-page class="row items-start">
    <q-card style="width: 100%; min-height: 100vh">
      <q-card-section class="q-pt-lg">
        <q-input dense standout autofocus v-model="search">
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

      <mobile-pages-search :search="trimmedSearch" :mobile="true" />
      <token-contracts-search :search="trimmedSearch" :mobile="true" />
      <contracts-name-search :search="trimmedSearch" :mobile="true" />
      <addresses-search :search="trimmedSearch" :mobile="true" />
      <contracts-search :search="trimmedSearch" :mobile="true" />
      <blocks-search :search="trimmedSearch" :mobile="true" />
      <transactions-search :search="trimmedSearch" :mobile="true" />
      <projects-mobile-search :search="trimmedSearch" />
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, watchEffect } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import AddressesSearch from '@koiner/components/search/searches/addresses-search.vue';
import posthog from 'posthog-js';
import ProjectsMobileSearch from '@koiner/components/search/searches/mobile/projects-mobile-search.vue';
import BlocksSearch from '@koiner/components/search/searches/blocks-search.vue';
import TransactionsSearch from '@koiner/components/search/searches/transactions-search.vue';
import MobilePagesSearch from '@koiner/components/search/searches/mobile/mobile-pages-search.vue';
import TokenContractsSearch from '@koiner/components/search/searches/token-contracts-search.vue';
import ContractsNameSearch from '@koiner/components/search/searches/contracts-name-search.vue';
import ContractsSearch from '@koiner/components/search/searches/contracts-search.vue';

export default defineComponent({
  name: 'MobileSearchPage',
  components: {
    ContractsSearch,
    ContractsNameSearch,
    TokenContractsSearch,
    MobilePagesSearch,
    TransactionsSearch,
    BlocksSearch,
    ProjectsMobileSearch,
    AddressesSearch,
  },
  props: {
    openDialog: {
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
