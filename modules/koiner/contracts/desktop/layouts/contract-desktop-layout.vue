<template>
  <div class="koiner-topbar fixed-top" v-if="contract">
    <q-icon class="topbar-icon" name="toll"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">Contract {{ contract.id }}</span>

      <bookmark-component
        :item="{ id: contract.id, type: 'contract' }"
        item-translation="koiner.contracts.item.contract"
      />
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="Operations"
          :to="{ name: 'contract.operations', params: { id: contract.id } }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Events"
          :to="{ name: 'contract.events', params: { id: contract.id } }"
          exact
        />
      </q-tabs>
    </div>
  </div>

  <router-view
    v-if="contract"
    :contract="contract"
    class="koiner-topbar-page"
  />

  <error-view :error="itemState.error" />
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';
import { ItemState } from '@appvise/search-manager';
import { Contract, useContractQuery } from '@koiner/sdk';
import ErrorView from 'components/error-view.vue';

export default defineComponent({
  name: 'ContractLayout',
  components: { ErrorView, BookmarkComponent },
  setup() {
    const route = useRoute();

    const itemState = ItemState.create<Contract>();
    const variables: Ref<{ id: string }> = ref({ id: '' });

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useContractQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.contract as Contract;
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
      contract: itemState.item,
      error: itemState.error,
    };
  },
});
</script>
