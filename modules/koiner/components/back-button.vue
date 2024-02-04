<template>
  <q-btn size="0.675rem" icon="arrow_back_ios_new" @click="$router.go(-1)" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BackButton',
});
</script>
