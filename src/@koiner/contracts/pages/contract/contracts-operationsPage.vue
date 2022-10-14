<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <contract-operations-table title="Operations" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContractOperationsTable from '../../components/contract/search/view/contracts-operations-table.vue';

export default defineComponent({
  name: 'ContractOperationsPage',
  components: { ContractOperationsTable },
});
</script>
