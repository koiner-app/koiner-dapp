<template>
  <q-layout view="hHh LpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <koiner-logo />
          <history-navigator />
        </q-toolbar-title>

        <global-search />

        <global-actions-menu />

        <q-btn
          v-if="account.connected"
          flat
          dense
          size="md"
          :to="`/addresses/${account.address}`"
          ><q-icon name="account_balance_wallet"
        /></q-btn>

        <q-separator />

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
import GlobalActionsMenu from 'components/GlobalActionsMenu.vue';
import GlobalSearch from 'components/GlobalSearch.vue';
import { useAccountStore } from 'stores/account';
import HistoryNavigator from 'components/HistoryNavigator.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    HistoryNavigator,
    GlobalSearch,
    GlobalActionsMenu,
    UserMenu,
    MainNavigation,
    Ticker,
    KoinerLogo,
  },
  setup() {
    const account = useAccountStore();
    const leftDrawerOpen = ref(false);

    return {
      account,
      leftDrawerOpen,
    };
  },
});
</script>
