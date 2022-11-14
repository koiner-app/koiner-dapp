<template>
  <div class="koiner-topbar fixed-top">
    <q-icon class="topbar-icon" name="dashboard"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">{{ accountStore.name }}</span>

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
          label="Portfolio"
          :to="{ name: 'account.portfolio' }"
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
  <q-page
    v-if="accountStore.addressesFilter.length === 0"
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <first-address-search class="absolute-center" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAccountStore } from 'stores/account';
import FirstAddressSearch from '@koiner/components/search/first-address-search/first-address-search.vue';

export default defineComponent({
  name: 'AccountLayout',
  components: { FirstAddressSearch },
  setup() {
    const accountStore = useAccountStore();

    return {
      accountStore,
    };
  },
});
</script>
