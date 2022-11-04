<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <koiner-logo />
        </q-toolbar-title>

        <api-switcher />
        <search-dialog />

        <q-btn flat dense size="md" color="accent"
          ><q-icon name="favorite_border"
        /></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above :mini="true" :width="200" bordered>
      <q-scroll-area class="fit">
        <main-navigation />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
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
import { defineComponent, ref } from 'vue';
import KoinerLogo from 'components/koiner-logo.vue';
import MainNavigation from 'components/main-navigation.vue';
import Ticker from 'components/ticker-component.vue';
import SearchDialog from '@koiner/components/search/search-dialog.vue';
import { useKoinosStore } from 'stores/koinos';
import { useStatsStore } from 'stores/stats';
import ApiSwitcher from '@koiner/components/search/api-switcher.vue';

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
    const koinosStore = useKoinosStore();
    const statsStore = useStatsStore();
    const leftDrawerOpen = ref(false);

    koinosStore.load();
    statsStore.load();

    return {
      leftDrawerOpen,
    };
  },
});
</script>
