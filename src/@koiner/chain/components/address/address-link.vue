<template>
  <router-link :to="`/addresses/${address}`">{{ address }}</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    address: {
      type: String,
    },
  },
});
</script>
