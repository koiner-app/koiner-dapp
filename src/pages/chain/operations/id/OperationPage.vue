<template>
  <q-page class="row items-center justify-evenly">
    <h1>Operation {{ id }}</h1>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'OperationPage',

  setup() {
    let id: Ref<string | string[] | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id;
    });

    return {
      id,
    };
  },
});
</script>
