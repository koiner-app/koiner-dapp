<template>
  <q-page class="row items-center justify-evenly">
    <h1>Transaction {{ id }}</h1>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'TransactionPage',

  setup() {
    let id: Ref<string | string[] | undefined> = ref();
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      id.value = route.params.id;
      // executeQuery();
    });

    return {
      id,
    };
  },
});
</script>
