<template>
  <q-header reveal elevated>
    <q-toolbar>
      <q-toolbar-title>
        <koiner-logo />
      </q-toolbar-title>

      <q-space />

      <account-menu-mobile />
    </q-toolbar>
  </q-header>

  <q-page class="row items-start q-pt-xs q-pb-xl">
    <koinos-home-stats-component />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import KoinosHomeStatsComponent from './components/koin-home-stats-component.vue';
import { useAccountStore } from 'stores/account';
import KoinerLogo from 'components/koiner-logo.vue';
import AccountMenuMobile from '@koiner/components/account-menu-mobile.vue';

export default defineComponent({
  name: 'MobileHomePage',
  components: {
    AccountMenuMobile,
    KoinerLogo,
    KoinosHomeStatsComponent,
  },

  setup() {
    const accountStore = useAccountStore();

    return {
      accountStore,
    };
  },
});
</script>
