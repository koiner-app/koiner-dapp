<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card shadow-1">
      <q-card-section>
        <tokens-operations-table title="Operations" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TokensOperationsTable from '../../../components/operation/search/view/tokens-operations-table.vue';

export default defineComponent({
  name: 'TokenOperationsPage',
  components: { TokensOperationsTable },
});
</script>
