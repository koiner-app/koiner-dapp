<template>
  <div class="koiner-topbar fixed-top">
    <q-icon class="topbar-icon" name="token"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">Chain</span>
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left">
        <q-route-tab :ripple="false" label="Blocks" to="/blocks" exact />
        <q-route-tab
          :ripple="false"
          label="Transactions"
          to="/transactions"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Events"
          to="/events"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Operations"
          to="/operations"
          exact
        />
        <q-route-tab :ripple="false" label="Accounts" to="/addresses" exact />
      </q-tabs>

    </div>
  </div>

  <router-view class="koiner-topbar-page" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChainLayout',
});
</script>
