<template>
  <q-page class="row items-center justify-evenly">
    <q-card
      class="table-card shadow-1"
      style="
        max-width: 1288px;
        margin: 0 auto;
        box-shadow: 0 0 20px rgb(0 0 0 / 8%);
      "
    >
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Operations</div>
          <q-space />
        </div>

        <operations-table-view />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OperationsTableView from '@koiner/chain/operation/search/table/operations-table-view.vue';

export default defineComponent({
  name: 'OperationsIndexPage',
  components: { OperationsTableView },
});
</script>
