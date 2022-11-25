<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <contract-operations-table title="Operations" :contract-ids="[id]" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import ContractOperationsTable from '../../../../components/contract/search/view/contracts-operations-table.vue';

export default defineComponent({
  name: 'ContractOperationsPage',
  components: {ContractOperationsTable },

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
