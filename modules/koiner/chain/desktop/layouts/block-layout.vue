<template>
  <div class="koiner-topbar fixed-top" v-if="height">
    <q-icon class="topbar-icon" name="account_balance_wallet"></q-icon>
    <div class="topbar-header">
      <span class="selected-item">Block #{{ height }}</span>

      <bookmark-component
        :item="{ id: height.toString(), type: 'block' }"
        item-translation="koiner.chain.item.block"
      />

      <hotkey-navigator
        v-if="height && false"
        :current="height.toString()"
        :back="backLink"
        :previous="previousLink"
        :next="nextLink"
        :previous-tab="previousTab"
        :next-tab="nextTab"
      />
    </div>

    <div class="topbar-navigation">
      <q-tabs dense align="left" style="width: 100%">
        <q-route-tab
          :ripple="false"
          label="Overview"
          :to="`/blocks/${height}`"
          exact
        />
      </q-tabs>
    </div>
  </div>

  <router-view class="koiner-topbar-page" />
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue';
import { useAccountStore } from 'stores/account';
import { RouteLocationRaw, useRoute } from 'vue-router';
import HotkeyNavigator from 'src/components/hotkey-navigator.vue';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';

export default defineComponent({
  name: 'BlockLayout',
  components: { BookmarkComponent, HotkeyNavigator },
  setup() {
    const tabs = ['block', 'block.transactions', 'block.operations'];

    const route = useRoute();
    const account = useAccountStore();

    let currentPage: Ref<string | undefined> = ref();
    let height: Ref<number | undefined> = ref();
    let backLink: Ref<RouteLocationRaw | undefined> = ref();
    let previousLink: Ref<RouteLocationRaw | undefined> = ref();
    let nextLink: Ref<RouteLocationRaw | undefined> = ref();
    let previousTab: Ref<RouteLocationRaw | undefined> = ref();
    let nextTab: Ref<RouteLocationRaw | undefined> = ref();

    const updateLinks = () => {
      // We need a minimal delay when updating the links otherwise multiple reroutes will occur
      setTimeout(() => {
        if (height.value) {
          // Reset links first
          backLink.value = undefined;
          previousLink.value = undefined;
          nextLink.value = undefined;
          previousTab.value = undefined;
          nextTab.value = undefined;

          if (height.value > 0) {
            previousLink.value = {
              name: 'block',
              params: { height: height.value - 1 },
            };
          }

          nextLink.value = {
            name: 'block',
            params: { height: height.value + 1 },
          };

          const currentTabIndex = tabs.findIndex(
            (tabIndex) => tabIndex === currentPage.value
          );

          // Only available when not first tab
          if (currentTabIndex > 0) {
            previousTab.value = {
              name: tabs[currentTabIndex - 1],
              params: { height: height.value },
            };
          }

          // Only available when not last tab
          if (currentTabIndex < tabs.length - 1) {
            nextTab.value = {
              name: tabs[currentTabIndex + 1],
              params: { height: height.value },
            };
          }
        }
      }, 250);
    };

    onMounted(async () => {
      if (route.name) {
        currentPage.value = route.name.toString();
      }

      if (route.params.height) {
        height.value = parseInt(route.params.height.toString());
        updateLinks();
      }
    });

    watch(
      () => route.params.height,
      async (newHeight) => {
        height.value = newHeight ? parseInt(newHeight.toString()) : undefined;
        updateLinks();
      }
    );

    watch(
      () => route.name,
      async (newName) => {
        if (newName) {
          currentPage.value = newName.toString();
        }
        updateLinks();
      }
    );

    return {
      height,
      account,

      backLink,
      previousLink,
      nextLink,
      previousTab,
      nextTab,
    };
  },
});
</script>
