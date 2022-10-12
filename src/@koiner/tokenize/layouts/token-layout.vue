<template>
  <div class="koiner-topbar fixed-top" v-if="id">
    <q-icon class="topbar-icon" name="toll"></q-icon>
    <div class="topbar-header">
      <span class="selected-item" v-if="tokenContract"
        >{{ tokenContract.name
        }}<q-chip>{{ tokenContract.symbol }}</q-chip></span
      ><span v-else class="selected-item">Token</span>

      <bookmark-component
        :item="{ id, type: 'token' }"
        list-id="tokens"
        item-translation="koiner.tokenize.item.token"
      />
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="Overview"
          :to="`/tokens/${id}`"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Events"
          :to="`/tokens/${id}/events`"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Operations"
          :to="`/tokens/${id}/operations`"
          exact
        />
        <q-route-tab
          :ripple="false"
          label="Holders"
          :to="`/tokens/${id}/holders`"
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
import { TokenContract } from '@koiner/sdk';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';

export default defineComponent({
  name: 'TokensLayout',
  components: { BookmarkComponent },
  setup() {
    let id: Ref<string | undefined> = ref();
    const route = useRoute();
    const tokenContract: Ref<TokenContract | undefined> = ref();

    // const executeQuery = () => {
    //
    // };

    onMounted(async () => {
      id.value = route.params.id ? route.params.id.toString() : undefined;
      // executeQuery();
    });

    return {
      id,
      tokenContract,
    };
  },
});
</script>
