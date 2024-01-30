<template>
  <div class="text-overline">Details</div>

  <q-list v-if="transaction">
    <q-item>
      <q-item-section class="id-section">
        <q-item-label caption>ID</q-item-label>
        <q-item-label lines="2" style="word-break: break-word">
          <copy-to-clipboard
            :source="transaction.id"
            :tooltip="'Copy transaction id to clipboard'"
          />
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="id-section">
        <q-item-label caption>Block</q-item-label>
        <q-item-label lines="2"
          ><router-link
            :to="{
              name: 'block',
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
        <q-item-label>
          <q-item-label caption>Stats</q-item-label>
          <span
            >{{ transaction.operationCount }} operation<span
              v-if="transaction.operationCount !== 1"
              >s</span
            >
            + {{ transaction.receipt.eventCount }} event<span
              v-if="transaction.receipt.eventCount !== 1"
              >s</span
            ></span
          >
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>

  <q-separator class="q-my-lg" />

  <div class="text-overline">Mana</div>

  <q-list>
    <q-item>
      <q-item-section>
        <q-item-label caption>Payer:</q-item-label>
        <q-item-label>
          <router-link
            :to="{
              name: 'address',
              params: { id: transaction.header.payer },
            }"
            >{{ transaction.header.payer }}</router-link
          ></q-item-label
        >
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>Payee:</q-item-label>
        <q-item-label
          ><router-link
            v-if="transaction.header.payee"
            :to="{
              name: 'address',
              params: { id: transaction.header.payee },
            }"
            >{{ transaction.header.payee }}</router-link
          >
          <span v-else>-</span>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>Mana used:</q-item-label>
        <q-item-label
          >{{
            formattedTokenAmount(Number(transaction.receipt.rcUsed), 8)
          }}
          Mana</q-item-label
        >
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label caption>Mana limit (Max payer RC)</q-item-label>
        <q-item-label
          >{{
            formattedTokenAmount(Number(transaction.receipt.rcLimit), 8)
          }}
          Mana ({{
            formattedTokenAmount(Number(transaction.receipt.maxPayerRc), 8)
          }})</q-item-label
        >
      </q-item-section>
    </q-item>
  </q-list>

  <q-separator class="q-my-lg" />

  <div class="text-overline">Resources Used</div>

  <q-list>
    <q-item v-if="transaction.receipt?.diskStorageUsed">
      <q-item-section>
        <q-item-label caption>Disk Storage Used:</q-item-label>
        <q-item-label>{{ transaction.receipt.diskStorageUsed }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item v-if="transaction.receipt?.networkBandwidthUsed">
      <q-item-section>
        <q-item-label caption>Network Bandwidth Used:</q-item-label>
        <q-item-label>{{
          transaction.receipt.networkBandwidthUsed
        }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item v-if="transaction.receipt?.computeBandwidthUsed">
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
import { formattedTokenAmount, timeAgo } from '../../utils';
import CopyToClipboard from '@koiner/components/copy-to-clipboard.vue';

export default defineComponent({
  name: 'TransactionDetailsComponent',
  components: { CopyToClipboard },
  methods: { formattedTokenAmount, timeAgo },
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
