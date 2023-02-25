<template>
  <q-list v-if="block">
    <q-item>
      <q-item-section class="block-id-section">
        <q-item-label caption>ID</q-item-label>
        <q-item-label lines="2"> {{ block.id }} </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label caption>Timestamp</q-item-label>
        <q-item-label lines="2">
          {{ timeAgo(block.header.timestamp) }}
          <span class="timestamp">({{
            new Date(block.header.timestamp).toLocaleString()
          }})</span>
        </q-item-label>
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
import { timeAgo } from '../../utils';

export default defineComponent({
  name: 'BlockDetailsComponent',
  methods: { timeAgo },
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
