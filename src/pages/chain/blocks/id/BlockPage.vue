<template>
  <q-page class="row items-baseline justify-evenly" style="padding-top: 8rem">
    <q-card
      class="table-card shadow-1"
      style="
        max-width: 1288px;
        margin: 0 auto;
        box-shadow: 0 0 20px rgb(0 0 0 / 8%);
      "
      v-if="block"
    >
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h6">Block overview</div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-list bordered class="rounded-borders">
          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Block Height:</q-item-label>
            </q-item-section>

            <q-item-section>
              {{ block.header.height }}
            </q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Block ID:</q-item-label>
            </q-item-section>

            <q-item-section>
              {{ block.id }}
            </q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Timestamp</q-item-label>
            </q-item-section>
            <q-item-section
              >19 secs ago (May-18-2022 05:34:03 PM +UTC)</q-item-section
            >
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Transactions</q-item-label>
            </q-item-section>
            <q-item-section>
              <div>
                <q-btn
                  :to="`/blocks/${height}/transactions`"
                  flat
                  class="q-pa-none"
                  style="min-height: auto"
                >
                  <q-badge color="secondary" text-color="black"
                    >{{ block.transactionCount }} transaction
                    {{ block.transactionCount > 1 ? 's' : '' }}</q-badge
                  >
                </q-btn>

                and 4 contract internal transactions in this block
              </div>
            </q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Produced by:</q-item-label>
            </q-item-section>
            <q-item-section
              ><address-link :address="block.reward.producerId" />
            </q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Block Reward:</q-item-label>
            </q-item-section>
            <q-item-section>
              {{ block.reward.value }} {{ block.reward.contractId }}
            </q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Size:</q-item-label>
            </q-item-section>
            <q-item-section>12,257 bytes</q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Mana Used:</q-item-label>
            </q-item-section>
            <q-item-section>12,257 bytes</q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Disk Storage Used:</q-item-label>
            </q-item-section>
            <q-item-section>
              {{ block.receipt.diskStorageUsed }}
            </q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Network Bandwidth Used:</q-item-label>
            </q-item-section>
            <q-item-section>
              {{ block.receipt.networkBandwidthUsed }}
            </q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Compute Bandwidth Used:</q-item-label>
            </q-item-section>
            <q-item-section>
              {{ block.receipt.computeBandwidthUsed }}
            </q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Events:</q-item-label>
            </q-item-section>
            <q-item-section>
              {{ block.receipt.eventCount }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import gql from 'graphql-tag';
import { useAccountStore } from 'stores/account';
import { Block } from '@koiner/chain/block/block';
import { ApolloClient } from '@apollo/client/core';
import { useApolloClient } from '@vue/apollo-composable';
import AddressLink from '@koiner/chain/address/AddressLink.vue';

const gqlGetBlock = gql`
  query getBlock($height: ID!) {
    block(height: $height) {
      header {
        height
        previous
        previousStateMerkleRoot
        signer
        timestamp
        transactionMerkleRoot
      }
      receipt {
        diskStorageUsed
        networkBandwidthUsed
        computeBandwidthUsed
        eventCount
      }
      reward {
        producerId
        value
        contractId
      }
      id
      signature
      transactionCount
      createdAt
      updatedAt
    }
  }
`;

export default defineComponent({
  name: 'BlockPage',
  components: { AddressLink },
  setup() {
    let height: Ref<string | string[] | undefined> = ref();
    const route = useRoute();
    const account = useAccountStore();
    const block: Ref<Block | undefined> = ref();

    const apolloClient: ApolloClient<any> = useApolloClient().client;

    const executeQuery = () => {
      apolloClient
        .query({
          query: gqlGetBlock,
          variables: {
            height: height.value,
          },
        })
        .then((response: any) => {
          const data = response.data.block;

          block.value = {
            id: data.id,
            header: {
              height: data.header.height,
              previous: data.header.previous,
              previousStateMerkleRoot: data.header.previousStateMerkleRoot,
              signer: data.header.signer,
              timestamp: data.header.timestamp,
              transactionMerkleRoot: data.header.transactionMerkleRoot,
            },
            receipt: {
              diskStorageUsed: data.receipt.diskStorageUsed,
              networkBandwidthUsed: data.receipt.networkBandwidthUsed,
              computeBandwidthUsed: data.receipt.computeBandwidthUsed,
              eventCount: data.receipt.eventCount,
            },
            signature: data.signature,
            transactionCount: data.transactionCount,
            reward: {
              producerId: data.reward.producerId,
              value: data.reward.value,
              contractId: data.reward.contractId,
            },
          } as Block;
        });
    };

    onMounted(async () => {
      height.value = route.params.height;
      executeQuery();
    });

    watch(
      () => route.params.height,
      async (newHeight) => {
        block.value = undefined;
        height.value = newHeight;
        executeQuery();
      }
    );

    return {
      height,
      account,
      block,
    };
  },
});
</script>
