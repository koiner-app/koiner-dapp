<template>
  <q-btn icon="unfold_more" class="q-pa-none" size="sm" @click="dialog = true">
  </q-btn>
  <span @click="dialog = true">Main Portfolio</span>

  <q-dialog
    v-model="dialog"
    transition-show="fade-in"
    transition-hide="fade-out"
  >
    <q-card
      class="bg-primary text-white"
      style="width: 700px; max-width: 80vw; max-height: 80vh"
    >
      <q-bar>
        <span class="text-caption">Switch portfolios</span>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pt-lg">
        <q-list bordered padding class="rounded-borders text-primary">
          <q-item
            clickable
            v-ripple
            class="q-pa-lg"
            :active="currentPortfolio === 'Main Portfolio'"
            @click="currentPortfolio = 'Main Portfolio'"
          >
            <q-item-section>Main Portfolio</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            class="q-pa-lg"
            active-class="my-menu-link"
          >
            <q-item-section>Add portfolio</q-item-section>
            <q-item-section avatar class="text-caption"> Soon </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PortfolioSwitcher',
  props: {
    dark: {
      type: Boolean,
      required: false,
    },
  },

  setup() {
    const currentPortfolio = ref('Main Portfolio');
    const dialog = ref(false);

    return {
      portfolios: ['Main Portfolio'],
      currentPortfolio,
      dialog,
    };
  },
});
</script>
