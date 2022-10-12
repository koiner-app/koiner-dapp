<template>
  <div class="koiner-topbar fixed-top" v-if="id">
    <q-icon class="topbar-icon" name="account_balance_wallet"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">{{ id }}</span>

      <bookmark-component
        :item="{ id, type: 'address' }"
        list-id="addresses"
        item-translation="koiner.chain.item.address"
      />
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="Overview"
          :to="{ name: 'address', params: { id } }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="History"
          :to="{ name: 'address.history', params: { id } }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Rewards"
          :to="{ name: 'address.rewards', params: { id } }"
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
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';

export default defineComponent({
  name: 'AddressLayout',
  components: { BookmarkComponent },
  setup() {
    let id: Ref<string | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id ? route.params.id.toString() : undefined;
    });

    watch(
      () => route.params.id,
      async (newId) => {
        id.value = newId ? newId.toString() : undefined;
      }
    );

    return {
      id,
    };
  },
});
</script>
