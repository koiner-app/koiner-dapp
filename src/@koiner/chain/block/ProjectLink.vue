<template>
  <router-link :to="`/projects/${project}`">{{ project }}</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    project: {
      type: String,
    },
  },
});
</script>
