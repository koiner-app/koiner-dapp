<template>
  <div class="koiner-topbar fixed-top" v-if="id">
    <q-icon class="topbar-icon" name="account_balance_wallet"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">Transaction details</span>

      <bookmark-component
        :item="{ id, type: 'transaction' }"
        item-translation="koiner.chain.item.transaction"
      />
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="Details"
          :to="`/transactions/${id}`"
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
  name: 'TransactionLayout',
  components: { BookmarkComponent },
  setup() {
    const route = useRoute();

    let currentPage: Ref<string | undefined> = ref();
    let id: Ref<string | undefined> = ref();

    onMounted(async () => {
      if (route.name) {
        currentPage.value = route.name.toString();
      }

      if (route.params.id) {
        id.value = route.params.id.toString();
      }
    });

    watch(
      () => route.params.id,
      async (newId) => {
        id.value = newId ? newId.toString() : undefined;
      }
    );

    watch(
      () => route.name,
      async (newName) => {
        if (newName) {
          currentPage.value = newName.toString();
        }
      }
    );

    return {
      id,
    };
  },
});
</script>
