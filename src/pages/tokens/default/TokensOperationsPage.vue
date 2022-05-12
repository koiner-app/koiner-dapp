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

        <token-operations-table-view />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TokenOperationsTableView from '@koiner/contract/token/search/table/token-operations-table-view.vue';

export default defineComponent({
  name: 'TokenOperationsPage',
  components: { TokenOperationsTableView },
});
</script>
