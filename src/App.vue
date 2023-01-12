<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import posthog from 'posthog-js';
import { useQuasar } from 'quasar';
import { useAccountStore } from 'stores/account';

export default defineComponent({
  name: 'App',

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const accountStore = useAccountStore();

    router.afterEach((to) => {
      nextTick(() => {
        posthog.capture('$pageview', {
          $current_url: to.fullPath,
        });
      });
    });

    onMounted(() => {
      if (accountStore.theme === 'auto') {
        $q.dark.set('auto');
      } else {
        $q.dark.set(accountStore.theme === 'dark');
      }
    });
  },
});
</script>
