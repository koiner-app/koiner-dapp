<template>
  <q-btn
    v-if="!showToggle"
    @click="accountStore.displayDate = !accountStore.displayDate"
    :push="!accountStore.displayDate"
    class="event-filter-button"
    :style="accountStore.displayDate ? 'background: #64aeea1a' : ''"
  >
    <q-icon
      name="event"
      color="64aeea"
      :style="accountStore.displayDate ? '' : 'opacity: 0.6'"
    />
    <q-tooltip
      style="background: #64aeea"
      anchor="center right"
      self="center left"
      >Display full date</q-tooltip
    >
  </q-btn>

  <q-toggle
    v-if="showToggle"
    v-model="accountStore.displayDate"
    checked-icon="check"
    color="primary"
    unchecked-icon="clear"
    label="Display full date"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAccountStore } from 'stores/account';

export default defineComponent({
  name: 'DisplayDateButton',
  props: {
    showToggle: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const accountStore = useAccountStore();

    return {
      accountStore,
    };
  },
});
</script>
