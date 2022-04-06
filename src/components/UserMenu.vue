<template>
  <div v-if="!account.connected">
    <span @click="account.login()">Connect wallet</span>
  </div>
  <q-list
    v-if="account.connected"
    bordered
    padding
    class="rounded-borders text-primary bottom-nav cursor-pointer"
  >
    <q-item v-if="account" flat class="full-width">
      <q-menu anchor="bottom right" self="bottom left">
        <div class="row no-wrap q-pa-md">
          <div class="column items-center">
            <div class="text-subtitle1 q-mt-md q-mb-lg">
              Address: {{ account.address }}
            </div>

            <q-btn
              v-close-popup
              color="primary"
              label="Logout"
              push
              size="sm"
              @click="account.logout"
            />
          </div>
        </div>
      </q-menu>
      <q-item-section avatar>
        <q-avatar size="2rem" color="primary" text-color="white">
          <span style="font-size: 0.75rem">ME</span>
        </q-avatar>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAccountStore } from 'stores/account';

export default defineComponent({
  setup() {
    const account = useAccountStore();

    return {
      account,
    };
  },
});
</script>
