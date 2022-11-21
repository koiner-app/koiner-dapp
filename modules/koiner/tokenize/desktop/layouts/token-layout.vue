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

  <router-view class="koiner-topbar-page" />
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { TokenContract, useTokenLayoutQuery } from '@koiner/sdk';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';
import { ItemState } from '@appvise/search-manager';

export default defineComponent({
  name: 'TokenLayout',
  components: { BookmarkComponent },
  setup() {
    const itemState = ItemState.create<TokenContract>();
    const variables: Ref<{ id: string }> = ref({ id: '' });
    const route = useRoute();

    const executeQuery = () => {
      const { data, fetching, error, isPaused } = useTokenLayoutQuery({
        variables,
      });

      watch(data, (updatedData) => {
        itemState.item.value = updatedData?.tokenContract as TokenContract;
      });

      itemState.error = error;
      itemState.fetching = fetching;
      itemState.isPaused = isPaused;
    };

    onMounted(async () => {
      variables.value.id = route.params.id.toString();
      executeQuery();
      itemState.isPaused.value = true;
      itemState.isPaused.value = false;
    });

    watch(
      () => route.params.id,
      async (newId) => {
        itemState.isPaused.value = !newId;
        variables.value.id = newId ? newId.toString() : '';
      }
    );

    return {
      itemState,
      tokenContract: itemState.item,
      error: itemState.error,
      executeQuery,
    };
  },
});
</script>
