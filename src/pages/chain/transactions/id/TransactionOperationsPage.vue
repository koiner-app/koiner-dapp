<template>
  <q-page class="row items-baseline justify-evenly">
    <q-card
      v-if="id"
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

        <operations-search-view :request="request" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import OperationsSearchView from '@koiner/chain/operation/search/operations-search-view.vue';
import { QueryOperationsArgs } from '@koiner/sdk';

export default defineComponent({
  name: 'TransactionOperationsPage',
  components: { OperationsSearchView },

  setup() {
    let request: Ref<QueryOperationsArgs> = ref({ filter: {} });
    let id: Ref<string | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id.toString();
      request.value.filter = {
        transactionId: { equals: id.value },
      };
    });

    return {
      id,
      request,
    };
  },
});
</script>
