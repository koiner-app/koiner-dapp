<template>
  <div class="koiner-topbar fixed-top" v-if="id">
    <q-icon class="topbar-icon" name="toll"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">Contract {{ id }}</span>

      <bookmark-component
        :item="{ id, type: 'contract' }"
        item-translation="koiner.contracts.item.contract"
      />
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="Operations"
          :to="{ name: 'contract.operations', params: { id } }"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Events"
          :to="{ name: 'contract.events', params: { id } }"
          exact
        />
      </q-tabs>
    </div>
  </div>

  <router-view class="koiner-topbar-page" />
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';

export default defineComponent({
  name: 'ContractLayout',
  components: { BookmarkComponent },
  setup() {
    let id: Ref<string | undefined> = ref();
    const route = useRoute();

    onMounted(async () => {
      id.value = route.params.id ? route.params.id.toString() : undefined;
    });

    return {
      id,
    };
  },
});
</script>
