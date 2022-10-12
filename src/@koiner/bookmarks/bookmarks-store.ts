// @ts-check
import { defineStore } from 'pinia';

export interface BookmarkedItem {
  id: string;
  type?: string;
  [key: string]: any;
}

export interface Bookmark {
  id: string;
  type: string;
  item?: BookmarkedItem;
}

export interface BookmarkList {
  name: string;
  bookmarks: Map<string, Bookmark>;
}

export interface BookmarksState {
  activeList: string;
  lists: Map<string, BookmarkList>;
}

export const useBookmarkStore = defineStore({
  id: 'bookmarks',
  // persist: true,
  state: () => ({
    activeList: 'main' as string,
    lists: new Map<string, BookmarkList>([
      [
        'addresses',
        {
          name: 'Address list',
          bookmarks: new Map<string, Bookmark>(),
        } as BookmarkList,
      ],
      [
        'tokens',
        {
          name: 'Tokens watchlist',
          bookmarks: new Map<string, Bookmark>(),
        } as BookmarkList,
      ],
      [
        'main',
        {
          name: 'Main list',
          bookmarks: new Map<string, Bookmark>(),
        } as BookmarkList,
      ],
    ]),
  }),
  persist: {
    serializer: {
      serialize: (input) => {
        const data = input as BookmarksState;

        const lists: Array<{ key: string; value: any }> = [];

        data.lists.forEach((list, listId) => {
          const bookmarks: Array<{ key: string; value: any }> = [];

          list.bookmarks.forEach((bookmark, bookmarkId) => {
            bookmarks.push({
              key: bookmarkId,
              value: {
                id: bookmark.id,
                type: bookmark.type,
                item: bookmark.item,
              },
            });
          });

          lists.push({
            key: listId,
            value: {
              name: list.name,
              bookmarks,
            },
          });
        });

        const output = {
          activeList: data.activeList,
          lists,
        };

        return JSON.stringify(output);
      },
      deserialize: (input) => {
        const output = JSON.parse(input);
        const listKVArray: Array<[string, BookmarkList]> = [];

        if (Array.isArray(output.lists)) {
          // Create map for lists
          for (let i = 0; i < output.lists.length; i++) {
            const listKV: { key: string; value: any } = output.lists[i];

            // Create map for bookmarks of list
            const bookmarksKVArray: Array<[string, Bookmark]> = [];

            for (let j = 0; j < listKV.value.bookmarks.length; j++) {
              const bookmarkKV: { key: string; value: any } =
                listKV.value.bookmarks[j];

              bookmarksKVArray.push([
                bookmarkKV.key as string,
                bookmarkKV.value as Bookmark,
              ]);
            }

            const bookmarkList: BookmarkList = {
              name: listKV.value.name,
              bookmarks: new Map<string, Bookmark>(bookmarksKVArray),
            };

            listKVArray.push([listKV.key as string, bookmarkList]);
          }
        }

        output.lists = new Map<string, BookmarkList>(listKVArray);

        return output;
      },
    },
  },

  getters: {
    list: (state) => {
      return (listId?: string) => state.lists.get(listId ?? state.activeList);
    },
    hasList: (state) => {
      return (listId: string) => state.lists.has(listId);
    },
    hasBookmark: (state) => {
      return (id: string, listId?: string) => {
        const list = state.lists.get(listId ?? state.activeList);

        return list && list.bookmarks.has(id);
      };
    },
    bookmark: (state) => {
      return (id: string, listId?: string) => {
        const list = state.lists.get(listId ?? state.activeList);

        return list ? list.bookmarks.get(id) : undefined;
      };
    },
    bookmarks: (state) => {
      return (listId?: string) => {
        const list = state.lists.get(listId ?? state.activeList);
        return list ? [...list?.bookmarks.values()] : [];
      };
    },
    bookmarkKeys: (state) => {
      return (listId?: string) => {
        const list = state.lists.get(listId ?? state.activeList);
        return list ? [...list?.bookmarks.keys()] : [];
      };
    },
  },

  actions: {
    addBookmark(bookmarkedItem: BookmarkedItem, listId?: string) {
      const list = this.list(listId);

      if (list) {
        list.bookmarks.set(bookmarkedItem.id, {
          id: bookmarkedItem.id,
          type: typeof bookmarkedItem,
          item: bookmarkedItem,
        });
      }
    },

    removeBookmark(id: string, listId?: string) {
      const list = this.list(listId);

      if (list && list.bookmarks.has(id)) {
        list.bookmarks.delete(id);
      }
    },

    resetList(listId: string) {
      const list = this.list(listId);

      if (list) {
        list.bookmarks.clear();
      }
    },

    reset() {
      this.$patch({
        activeList: 'main',
        lists: new Map<string, BookmarkList>([
          [
            'addresses',
            {
              name: 'Address list',
              bookmarks: new Map<string, Bookmark>(),
            } as BookmarkList,
          ],
          [
            'tokens',
            {
              name: 'Tokens watchlist',
              bookmarks: new Map<string, Bookmark>(),
            } as BookmarkList,
          ],
          [
            'main',
            {
              name: 'Main list',
              bookmarks: new Map<string, Bookmark>(),
            } as BookmarkList,
          ],
        ]),
      });
    },
  },
});
