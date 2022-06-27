<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card
      v-if="height"
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

        <transactions-search-view :request="request" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import TransactionsSearchView from '@koiner/chain/transaction/search/transactions-search-view.vue';
import { QueryTransactionsArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'BlockTransactionsPage',
  components: { TransactionsSearchView },

  setup() {
    let request: Ref<QueryTransactionsArgs> = ref({ filter: {} });
    let height: Ref<number | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      height.value = parseInt(route.params.height.toString());
      request.value.filter = {
        blockHeight: { equals: height.value },
      };
    });

    return {
      height,
      request,
    };
  },
});
</script>
