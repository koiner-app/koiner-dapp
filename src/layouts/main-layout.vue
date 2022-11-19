<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          @click="drawer = !drawer"
          flat
          round
          dense
          icon="menu"
          class="lt-md q-mr-sm"
        />
        <q-separator dark vertical inset class="lt-md" />
        <q-toolbar-title>
          <koiner-logo />
          <q-chip size="xs" color="primary" text-color="white" class="beta-chip"
            >Beta</q-chip
          >
        </q-toolbar-title>

        <api-switcher />
        <search-dialog />

        <q-btn
          class="show-love-button"
          target="_blank"
          flat
          dense
          size="md"
          color="accent"
          href="https://twitter.com/intent/tweet?url=https://koiner.app&text=Checkout%20the%20koiner%20dashboard%20making%20the%20koinos%20blockchain%20data%20more%20accessible%20%F0%9F%94%AE"
          ><q-icon name="favorite_border"
        /></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      :mini="true"
      v-model="drawer"
      :breakpoint="1029"
      :width="200"
      bordered
    >
      <q-scroll-area class="fit">
        <main-navigation />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated>
      <mobile-main-navigation class="lt-lg" />

      <q-toolbar class="gt-md">
        <ticker />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import KoinerLogo from 'components/koiner-logo.vue';
import MainNavigation from 'components/main-navigation.vue';
import Ticker from 'components/ticker-component.vue';
import SearchDialog from '@koiner/components/search/search-dialog.vue';
import { useAccountStore } from 'stores/account';
import { useKoinosStore } from 'stores/koinos';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import { useBookmarkStore } from '@koiner/bookmarks';
import ApiSwitcher from '@koiner/components/api-switcher.vue';
import MobileMainNavigation from 'components/mobile-main-navigation.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    MobileMainNavigation,
    ApiSwitcher,
    SearchDialog,
    MainNavigation,
    Ticker,
    KoinerLogo,
  },
  setup() {
    const accountStore = useAccountStore();
    const koinosStore = useKoinosStore();
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const bookmarkStore = useBookmarkStore();

    koinosStore.load();
    statsStore.load();
    accountStore.load(koinerStore.environment);
    bookmarkStore.load(koinerStore.environment);

    watch(
      bookmarkStore,
      () => {
        accountStore.syncAddressFilter(bookmarkStore.bookmarkKeys('addresses'));
      },
      { deep: true }
    );

    return {
      drawer: ref(false),
    };
  },
});
</script>
