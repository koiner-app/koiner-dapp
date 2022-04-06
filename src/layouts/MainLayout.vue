<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <koiner-logo />
        </q-toolbar-title>
        <user-menu />
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
import KoinerLogo from 'components/KoinerLogo.vue';
import MainNavigation from 'components/MainNavigation.vue';
import Ticker from 'components/TickerComponent.vue';
import UserMenu from 'components/UserMenu.vue';

export default defineComponent({
  name: 'MainLayout',
  components: { UserMenu, MainNavigation, Ticker, KoinerLogo },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
    };
  },
});
</script>
