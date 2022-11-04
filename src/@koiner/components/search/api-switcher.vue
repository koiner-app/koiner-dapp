<template>
  <q-btn
    @click="koinerStore.switch"
    v-if="koinerStore.mainNet"
    class="q-px-sm q-mx-sm"
    size="sm"
  >
    <q-avatar size="16px">
      <img alt="Koinos Mainnet" src="~/assets/koinos-icon-dark.svg" />
    </q-avatar>
    <span class="q-ml-xs" style="font-size: 0.625rem; font-weight: normal"
      >Mainnet</span
    >
    <q-tooltip>Switch to testnet</q-tooltip>
  </q-btn>
  <q-btn
    @click="koinerStore.switch"
    v-if="!koinerStore.mainNet"
    class="q-px-sm q-mx-sm"
    size="sm"
  >
    <q-avatar size="16px">
      <img alt="Koinos Testnet" src="~/assets/koinos-icon-light.svg" />
    </q-avatar>
    <span class="q-ml-xs" style="font-size: 0.625rem; font-weight: normal"
      >Testnet<q-tooltip>Switch to testnet</q-tooltip></span
    >
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useKoinerStore } from 'stores/koiner';

export default defineComponent({
  name: 'ApiSwitcher',

  setup() {
    const koinerStore = useKoinerStore();

    return {
      koinerStore,
    };
  },
});
</script>
