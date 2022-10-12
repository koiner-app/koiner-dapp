<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <address-stats-component v-if="id" :ids="[id]" />
    ...
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AddressStatsComponent from '@koiner/chain/components/address/address-stats-component.vue';

export default defineComponent({
  name: 'AddressIndexPage',
  components: { AddressStatsComponent },
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
