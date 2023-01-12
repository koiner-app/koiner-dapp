<template>
  <div class="q-py-md">
    <q-select
      label="Theme"
      v-model="currentTheme"
      :options="themes"
      style="max-width: 250px"
      :dark="inDarkMode"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { KoinerThemes, useAccountStore } from 'stores/account';
import { useQuasar } from 'quasar';
import posthog from 'posthog-js';

export default defineComponent({
  name: 'ThemeSwitcher',
  props: {
    dark: {
      type: Boolean,
      required: false,
    },
  },

  setup(props) {
    const $q = useQuasar();
    const accountStore = useAccountStore();
    const currentTheme = ref(accountStore.theme);
    const darkMode = ref(accountStore.theme === 'dark');

    watch(darkMode, () => {
      accountStore.theme = darkMode.value ? 'dark' : 'hybrid';
      $q.dark.set(darkMode.value);

      posthog.capture('switchThemes', {
        theme: accountStore.theme,
      });
    });

    watch(currentTheme, () => {
      accountStore.theme = currentTheme.value;

      if (accountStore.theme === 'auto') {
        $q.dark.set('auto');
      } else {
        $q.dark.set(accountStore.theme === 'dark');
      }
    });

    return {
      themes: KoinerThemes,
      currentTheme,
      darkMode,
      inDarkMode: computed(() => {
        return props.dark || $q.dark.isActive;
      }),
    };
  },
});
</script>
