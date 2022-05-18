<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card v-if="height"
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

        <transactions-table-view :block-height="height" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import TransactionsTableView from '@koiner/chain/transaction/search/table/transactions-table-view.vue';

export default defineComponent({
  name: 'BlockTransactionsPage',
  components: { TransactionsTableView },

  setup() {
    let height: Ref<number | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      height.value = parseInt(route.params.height.toString());
    });

    return {
      height,
    };
  },
});
</script>
