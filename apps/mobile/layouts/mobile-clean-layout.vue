<template>
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
import { useRoute } from 'vue-router';
import MobileDrawerNavigation from '@mobile/components/mobile-drawer-navigation.vue';

export default defineComponent({
  name: 'MobileCleanLayout',
  components: { MobileDrawerNavigation },

  setup() {
    const route = useRoute();

    return {
      drawer: ref(false),
      route,
    };
  },
});
</script>
