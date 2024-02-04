<template>
  <div class="koiner-topbar fixed-top">
    <q-icon class="topbar-icon" name="settings"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">Settings</span>
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="General"
          :to="{ name: 'account.settings' }"
          exact
        />
        <!--        <q-route-tab-->
        <!--          :ripple="false"-->
        <!--          label="Bookmarks"-->
        <!--          :to="{ name: 'account.bookmarks' }"-->
        <!--          exact-->
        <!--        />-->
      </q-tabs>
    </div>
  </div>

  <router-view class="koiner-topbar-page" />
  <q-page
    v-if="accountStore.addressesFilter.length === 0"
    class="row items-start"
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
