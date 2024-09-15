<template>
  <div class="koiner-topbar fixed-top" v-if="address">
    <q-icon class="topbar-icon" name="account_balance_wallet"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">{{ getContractName(address.id, '') }}</span>

      <copy-to-clipboard
        :source="address.id"
        :show-source="false"
        :tooltip="'Copy address to clipboard'"
        icon-size="0.875rem"
        button-class="q-ml-sm"
        :button-style="'min-width: 2rem; min-height: 2rem; margin-top: -0.25rem'"
      />
      <bookmark-component
        :item="{ id: address.id, type: 'address' }"
        list-id="addresses"
        item-translation="koiner.chain.item.address"
      />
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="Overview"
          :to="{ name: 'address', params: { id: address.id } }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="History"
          :to="{ name: 'address.history', params: { id: address.id } }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Rewards"
          :to="{ name: 'address.rewards', params: { id: address.id } }"
          exact
        />
      </q-tabs>
    </div>
  </div>

  <router-view v-if="address" :address="address" class="koiner-topbar-page" />

  <error-view :error="itemState.error" />
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';
import { ItemState } from '@appvise/search-manager';
import { Address, useAddressLayoutQuery } from '@koiner/sdk';
import ErrorView from 'components/error-view.vue';
import { getContractName } from '@koiner/contracts/components/contract';
import CopyToClipboard from '@koiner/components/copy-to-clipboard.vue';

export default defineComponent({
  name: 'AddressLayout',
  methods: { getContractName },
  components: { CopyToClipboard, ErrorView, BookmarkComponent },
  setup() {
    const route = useRoute();

    const itemState = ItemState.create<Address>();
    const variables: Ref<{ id: string }> = ref({ id: '' });

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useAddressLayoutQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.address as Address;
      });

      watch(error, (updatedError) => {
        itemState.error.value = updatedError;
      });

      itemState.fetching = fetching;
      itemState.isPaused = isPaused;
    };

    onMounted(async () => {
      variables.value.id = route.params.id.toString();
      executeQuery();
    });

    watch(
      () => route.params.id,
      async (newId) => {
        variables.value.id = newId ? newId.toString() : '';
      }
    );

    return {
      itemState,
      address: itemState.item,
      error: itemState.error,
    };
  },
});
</script>
