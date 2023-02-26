<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card class="table-card">
      <q-card-section>
        <contract-events-table title="Events" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContractEventsTable from '../../../components/contract/search/view/contracts-events-table.vue';

export default defineComponent({
  name: 'ContractEventsPage',
  components: { ContractEventsTable },
});
</script>
