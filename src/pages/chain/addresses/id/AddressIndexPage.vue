<template>
  <q-page class="row items-baseline justify-evenly">
    <h1>Address</h1>
    <p>{{ id }}</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AddressPage',

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
