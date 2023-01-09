<template>
  <div class="q-py-lg q-px-sm">
    <q-select label="Theme" v-model="currentTheme" :options="themes" style="max-width: 250px;" />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue';
import { KoinerThemes, useAccountStore } from 'stores/account';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'ThemeSwitcher',

  setup() {
    const $q = useQuasar();
    const accountStore = useAccountStore();
    const currentTheme = ref(accountStore.theme);

    watch(currentTheme, () => {
      accountStore.theme = currentTheme.value;
      $q.dark.set(currentTheme.value === 'dark');
    });

    onMounted(() => {
      $q.dark.set(currentTheme.value === 'dark');
    });

    return {
      themes: KoinerThemes,
      currentTheme,
    };
  },
});
</script>
