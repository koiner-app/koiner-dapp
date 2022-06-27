<template>
  <q-page class="row items-baseline justify-evenly">
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
          <div class="text-h6">Transactions</div>
          <q-space />
        </div>

        <transactions-search-view />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TransactionsSearchView from '@koiner/chain/transaction/search/transactions-search-view.vue';

export default defineComponent({
  name: 'TransactionsIndexPage',
  components: { TransactionsSearchView },
});
</script>
