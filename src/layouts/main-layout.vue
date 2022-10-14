<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <koiner-logo />
        </q-toolbar-title>

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

export default defineComponent({
  name: 'MainLayout',
  components: {
    SearchDialog,
    MainNavigation,
    Ticker,
    KoinerLogo,
  },
  setup() {
    const koinos = useKoinosStore();
    const leftDrawerOpen = ref(false);

    koinos.load();

    return {
      leftDrawerOpen,
    };
  },
});
</script>
