<template>
  <div v-if="!account.connected">
    <span @click="account.login()">Connect wallet</span>
  </div>
  <q-btn v-if="account.connected" flat dense size="md" class="action-menu">
    <q-icon name="account_circle"></q-icon>
    <q-menu anchor="bottom left" self="top left">
      <q-item clickable to="/account">
        <q-item-section>Account</q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable>
        <q-item-section>Addresses: <br />{{ account.address }}</q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable>
        <q-item-section>Add address</q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable>
        <q-item-section>Export settings</q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable>
        <q-item-section>
          <q-btn
            v-close-popup
            color="primary"
            label="Logout"
            push
            size="sm"
            @click="account.logout"
          />
        </q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
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
