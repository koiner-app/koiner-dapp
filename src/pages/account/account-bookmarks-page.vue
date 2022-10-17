<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <div class="q-pa-md full-width">
      <div class="row">
        <div class="col-9 q-pr-lg">
          <q-card flat bordered>
            <q-card-section class="q-pt-xs">
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-overline">Bookmarks</div>
                </div>

                <div class="col-auto">
                  <q-btn color="grey-7" round flat icon="more_vert">
                    <q-menu auto-close self="top left">
                      <q-list>
                        <q-item
                          clickable
                          @click="bookmarkStore.resetList('main')"
                        >
                          <q-item-section class="text-red-3 text-bold">
                            Reset list
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
              <q-list>
                <q-item
                  v-for="bookmark in mainBookmarks"
                  :key="bookmark.id"
                  :to="bookmarkLink(bookmark)"
                >
                  <q-item-section>
                    <q-item-label>{{ bookmark.id }}</q-item-label>
                    <q-item-label caption lines="2">
                      {{ bookmark.type }} -
                      {{ timeAgo(bookmark.timestamp) }}
                      <q-tooltip>
                        {{
                          date.formatDate(
                            bookmark.timestamp,
                            'YYYY-MM-DD HH:mm:ss.SSSZ'
                          )
                        }}
                      </q-tooltip>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <bookmark-component
                      :item="{ id: bookmark.id, type: bookmark.type }"
                      list-id="main"
                      icon-delete="close"
                    />
                  </q-item-section>
                </q-item>

                <q-separator spaced inset />
              </q-list>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-3">
          <q-card flat bordered class="q-mb-lg">
            <q-card-section class="q-pt-xs">
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-overline">My Addresses</div>
                </div>

                <div class="col-auto">
                  <q-btn color="grey-7" round flat icon="more_vert">
                    <q-menu auto-close self="top left">
                      <q-list>
                        <q-item
                          clickable
                          @click="bookmarkStore.resetList('addresses')"
                        >
                          <q-item-section class="text-red-3 text-bold">
                            Reset addresses
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
              <q-list>
                <q-item
                  v-for="bookmark in addressBookmarks"
                  :key="bookmark.id"
                  :to="{ name: 'address', params: { id: bookmark.item.id } }"
                >
                  <q-item-section>
                    <q-item-label>{{ bookmark.id }}</q-item-label>
                    <q-item-label caption lines="2">
                      <q-item-label caption>
                        {{ timeAgo(bookmark.timestamp) }}
                        <q-tooltip>
                          {{
                            date.formatDate(
                              bookmark.timestamp,
                              'YYYY-MM-DD HH:mm:ss.SSSZ'
                            )
                          }}
                        </q-tooltip>
                      </q-item-label>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side top>
                    <bookmark-component
                      :item="{ id: bookmark.id, type: bookmark.type }"
                      list-id="addresses"
                      item-translation="koiner.chain.item.address"
                      icon-delete="close"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>

          <q-card flat bordered class="q-mb-lg">
            <q-card-section class="q-pt-xs">
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-overline">Token watchlist</div>
                </div>

                <div class="col-auto">
                  <q-btn color="grey-7" round flat icon="more_vert">
                    <q-menu auto-close self="top left">
                      <q-list>
                        <q-item
                          clickable
                          @click="bookmarkStore.resetList('tokens')"
                        >
                          <q-item-section class="text-red-3 text-bold">
                            Reset watchlist
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>

              <q-list>
                <q-item
                  v-for="bookmark in tokenBookmarks"
                  :key="bookmark.id"
                  :to="{ name: 'token', params: { id: bookmark.item.id } }"
                >
                  <q-item-section>
                    <q-item-label
                      >{{ bookmark.item.name
                      }}<q-chip dense square size="sm" class="q-ml-sm">{{
                        bookmark.item.symbol
                      }}</q-chip></q-item-label
                    >
                  </q-item-section>
                  <q-item-section side top>
                    <bookmark-component
                      :item="{ id: bookmark.id, type: bookmark.type }"
                      list-id="tokens"
                      item-translation="koiner.chain.item.token"
                      icon-delete="close"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>

          <q-card flat bordered class="q-mb-lg">
            <q-card-section class="q-pt-xs">
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-overline text-red text-bold">
                    Danger zone
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-actions class="q-pa-md">
              <q-btn @click="confirmReset" color="red" outline
                >Reset ALL lists</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';
import { BookmarkedItem, useBookmarkStore } from '@koiner/bookmarks';
import { timeAgo } from '@appvise/jsonsearch-quasar';
import { date, useQuasar } from 'quasar';

export default defineComponent({
  name: 'AccountBookmarksPage',
  components: { BookmarkComponent },

  setup() {
    const $q = useQuasar();
    const bookmarkStore = useBookmarkStore();

    const confirmReset = () => {
      $q.dialog({
        title: 'Confirm',
        message: 'All bookmark lists will be deleted. Are you sure?',
        cancel: {
          flat: true,
        },
        ok: {
          color: 'red',
        },
        persistent: true,
      })
        .onOk(() => {
          bookmarkStore.reset()
        });
    };

    return {
      bookmarkStore,
      list: bookmarkStore.list,
      addressBookmarks: computed(() => {
        return bookmarkStore.bookmarks('addresses');
      }),
      tokenBookmarks: computed(() => {
        return bookmarkStore.bookmarks('tokens');
      }),
      mainBookmarks: computed(() => {
        return bookmarkStore.bookmarks('main');
      }),

      bookmarkLink: (bookmark: BookmarkedItem) => {
        if (bookmark.type === 'block') {
          return { name: 'block', params: { height: bookmark.item.id } };
        }

        if (bookmark.type === 'transaction') {
          return { name: 'transaction', params: { id: bookmark.item.id } };
        }
      },

      timeAgo,
      date,
      confirmReset,
    };
  },
});
</script>
