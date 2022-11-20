<template>
  <div class="koiner-topbar fixed-top">
    <q-icon class="topbar-icon" name="toll"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">Tokenize</span>
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="justify" class="lt-md">
        <q-route-tab :ripple="false" label="Tokens" to="/tokens" exact />
        <q-route-tab
          :ripple="false"
          label="Operations"
          to="/tokens/operations"
          exact
        />
        <q-route-tab :ripple="false" label="Events" to="/tokens/events" exact />
      </q-tabs>

      <q-tabs dense align="left" class="gt-sm">
        <q-route-tab
          :ripple="false"
          label="Overview"
          to="/tokenize"
          exact
        />
        <q-route-tab :ripple="false" label="Tokens" to="/tokens" exact />
        <q-route-tab
          :ripple="false"
          label="Operations"
          to="/tokens/operations"
          exact
        />
        <q-route-tab :ripple="false" label="Events" to="/tokens/events" exact />
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
  name: 'TokensLayout',
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
