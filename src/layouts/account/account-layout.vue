<template>
  <div class="koiner-topbar fixed-top">
    <q-icon class="topbar-icon" name="dashboard"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">{{ account.name }}</span>

      <q-btn flat dense size="sm" class="action-menu">
        <q-icon name="expand_more"></q-icon>
        <q-menu anchor="bottom left" self="top left">
          <q-item clickable>
            <q-item-section>Change my name</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="Dashboard"
          :to="{ name: 'account.dashboard' }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="History"
          :to="{ name: 'account.history' }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Rewards"
          :to="{ name: 'account.rewards' }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Bookmarks"
          :to="{ name: 'account.bookmarks' }"
          exact
        />
      </q-tabs>
    </div>
  </div>

  <router-view class="koiner-topbar-page" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAccountStore } from 'stores/account';

export default defineComponent({
  name: 'AccountLayout',
  components: {},
  setup() {
    const account = useAccountStore();

    return {
      account,
    };
  },
});
</script>
