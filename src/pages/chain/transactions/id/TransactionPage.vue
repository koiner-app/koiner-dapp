<template>
  <q-page class="row items-baseline justify-evenly" style="padding-top: 8rem">
    <q-card
      class="table-card shadow-1"
      style="
        max-width: 1288px;
        margin: 0 auto;
        box-shadow: 0 0 20px rgb(0 0 0 / 8%);
      "
      v-if="transaction"
    >
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Transaction overview</div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-list bordered class="rounded-borders">
          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Transaction Hash:</q-item-label>
            </q-item-section>

            <q-item-section>
              {{ transaction.id }}
            </q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Block:</q-item-label>
            </q-item-section>

            <q-item-section>
              {{ transaction.blockHeight }}
            </q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Timestamp</q-item-label>
            </q-item-section>
            <q-item-section></q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Operations</q-item-label>
            </q-item-section>
            <q-item-section>
              <div v-if="transaction.operationCount > 0">
                <q-btn
                  :to="{ name: 'transaction.operations', id: itemState.id }"
                  flat
                  class="q-pa-none"
                  style="min-height: auto"
                >
                  <q-badge color="secondary" text-color="black"
                    >{{ transaction.operationCount }} operation
                    {{ transaction.operationCount > 1 ? 's' : '' }}</q-badge
                  >
                </q-btn>
              </div>
              <div v-else>
                <q-badge color="grey" text-color="black">No operations</q-badge>
              </div>
            </q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Signature:</q-item-label>
            </q-item-section>

            <q-item-section>
              {{ transaction.signature }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <error-view :error="itemState.error" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Transaction, useTransactionPageQuery } from '@koiner/sdk';
import { ItemState } from '@appvise/search-manager';
import ErrorView from 'components/error-view.vue';

export default defineComponent({
  components: { ErrorView },
  setup() {
    const itemState = ItemState.create<Transaction>();
    const variables: Ref<{ id: string }> = ref({ id: '' });
    const route = useRoute();

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useTransactionPageQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.transaction as Transaction;
      });

      itemState.error = error;
      itemState.fetching = fetching;
      itemState.isPaused = isPaused;
    };

    onMounted(async () => {
      variables.value.id = route.params.id.toString();
      executeQuery();
      itemState.isPaused.value = true;
      itemState.isPaused.value = false;
    });

    watch(
      () => route.params.id,
      async (newId) => {
        itemState.isPaused.value = !newId;
        variables.value.id = newId ? newId.toString() : '';
      }
    );

    return {
      itemState,
      transaction: itemState.item,
      error: itemState.error,
      executeQuery,
    };
  },
});
</script>
