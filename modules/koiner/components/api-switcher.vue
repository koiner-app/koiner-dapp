<template>
  <!--  @click="koinerStore.switch"-->
  <q-btn v-if="koinerStore.isProd" class="q-px-sm q-mx-sm" size="sm">
    <q-avatar size="16px">
      <img alt="Koinos Mainnet" src="~/assets/koinos-icon-dark.svg" />
    </q-avatar>
    <span class="q-ml-xs" style="font-size: 0.625rem; font-weight: normal"
      >Mainnet</span
    >
    <!--    <q-tooltip>Switch to testnet</q-tooltip>-->
  </q-btn>

  <q-btn
    @click="koinerStore.switch"
    v-if="!koinerStore.isProd"
    class="q-px-sm q-mx-sm"
    size="sm"
  >
    <q-avatar size="16px">
      <img alt="Koinos Testnet" src="~/assets/koinos-icon-light.svg" />
    </q-avatar>
    <span class="q-ml-xs" style="font-size: 0.625rem; font-weight: normal"
      ><span v-if="koinerStore.environment === 'test'"
        >Testnet<q-tooltip>Switch to mainnet</q-tooltip>
      </span>
      <span v-if="koinerStore.environment === 'local'"
        >Localnet<q-tooltip>Switch to mainnet</q-tooltip>
      </span>
    </span>
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
