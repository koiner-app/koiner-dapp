<template>
  <div class="q-py-md">
    <q-select
      label="Theme"
      v-model="currentTheme"
      :options="themes"
      style="max-width: 250px"
      :dark="dark"
    />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { KoinerThemes, useAccountStore } from 'stores/account';
import { useQuasar } from 'quasar';
import posthog from 'posthog-js';

export default defineComponent({
  name: 'ThemeSwitcher',
  props: {
    dark: {
      type: Boolean,
      required: false,
    }
  },

  setup() {
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
      $q.dark.set(currentTheme.value === 'dark');
    });

    return {
      themes: KoinerThemes,
      currentTheme,
      darkMode,
    };
  },
});
</script>
