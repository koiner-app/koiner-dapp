<template>
  <q-list v-if="transaction">
    <q-item>
      <q-item-section>
        <q-item-label caption>ID</q-item-label>
        <q-item-label lines="2"> {{ transaction.id }} </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label caption>Timestamp</q-item-label>
        <q-item-label lines="2"> {{ transaction.timestamp }} </q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>Disk Storage Used:</q-item-label>
        <q-item-label>{{ transaction.receipt.diskStorageUsed }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>Network Bandwidth Used:</q-item-label>
        <q-item-label>{{ transaction.receipt.networkBandwidthUsed }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>Compute Bandwidth Used:</q-item-label>
        <q-item-label>{{ transaction.receipt.computeBandwidthUsed }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Transaction } from '@koiner/sdk';
import { useKoinerStore } from 'stores/koiner';

export default defineComponent({
  name: 'TransactionDetailsComponent',
  props: {
    transaction: {
      required: true,
      type: Object as PropType<Transaction>,
    },
  },

  setup() {
    const koinerStore = useKoinerStore();

    return {
      koinerStore,
    };
  },
});
</script>
