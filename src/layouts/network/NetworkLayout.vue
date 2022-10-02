<template>
  <div class="koiner-topbar fixed-top">
    <q-icon class="topbar-icon" name="hub"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">Network</span>
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="Health"
          :to="{ name: 'network' }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Rewards"
          :to="{ name: 'network.rewards' }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Producers"
          :to="{ name: 'network.producers' }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Pools"
          exact
          disabled
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
  name: 'ContractsLayout',
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
