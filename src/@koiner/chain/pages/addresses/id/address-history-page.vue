<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <address-history-component v-if="id" :ids="[id]" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AddressHistoryComponent from '../../../components/address/address-history-component.vue';

export default defineComponent({
  name: 'AddressHistoryPage',
  components: { AddressHistoryComponent },

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
