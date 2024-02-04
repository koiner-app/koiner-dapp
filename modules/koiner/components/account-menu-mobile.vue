<template>
  <q-avatar
    size="2.5rem"
    text-color="white"
    icon="account_circle"
    @click="drawer = true"
  />

  <q-drawer v-model="drawer" :overlay="true" side="right">
    <q-list bordered>
      <q-item-label header>Settings</q-item-label>

      <q-separator spaced />

      <q-item>
        <q-item-section>
          <theme-switcher />
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ThemeSwitcher from 'components/theme-switcher.vue';

export default defineComponent({
  name: 'AccountMenuMobile',
  components: { ThemeSwitcher },

  setup(props) {
    const drawer = ref(false);

    return {
      drawer,
    };
  },
});
</script>
