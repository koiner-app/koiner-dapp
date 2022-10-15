<template>
  <q-page
    class="q-pa-xl row items-start q-gutter-lg"
    style="padding-top: 7.5rem !important"
  >
    <q-card class="transactions-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-overline">Bookmarks</div>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu auto-close self="top left">
                <q-list>
                  <q-item clickable @click="bookmarkStore.resetList('main')">
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
          <q-item v-for="bookmark in mainBookmarks" :key="bookmark.id">
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

    <q-card class="blocks-card" flat bordered>
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
          <q-item v-for="bookmark in addressBookmarks" :key="bookmark.id">
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

    <q-card class="blocks-card" flat bordered>
      <q-card-section class="q-pt-xs">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-overline">Token watchlist</div>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu auto-close self="top left">
                <q-list>
                  <q-item clickable @click="bookmarkStore.resetList('tokens')">
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
          <q-item v-for="bookmark in tokenBookmarks" :key="bookmark.id">
            <q-item-section>
              <q-item-label
                >{{ bookmark.item.name
                }}<q-chip
                  dense
                  square
                  size="sm"
                  class="q-ml-sm"
                  >{{ bookmark.item.symbol }}</q-chip
                ></q-item-label
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

    <q-btn @click="bookmarkStore.reset">Reset ALL</q-btn>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';
import { useBookmarkStore } from '@koiner/bookmarks';
import { timeAgo } from '@appvise/jsonsearch-quasar';
import { date } from 'quasar';

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
      tokenBookmarks: computed(() => {
        return bookmarkStore.bookmarks('tokens');
      }),
      mainBookmarks: computed(() => {
        return bookmarkStore.bookmarks('main');
      }),

      timeAgo,
      date,
    };
  },
});
</script>
