<template>
  <q-layout view="hHh LpR lFf" class="layout--desktop">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <koiner-logo />
        </q-toolbar-title>

        <mana-bar size="sm" class="q-mr-xs" />
        <search-dialog />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above :mini="true" :width="200" bordered>
      <q-scroll-area class="fit">
        <main-navigation />
      </q-scroll-area>
    </q-drawer>

    <q-page-container :class="`page--${route.name}`" style="min-height: 100vh">
      <router-view />
    </q-page-container>

    <q-footer reveal elevated>
      <q-toolbar>
        <ticker />

        <q-space />

        <api-switcher />
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
import ManaBar from '@koiner/components/mana-bar.vue';
import { useBlockProductionStore } from 'stores/block-production';
import { useOnChainStore } from '@koiner/onchain';

export default defineComponent({
  name: 'MainLayout',
  components: {
    ManaBar,
    ApiSwitcher,
    SearchDialog,
    MainNavigation,
    Ticker,
    KoinerLogo,
  },
  setup() {
    const accountStore = useAccountStore();
    const blockProductionStore = useBlockProductionStore();
    const koinosStore = useKoinosStore();
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const bookmarkStore = useBookmarkStore();
    const onChainStore = useOnChainStore();
    const { width } = useWindowSize();
    const router = useRouter();
    const route = useRoute();

    koinosStore.load();
    statsStore.load();
    accountStore.load(koinerStore.environment);
    blockProductionStore.load(koinerStore.environment);
    bookmarkStore.load(koinerStore.environment);
    onChainStore.load(koinerStore.environment);

    if (blockProductionStore.addressesFilter.length === 0) {
      blockProductionStore.syncAddressFilterSelection(
        accountStore.addressesFilter
      );
    }

    watch(
      bookmarkStore,
      () => {
        accountStore.syncAddressFilter(bookmarkStore.bookmarkKeys('addresses'));
      },
      { deep: true }
    );

    const redirect = () => {
      const mobileRedirects: { [key: string]: string } = {
        address: 'mobile.address',
        'address.history': 'mobile.address.history',
        'address.rewards': 'mobile.address',
        addresses: 'mobile.chain',
        block: 'mobile.block',
        blocks: 'mobile.chain',
        events: 'mobile.chain',
        operations: 'mobile.chain',
        transaction: 'mobile.transaction',
        'transaction.tab': 'mobile.transaction.tab',
        transactions: 'mobile.chain',
        ecosystem: 'mobile.ecosystem',
        'account.portfolio': 'mobile.account',
        network: 'mobile.network',
        contract: 'mobile.contract',
        'contract.events': 'mobile.contract',
        'contract.operations': 'mobile.contract',
        contracts: 'mobile.contracts',
        tokens: 'mobile.tokenize',
        token: 'mobile.token',
        'token.balances': 'mobile.token',
        'token.events': 'mobile.token',
        'token.operations': 'mobile.token',
      };

      if (route.name && mobileRedirects[route.name.toString()]) {
        router.push({ name: mobileRedirects[route.name.toString()] });
      } else {
        router.push({ name: 'mobile.home' });
      }
    };

    watch(
      width,
      () => {
        if (width.value < 1024) {
          redirect();
        }
      },
      { deep: true }
    );

    onMounted(() => {
      if (width.value < 1024) {
        redirect();
      }
    });

    return {
      drawer: ref(false),
      route,
      accountStore,
    };
  },
});
</script>
