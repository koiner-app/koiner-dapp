<template>
  <div class="koiner-topbar fixed-top" v-if="id">
    <q-icon class="topbar-icon" name="account_balance_wallet"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">Transaction details</span>

      <q-btn flat dense size="sm" class="favorite-icon">
        <q-icon
          :name="account.transactions.includes(id) ? 'star' : 'star_border'"
        ></q-icon>
        <q-menu anchor="bottom left" self="top left">
          <q-item clickable v-if="account.transactions.includes(id)" @click="account.removeTransaction(id)">
            <q-item-section>Remove from my transactions</q-item-section>
          </q-item>
          <q-item clickable v-if="!account.transactions.includes(id)" @click="account.addTransaction(id)">
            <q-item-section>Add to my transactions</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="Overview"
          :to="`/transactions/${id}`"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Operations"
          :to="`/transactions/${id}/operations`"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Events"
          :to="`/transactions/${id}/events`"
          exact
        />
      </q-tabs>
    </div>
  </div>

  <router-view class="koiner-topbar-page" />
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useAccountStore } from 'stores/account';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AddressLayout',
  setup() {
    const route = useRoute();
    const account = useAccountStore();

    let currentPage: Ref<string | undefined> = ref();
    let id: Ref<string | undefined> = ref();

    onMounted(async () => {
      if (route.name) {
        currentPage.value = route.name.toString();
      }

      if (route.params.id) {
        id.value = route.params.id.toString();
      }
    });

    watch(
      () => route.params.id,
      async (newId) => {
        id.value = newId ? newId.toString() : undefined;
      }
    );

    watch(
      () => route.name,
      async (newName) => {
        if (newName) {
          currentPage.value = newName.toString();
        }
      }
    );

    const addToMyTransactions = (id: string) => {
      account.transactions.push(id);
    }

    return {
      id,
      account,
      addToMyTransactions,
    };
  },
});
</script>
