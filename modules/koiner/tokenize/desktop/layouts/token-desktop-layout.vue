<template>
  <div class="koiner-topbar fixed-top" v-if="tokenContract">
    <q-icon class="topbar-icon" name="toll"></q-icon>
    <div class="topbar-header">
      <span class="selected-item"
        >{{ tokenContract.name
        }}<q-chip xs>{{ tokenContract.symbol }}</q-chip></span
      >
      <bookmark-component
        :item="{ ...tokenContract, type: 'token' }"
        list-id="tokens"
        item-translation="koiner.tokenize.item.token"
      />
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="Overview"
          :to="`/tokens/${tokenContract.id}`"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Operations"
          :to="`/tokens/${tokenContract.id}/operations`"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Events"
          :to="`/tokens/${tokenContract.id}/events`"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Holders"
          :to="`/tokens/${tokenContract.id}/holders`"
          exact
        />
      </q-tabs>
    </div>
  </div>

  <router-view
    v-if="tokenContract"
    :token-contract="tokenContract"
    class="koiner-topbar-page"
  />

  <error-view :error="itemState.error" />
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { TokenContract, useTokenDesktopLayoutQuery } from '@koiner/sdk';
import { ItemState } from '@appvise/search-manager';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';
import ErrorView from 'components/error-view.vue';

export default defineComponent({
  name: 'TokenLayout',
  components: { ErrorView, BookmarkComponent },
  setup() {
    const route = useRoute();

    const itemState = ItemState.create<TokenContract>();
    const variables: Ref<{ id: string }> = ref({ id: '' });

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useTokenDesktopLayoutQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.tokenContract as TokenContract;
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
      tokenContract: itemState.item,
      error: itemState.error,
    };
  },
});
</script>
