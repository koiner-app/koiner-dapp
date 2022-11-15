// @ts-check
import { defineStore } from 'pinia';
import { Dialog } from 'quasar';

export interface BookmarkedItem {
  id: string;
  type: string;
  [key: string]: any;
}

export interface Bookmark {
  id: string;
  type: string;
  item?: BookmarkedItem;
  timestamp: number;
}

export interface BookmarkList {
  name: string;
  bookmarks: Map<string, Bookmark>;
}

export interface BookmarksState {
  production: {
    activeList: string;
    lists: Map<string, BookmarkList>;
  };
  test: {
    activeList: string;
    lists: Map<string, BookmarkList>;
  };
  local: {
    activeList: string;
    lists: Map<string, BookmarkList>;
  };
}

enum Environment {
  production = 'production',
  test = 'test',
  local = 'local',
}

export const useBookmarkStore = defineStore({
  id: 'bookmarks',
  state: () => ({
    environment: 'production' as 'production' | 'test' | 'local',
    production: {
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
    },
    test: {
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
    },
    local: {
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
    },
  }),
  persist: {
    serializer: {
      serialize: (input) => {
        const data = input as BookmarksState;

        const output = {
          production: {},
          test: {},
          local: {},
        };

        for (const [, environment] of Object.entries(Environment)) {
          const lists: Array<{ key: string; value: any }> = [];

          data[environment].lists.forEach((list, listId) => {
            const bookmarks: Array<{ key: string; value: any }> = [];

            list.bookmarks.forEach((bookmark, bookmarkId) => {
              bookmarks.push({
                key: bookmarkId,
                value: {
                  id: bookmark.id,
                  type: bookmark.type,
                  item: bookmark.item,
                  timestamp: bookmark.timestamp,
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

          output[environment] = {
            activeList: data[environment].activeList,
            lists,
          };
        }

        return JSON.stringify(output);
      },
      deserialize: (input) => {
        const output = JSON.parse(input);

        for (const [, environment] of Object.entries(Environment)) {
          const listKVArray: Array<[string, BookmarkList]> = [];

          if (Array.isArray(output[environment].lists)) {
            // Create map for lists
            for (let i = 0; i < output[environment].lists.length; i++) {
              const listKV: { key: string; value: any } =
                output[environment].lists[i];

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

          output[environment].lists = new Map<string, BookmarkList>(
            listKVArray
          );
        }

        return output;
      },
    },
  },

  getters: {
    list: (state) => {
      return (listId?: string) =>
        state[state.environment].lists.get(
          listId ?? state[state.environment].activeList
        );
    },
    hasList: (state) => {
      return (listId: string) => state[state.environment].lists.has(listId);
    },
    hasBookmark: (state) => {
      return (id: string, listId?: string) => {
        const list = state[state.environment].lists.get(
          listId ?? state[state.environment].activeList
        );

        return list && list.bookmarks.has(id);
      };
    },
    bookmark: (state) => {
      return (id: string, listId?: string) => {
        const list = state[state.environment].lists.get(
          listId ?? state[state.environment].activeList
        );

        return list ? list.bookmarks.get(id) : undefined;
      };
    },
    bookmarks: (state) => {
      return (listId?: string) => {
        const list = state[state.environment].lists.get(
          listId ?? state[state.environment].activeList
        );
        return list ? [...list?.bookmarks.values()] : [];
      };
    },
    bookmarkKeys: (state) => {
      return (listId?: string) => {
        const list = state[state.environment].lists.get(
          listId ?? state[state.environment].activeList
        );
        return list ? [...list?.bookmarks.keys()] : [];
      };
    },
  },

  actions: {
    load(environment: 'production' | 'test' | 'local') {
      this.$patch({
        environment: environment,
      });
    },

    addBookmark(bookmarkedItem: BookmarkedItem, listId?: string) {
      const list = this.list(listId);

      if (list) {
        if (listId?.includes('addresses') && list.bookmarks.size === 10) {
          Dialog.create({
            title: 'Max reached',
            message: 'You have reached the maximum amount of 10 addresses',
            cancel: false,
            ok: {
              color: 'primary',
            },
            persistent: true,
          });
        } else {
          list.bookmarks.set(bookmarkedItem.id, {
            id: bookmarkedItem.id,
            type: bookmarkedItem.type,
            item: bookmarkedItem,
            timestamp: Date.now(),
          });
        }
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
        environment: 'production',
        production: {
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
        },
        test: {
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
        },
        local: {
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
        },
      });
    },
  },
});
