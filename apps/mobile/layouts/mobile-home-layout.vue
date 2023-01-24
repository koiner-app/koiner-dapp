<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        @click="drawer = !drawer"
        flat
        round
        dense
        icon="menu"
        class="lt-md q-mr-sm"
      />
      <q-separator dark vertical inset class="lt-md" />
      <q-toolbar-title>
        <koiner-logo />
      </q-toolbar-title>
    </q-toolbar>
  </q-header>

  <q-drawer :width="200" v-model="drawer" bordered>
    <q-scroll-area class="fit">
      <mobile-drawer-navigation />
    </q-scroll-area>
  </q-drawer>

  <q-page-container :class="`page--${route.name.replace('.', '-')}`">
    <router-view />
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import KoinerLogo from 'src/components/koiner-logo.vue';
import MobileDrawerNavigation from '../components/mobile-drawer-navigation.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'MobileHomeLayout',
  components: {
    MobileDrawerNavigation,
    KoinerLogo,
  },
  setup() {
    const route = useRoute();

    return {
      drawer: ref(false),
      route,
    };
  },
});
</script>
