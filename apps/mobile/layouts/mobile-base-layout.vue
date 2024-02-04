<template>
  <q-layout view="hHh LpR lFf" class="layout--mobile">
    <router-view />

    <q-dialog
      v-model="koinerStore.mobileMenu"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
      style="padding-bottom: 2rem !important"
      class="mobile-popup-menu"
    >
      <q-card class="bg-primary text-white">
        <q-card-section class="q-pa-xl full-height">
          <mobile-popup-navigation />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-footer elevated>
      <mobile-main-navigation />
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import { useAccountStore } from 'stores/account';
import { useKoinosStore } from 'stores/koinos';
import { useKoinerStore } from 'stores/koiner';
import { useStatsStore } from 'stores/stats';
import { useBookmarkStore } from '@koiner/bookmarks';
import { useOnChainStore } from '@koiner/onchain';
import MobileMainNavigation from '../components/mobile-main-navigation.vue';
import { useWindowSize } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { useBlockProductionStore } from 'stores/block-production';
import { useTokensStore } from 'stores/tokens';
import MobilePopupNavigation from '@mobile/components/mobile-popup-navigation.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    MobilePopupNavigation,
    MobileMainNavigation,
  },
  setup() {
    const accountStore = useAccountStore();
    const blockProductionStore = useBlockProductionStore();
    const koinosStore = useKoinosStore();
    const koinerStore = useKoinerStore();
    const statsStore = useStatsStore();
    const bookmarkStore = useBookmarkStore();
    const onChainStore = useOnChainStore();
    const tokensStore = useTokensStore();

    const { width } = useWindowSize();
    const router = useRouter();
    const route = useRoute();

    koinosStore.load();
    statsStore.load();
    accountStore.load(koinerStore.environment);
    blockProductionStore.load(koinerStore.environment);
    bookmarkStore.load(koinerStore.environment);
    onChainStore.load(koinerStore.environment);
    tokensStore.load(koinerStore.environment);

    if (blockProductionStore.addressesFilter.length === 0) {
      blockProductionStore.syncAddressFilterSelection(
        accountStore.addressesFilter
      );
    }

    const redirect = () => {
      const desktopRedirects: { [key: string]: string } = {
        'mobile.address': 'address',
        'mobile.address.history': 'address.history',
        'mobile.chain': 'blocks',
        'mobile.block': 'block',
        'mobile.transaction': 'transaction',
        'mobile.transaction.tab': 'transaction.tab',
        'mobile.ecosystem': 'ecosystem',
        'mobile.account': 'account.portfolio',
        'mobile.network': 'network',
        'mobile.contract': 'contract.operations',
        'mobile.contracts': 'contracts',
        'mobile.tokenize': 'tokens',
        'mobile.token': 'token',
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
      koinerStore,
      route,
    };
  },
});
</script>
