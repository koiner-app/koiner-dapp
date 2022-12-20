<template>
  <q-page class="row items-start">
    <q-banner
      class="bg-primary text-white"
      v-if="!accountStore.dismissedMobileBanner"
    >
      Mobile version is being developed. Please use a larger screen to view more
      data.
      <template v-slot:action>
        <q-btn
          flat
          color="white"
          label="Dismiss"
          @click="accountStore.dismissedMobileBanner = true"
        />
      </template>
    </q-banner>
    <koinos-home-stats-component />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
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
