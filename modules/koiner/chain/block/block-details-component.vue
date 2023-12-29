<template>
  <q-list v-if="block">
    <q-item>
      <q-item-section class="id-section">
        <q-item-label caption>ID</q-item-label>
        <q-item-label lines="2">
          <copy-to-clipboard
            :source="block.id"
            :tooltip="'Copy block id to clipboard'"
          />
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label caption>Timestamp</q-item-label>
        <q-item-label lines="2">
          {{ timeAgo(block.header.timestamp) }}
          <span class="timestamp"
            >({{ new Date(block.header.timestamp).toLocaleString() }})</span
          >
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item v-if="block.receipt.diskStorageUsed">
      <q-item-section>
        <q-item-label caption>Disk Storage Used:</q-item-label>
        <q-item-label>{{ block.receipt.diskStorageUsed }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item v-if="block.receipt.networkBandwidthUsed">
      <q-item-section>
        <q-item-label caption>Network Bandwidth Used:</q-item-label>
        <q-item-label>{{ block.receipt.networkBandwidthUsed }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item v-if="block.receipt.computeBandwidthUsed">
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
import CopyToClipboard from '@koiner/components/copy-to-clipboard.vue';

export default defineComponent({
  name: 'BlockDetailsComponent',
  components: { CopyToClipboard },
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
