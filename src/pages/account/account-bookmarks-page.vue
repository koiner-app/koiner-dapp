<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <q-card class="transactions-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Bookmarks</div>

        <bookmark-component
          v-for="bookmark in mainBookmarks"
          :key="bookmark.id"
          :item="{ id: bookmark.id, type: bookmark.type }"
          list-id="main"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn @click="bookmarkStore.resetList('main')">Reset</q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="blocks-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="text-overline">Addresses</div>

        <bookmark-component
          v-for="bookmark in addressBookmarks"
          :key="bookmark.id"
          :item="{ id: bookmark.id, type: bookmark.type }"
          list-id="addresses"
          item-translation="koiner.chain.item.address"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn @click="bookmarkStore.resetList">Reset</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';
import { useBookmarkStore } from '@koiner/bookmarks';

export default defineComponent({
  name: 'AccountBookmarksPage',
  components: { BookmarkComponent },

  setup() {
    const bookmarkStore = useBookmarkStore();

    return {
      bookmarkStore,
      list: bookmarkStore.list,

      addressBookmarks: computed(() => {
        return bookmarkStore.bookmarks('addresses');
      }),
      mainBookmarks: computed(() => {
        return bookmarkStore.bookmarks('main');
      }),
    };
  },
});
</script>
