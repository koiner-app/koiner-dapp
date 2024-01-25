<template>
  <q-page-container :class="`page--${route.name.replace('.', '-')}`">
    <router-view />
  </q-page-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'MobileHomeLayout',
  components: {},
  setup() {
    const route = useRoute();

    return {
      route,
    };
  },
});
</script>
