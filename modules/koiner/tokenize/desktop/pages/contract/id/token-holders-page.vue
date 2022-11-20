<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <token-holders-table v-if="id" title="Token Holders" :contract-id="id" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import TokenHoldersTable from '../../../../components/holder/search/view/token-holders-table.vue';

export default defineComponent({
  name: 'TokenHoldersPage',
  components: { TokenHoldersTable },

  setup() {
    let id: Ref<string | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id.toString();
    });

    return {
      id,
    };
  },
});
</script>
