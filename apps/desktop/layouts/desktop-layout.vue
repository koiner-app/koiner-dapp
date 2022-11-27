<template>
  <q-layout view="hHh LpR lFf" class="layout--desktop">
    <q-header elevated>
      <q-toolbar>
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

    <q-drawer show-if-above :mini="true" :width="200" bordered>
      <q-scroll-area class="fit">
        <main-navigation />
      </q-scroll-area>
    </q-drawer>

    <q-page-container :class="`page--${route.name}`">
      <router-view />
    </q-page-container>

    <q-footer reveal elevated>
      <q-toolbar>
        <ticker />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import KoinerLogo from 'src/components/koiner-logo.vue';
import MainNavigation from '../components/main-navigation.vue';
import Ticker from '../components/ticker-component.vue';
import SearchDialog from '@koiner/components/search/search-dialog.vue';
import { useAccountStore } from 'stores/account';
import { useKoinosStore } from 'stores/koinos';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import { useBookmarkStore } from '@koiner/bookmarks';
import ApiSwitcher from '@koiner/components/api-switcher.vue';
import { useWindowSize } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',
  components: {
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
    const { width } = useWindowSize();
    const router = useRouter();
    const route = useRoute();

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

    watch(
      width,
      () => {
        if (width.value < 1024) {
          router.push({ name: 'mobile.home' });
        }
      },
      { deep: true }
    );

    onMounted(() => {
      if (width.value < 1024) {
        router.push({ name: 'mobile.home' });
      }
    });

    return {
      drawer: ref(false),
      route,
    };
  },
});
</script>
