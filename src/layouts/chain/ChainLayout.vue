<template>
  <div class="koiner-topbar fixed-top">
    <q-icon class="topbar-icon" name="token"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">Chain</span>
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab :ripple="false" label="Overview" to="/chain" exact />
        <q-route-tab :ripple="false" label="Blocks" to="/blocks" exact />
        <q-route-tab
          :ripple="false"
          label="Transactions"
          to="/transactions"
          exact
        />
        <q-route-tab :ripple="false" label="Addresses" to="/addresses" exact />
        <q-route-tab
          :ripple="false"
          label="Operations"
          to="/operations"
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

export default defineComponent({
  name: 'ChainLayout',
  components: {},
  setup() {
    let id: Ref<string | string[] | undefined> = ref();
    const route = useRoute();
    const account = useAccountStore();

    onMounted(async () => {
      id.value = route.params.id;
    });

    return {
      id,
      account,
    };
  },
});
</script>
