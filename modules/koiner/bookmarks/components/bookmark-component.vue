<template>
  <q-btn flat dense size="sm" class="favorite-icon">
    <q-icon
      v-if="hasBookmark(item.id, listId)"
      @click.capture.stop="removeBookmark(item.id, listId)"
      :name="iconDelete"
      class="delete-icon"
    >
      <q-tooltip class="bg-primary" :offset="[0, 0]"
        >Remove {{ itemTranslation ? t(itemTranslation) : 'item' }} from
        bookmarks</q-tooltip
      >
    </q-icon>
    <q-icon
      v-else
      @click.capture.stop="addBookmark(item, listId)"
      :name="iconAdd"
    >
      <q-tooltip class="bg-primary" :offset="[0, 0]"
        >Bookmark this
        {{ itemTranslation ? t(itemTranslation) : 'item' }}</q-tooltip
      >
    </q-icon>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BookmarkedItem, useBookmarkStore } from '@koiner/bookmarks';
import { useI18n } from 'vue-i18n';
import posthog from 'posthog-js';

export default defineComponent({
  name: 'BookmarkComponent',
  props: {
    item: {
      required: true,
      type: Object as PropType<BookmarkedItem>,
    },
    listId: {
      required: false,
      type: String,
    },
    itemTranslation: {
      required: false,
      type: String,
    },
    iconAdd: {
      required: false,
      type: String,
      default: 'star_border',
    },
    iconDelete: {
      required: false,
      type: String,
      default: 'star',
    },
  },
  setup() {
    const t = useI18n().t;
    const bookmarkStore = useBookmarkStore();

    return {
      t,
      bookmarkStore,
      hasBookmark: bookmarkStore.hasBookmark,
      bookmark: bookmarkStore.bookmark,
      addBookmark: (item: BookmarkedItem, listId?: string) => {
        bookmarkStore.addBookmark(item, listId);
        posthog.capture('addBookmark', {
          property: item.id,
          type: item.type,
          listId,
        });
      },
      removeBookmark: (itemId: string, listId?: string) => {
        bookmarkStore.removeBookmark(itemId, listId);
        posthog.capture('removeBookmark', { property: itemId, listId });
      },
    };
  },
});
</script>
