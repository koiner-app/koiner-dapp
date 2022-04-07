<template>
  <q-page class="q-pa-lg">
    <div class="koiner-topbar fixed-top">
      <q-icon class="topbar-icon" name="account_balance_wallet"></q-icon>
      <div class="topbar-header">
        <span class="selected-item">{{ id }}</span>

        <q-btn flat dense size="sm" class="favorite-icon">
          <q-icon
            :name="account.addresses.includes(id) ? 'star' : 'star_border'"
          ></q-icon>
          <q-menu anchor="bottom left" self="top left">
            <q-item clickable v-if="account.addresses.includes(id)">
              <q-item-section>Remove from my addresses</q-item-section>
            </q-item>
            <q-item clickable v-if="!account.addresses.includes(id)">
              <q-item-section>Add to my addresses</q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
      </div>

      <div class="topbar-navigation">
        <q-tabs dense align="left" style="width: 100%">
          <q-route-tab
            :ripple="false"
            label="Overview"
            :to="`/addresses/${id}`"
            exact
          />
          <q-route-tab
            :ripple="false"
            label="Wallet"
            :to="`/addresses/${id}/wallet`"
            exact
          />
          <q-route-tab
            :ripple="false"
            label="History"
            :to="`/addresses/${id}/history`"
            exact
          />
          <q-route-tab
            :ripple="false"
            label="Vault"
            :to="`/addresses/${id}/vault`"
            exact
          />
        </q-tabs>
      </div>
    </div>

    <router-view class="q-pt-lg" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { useAccountStore } from 'stores/account';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'AddressLayout',
  components: {},
  setup() {
    let id: Ref<string | string[] | undefined> = ref();
    const route = useRoute();
    const router = useRouter();
    const account = useAccountStore();

    onMounted(async () => {
      id.value = route.params.id;
      // executeQuery();
    });

    return {
      id,
      account,
    };
  },
});
</script>
