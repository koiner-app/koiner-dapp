<template>
  <q-page class="row items-baseline justify-evenly transactions-search-page">
    <q-card class="table-card">
      <q-card-section>
        <transactions-table title="Transactions" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TransactionsTable from '@koiner/chain/transaction/search/view/transactions-table.vue';

export default defineComponent({
  name: 'TransactionsIndexPage',
  components: { TransactionsTable },
});
</script>
