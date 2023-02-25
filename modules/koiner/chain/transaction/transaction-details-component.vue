<template>
  <q-list v-if="transaction">
    <q-item>
      <q-item-section class="id-section">
        <q-item-label caption>ID</q-item-label>
        <q-item-label lines="2"> {{ transaction.id }} </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="id-section">
        <q-item-label caption>Block</q-item-label>
        <q-item-label lines="2"
          ><router-link
            :to="{
              name: mobile ? 'mobile.block' : 'block',
              params: { height: transaction.blockHeight },
            }"
            >{{ transaction.blockHeight }}</router-link
          ></q-item-label
        >
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label caption>Timestamp</q-item-label>
        <q-item-label lines="2">
          {{ timeAgo(transaction.timestamp) }}
          <span class="timestamp"
            >({{ new Date(transaction.timestamp).toLocaleString() }})</span
          >
        </q-item-label>
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
        <q-item-label>{{
          transaction.receipt.networkBandwidthUsed
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>Compute Bandwidth Used:</q-item-label>
        <q-item-label>{{
          transaction.receipt.computeBandwidthUsed
        }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Transaction } from '@koiner/sdk';
import { useKoinerStore } from 'stores/koiner';
import { timeAgo } from '../../utils';

export default defineComponent({
  name: 'TransactionDetailsComponent',
  methods: { timeAgo },
  props: {
    transaction: {
      required: true,
      type: Object as PropType<Transaction>,
    },
    mobile: {
      required: false,
      type: Boolean,
      default: false,
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
