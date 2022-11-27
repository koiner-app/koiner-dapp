<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import posthog from 'posthog-js';

export default defineComponent({
  name: 'App',

  setup() {
    const router = useRouter();

    router.afterEach((to) => {
      nextTick(() => {
        posthog.capture('$pageview', {
          $current_url: to.fullPath,
        });
      });
    });
  },
});
</script>
