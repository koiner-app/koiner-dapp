<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    Rewards
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'AddressRewardsPage',

  setup() {
    let id: Ref<string | string[] | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id;
    });

    watch(
      () => route.params.id,
      async (newId) => {
        id.value = newId;
      }
    );

    return {
      id,
    };
  },
});
</script>
