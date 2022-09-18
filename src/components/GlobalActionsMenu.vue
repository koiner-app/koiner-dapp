<template>
  <q-btn flat dense size="md" class="action-menu">
    <q-icon name="add"></q-icon>
    <q-menu anchor="bottom left" self="top left">
      <q-item clickable>
        <q-item-section>Add address</q-item-section>
      </q-item>
      <q-item clickable to="/transfer">
        <q-item-section>Transfer</q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
