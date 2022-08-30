<template>
  <!--  <div class="koiner-topbar fixed-top" v-if="tokenContract">-->
  <div class="koiner-topbar fixed-top">
    <q-icon class="topbar-icon" name="toll"></q-icon>
    <div class="topbar-header">
      <span class="selected-item" v-if="tokenContract"
        >{{ tokenContract.name
        }}<q-chip>{{ tokenContract.symbol }}</q-chip></span
      ><span v-else class="selected-item">Token</span>

      <q-btn flat dense size="sm" class="favorite-icon">
        <q-icon
          :name="account.tokenWatchlist.includes(id) ? 'star' : 'star_border'"
        ></q-icon>
        <q-menu anchor="bottom left" self="top left">
          <q-item clickable v-if="account.tokenWatchlist.includes(id)">
            <q-item-section>Remove from my addresses</q-item-section>
          </q-item>
          <q-item clickable v-if="!account.tokenWatchlist.includes(id)">
            <q-item-section @click="account.addTokenToWatchlist(id)"
              >Add to my addresses</q-item-section
            >
          </q-item>
        </q-menu>
      </q-btn>
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="Overview"
          :to="`/tokens/${id}`"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Operations"
          :to="`/tokens/${id}/operations`"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Holders"
          :to="`/tokens/${id}/holders`"
          exact
        />
      </q-tabs>
    </div>
  </div>

  <router-view class="koiner-topbar-page" />
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { useAccountStore } from 'stores/account';
import { useRoute } from 'vue-router';
import { TokenContract } from '@koiner/sdk';

export default defineComponent({
  name: 'TokensLayout',
  components: {},
  setup() {
    let id: Ref<string | string[] | undefined> = ref();
    const route = useRoute();
    const account = useAccountStore();
    const tokenContract: Ref<TokenContract | undefined> = ref();

    // const executeQuery = () => {
    //
    // };

    onMounted(async () => {
      id.value = route.params.id;
      // executeQuery();
    });

    return {
      id,
      account,
      tokenContract,
    };
  },
});
</script>
