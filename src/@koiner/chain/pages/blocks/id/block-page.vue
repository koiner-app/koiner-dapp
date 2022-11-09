<template>
  <q-page class="row items-baseline justify-evenly" style="padding-top: 8rem">
    <q-card class="table-card shadow-1" v-if="block">
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

          <q-item v-if="block.reward">
            <q-item-section>
              <q-item-label> Producer </q-item-label>
            </q-item-section>
            <q-item-section>
              <span>
                {{ tokenAmount(block.reward?.value, 8) }}
                <router-link
                  :to="{
                    name: 'token',
                    params: { id: koinerStore.koinContract.id },
                  }"
                >
                  <span>
                    tKOIN
                    <q-tooltip :delay="500">Test Koinos</q-tooltip>
                  </span>
                </router-link>
              </span>
              <span>
                {{ tokenAmount(block.reward?.burnedValue, 8) }}
                <router-link
                  :to="{
                    name: 'token',
                    params: { id: koinerStore.vhpContract.id },
                  }"
                >
                  <span>
                    VHP
                    <q-tooltip :delay="500">Virtual Hash Power</q-tooltip>
                  </span>
                </router-link>
              </span>
              <router-link
                :to="{
                  name: 'address',
                  params: { id: block.reward.producerId },
                }"
              >
                {{ block.reward?.producerId }}
              </router-link>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Transactions</q-item-label>
            </q-item-section>
            <q-item-section>
              <div v-if="block.transactionCount > 0">
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
              <div v-else>
                <q-badge color="grey" text-color="black"
                  >No transactions</q-badge
                >
              </div>
            </q-item-section>
          </q-item>

          <q-separator v-if="block.reward" inset="item" />

          <q-item v-if="block.reward">
            <q-item-section class="col-2 gt-sm">
              <q-item-label>Produced by:</q-item-label>
            </q-item-section>
            <q-item-section
              ><address-link :address="block.reward.producerId" />
            </q-item-section>
          </q-item>

          <q-separator v-if="block.reward" inset="item" />

          <q-item v-if="block.reward">
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
import { defineComponent, ref, Ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ItemState } from '@appvise/search-manager';
import { Block, useBlockPageQuery } from '@koiner/sdk';
import { tokenAmount } from '@koiner/utils';
import AddressLink from '@koiner/chain/components/address/address-link.vue';
import { useKoinerStore } from 'stores/koiner';

export default defineComponent({
  name: 'BlockPage',
  components: { AddressLink },
  setup() {
    const koinerStore = useKoinerStore();

    let height: Ref<string | string[] | undefined> = ref();
    const itemState = ItemState.create<Block>();
    const variables: Ref<{ height: string }> = ref({ height: '' });
    const route = useRoute();

    // const account = useAccountStore();
    // const block: Ref<Block | undefined> = ref();

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useBlockPageQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.block as Block;
      });

      itemState.error = error;
      itemState.fetching = fetching;
      itemState.isPaused = isPaused;
    };

    variables.value.height = route.params.height.toString();

    executeQuery();

    // Workaround to reactivate urql to resume on a re-entering of page
    // TODO: Find out why this is necessary
    itemState.isPaused.value = true;
    itemState.isPaused.value = false;

    watch(
      () => route.params.height,
      async (newHeight) => {
        itemState.isPaused.value = !newHeight;
        variables.value.height = newHeight ? newHeight.toString() : '';
      }
    );

    return {
      koinerStore,
      tokenAmount,
      itemState,
      block: itemState.item,
      error: itemState.error,
    };

    //
    // watch(
    //   () => route.params.height,
    //   async (newHeight) => {
    //     block.value = undefined;
    //     height.value = newHeight;
    //     executeQuery();
    //   }
    // );

    // return {
    //   height,
    //   // account,
    //   // block,
    // };
  },
});
</script>
