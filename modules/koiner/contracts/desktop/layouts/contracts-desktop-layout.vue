<template>
  <div class="koiner-topbar fixed-top">
    <q-icon class="topbar-icon" name="document_scanner"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">Contracts</span>
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="justify" class="lt-md">
        <q-route-tab :ripple="false" label="Contracts" to="/contracts" exact />
        <q-route-tab
          :ripple="false"
          label="Events"
          :to="{ name: 'contracts.events' }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Operations"
          :to="{ name: 'contracts.operations' }"
          exact
        />
      </q-tabs>

      <q-tabs dense align="left" class="gt-sm">
        <q-route-tab
          :ripple="false"
          label="Overview"
          to="/contracts/overview"
          exact
        />
        <q-route-tab :ripple="false" label="Contracts" to="/contracts" exact />
        <q-route-tab
          :ripple="false"
          label="Events"
          :to="{ name: 'contracts.events' }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Operations"
          :to="{ name: 'contracts.operations' }"
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
