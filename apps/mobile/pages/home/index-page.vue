<template>
  <q-page class="row items-start q-pt-xs q-pb-xl">
    <koinos-home-stats-component />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import KoinosHomeStatsComponent from './components/koin-home-stats-component.vue';
import { useAccountStore } from 'stores/account';

export default defineComponent({
  name: 'MobileHomePage',
  components: {
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
