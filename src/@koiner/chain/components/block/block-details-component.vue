<template>
  <q-list v-if="block">
    <q-item>
      <q-item-section>
        <q-item-label caption>ID</q-item-label>
        <q-item-label lines="2"> {{ block.id }} </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label caption>Timestamp</q-item-label>
        <q-item-label lines="2"> {{ block.header.timestamp }} </q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>Disk Storage Used:</q-item-label>
        <q-item-label>{{ block.receipt.diskStorageUsed }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>Network Bandwidth Used:</q-item-label>
        <q-item-label>{{ block.receipt.networkBandwidthUsed }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>Compute Bandwidth Used:</q-item-label>
        <q-item-label>{{ block.receipt.computeBandwidthUsed }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Block } from '@koiner/sdk';
import { useKoinerStore } from 'stores/koiner';

export default defineComponent({
  name: 'BlockDetailsComponent',
  props: {
    block: {
      required: true,
      type: Object as PropType<Block>,
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
