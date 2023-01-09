<template>
  <q-layout view="hHh LpR lFf" class="layout--mobile">
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
        <search-dialog :mobile="true" />
      </q-toolbar>
    </q-header>

    <q-drawer :width="200" v-model="drawer" bordered>
      <q-scroll-area class="fit">
        <mobile-drawer-navigation />
      </q-scroll-area>
    </q-drawer>

    <q-page-container :class="`page--${route.name.replace('.', '-')}`">
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <mobile-main-navigation />
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import KoinerLogo from 'src/components/koiner-logo.vue';
import SearchDialog from '@koiner/components/search/search-dialog.vue';
import { useAccountStore } from 'stores/account';
import { useKoinosStore } from 'stores/koinos';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import { useBookmarkStore } from '@koiner/bookmarks';
import ApiSwitcher from '@koiner/components/api-switcher.vue';
import MobileMainNavigation from '../components/mobile-main-navigation.vue';
import MobileDrawerNavigation from '../components/mobile-drawer-navigation.vue';
import { useWindowSize } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',
  components: {
    MobileDrawerNavigation,
    MobileMainNavigation,
    ApiSwitcher,
    SearchDialog,
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

    const redirect = () => {
      const desktopRedirects: { [key: string]: string } = {
        'mobile.ecosystem': 'ecosystem',
        'mobile.account': 'account.portfolio',
        'mobile.network': 'network',
      };

      if (route.name && desktopRedirects[route.name.toString()]) {
        router.push({ name: desktopRedirects[route.name.toString()] });
      } else {
        router.push({ name: 'home' });
      }
    };

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
        if (width.value >= 1024) {
          redirect();
        }
      },
      { deep: true }
    );

    onMounted(() => {
      if (width.value >= 1024) {
        redirect();
      }
    });

    return {
      drawer: ref(false),
      route,
    };
  },
});
</script>
