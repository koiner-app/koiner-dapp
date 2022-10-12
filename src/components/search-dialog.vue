<template>
  <q-dialog
    v-model="dialog"
    transition-show="fade-in"
    transition-hide="fade-out"
  >
    <q-card
      class="bg-primary text-white"
      style="width: 700px; max-width: 80vw; max-height: 80vh"
    >
      <q-bar>
        <span class="text-caption">Search anything</span>

        <q-space />
        <span class="text-caption q-pr-md text-italic" style="opacity: 0.7"
          >Double tap ctrl to open this dialog next time</span
        >

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section class="q-pt-lg">
        <q-input dark dense standout v-model="search" autofocus>
          <template v-slot:prepend>
            <q-icon name="search" size="xs" />
          </template>
          <template v-slot:append>
            <q-icon
              v-if="search !== ''"
              name="clear"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section>
        <span
          class="text-caption"
          v-if="tokenContractsSearch.connection.value?.edges?.length > 0"
        >
          Tokens [{{ tokenContractsSearch.connection.value?.edges?.length }}]
        </span>

        <q-list v-if="tokenContractsSearch.connection.value?.edges?.length > 0">
          <q-item
            clickable
            v-ripple
            v-for="edge in tokenContractsSearch.connection.value.edges"
            :key="edge.cursor"
            :to="{ name: 'token', params: { id: edge.node.id } }"
          >
            <q-item-section>
              <q-item-label class="text-white"
                >{{ edge.node.name
                }}<q-chip
                  dense
                  square
                  size="md"
                  color="white"
                  class="q-ml-sm"
                  >{{ edge.node.symbol }}</q-chip
                ></q-item-label
              >
            </q-item-section>
            <q-item-section side>
              <q-item-label caption
                ><bookmark-component
                  :item="{ id: edge.node.id, type: 'token' }"
                  list-id="tokens"
                  item-translation="koiner.tokenize.item.token"
              /></q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section>
        <span
          class="text-caption"
          v-if="addressesSearch.connection.value?.edges?.length > 0"
        >
          Addresses [{{ addressesSearch.connection.value?.edges?.length }}]
        </span>

        <q-list v-if="addressesSearch.connection.value?.edges?.length > 0">
          <q-item
            clickable
            v-ripple
            v-for="edge in addressesSearch.connection.value.edges"
            :key="edge.cursor"
            :to="{ name: 'address', params: { id: edge.node.id } }"
          >
            <q-item-section>
              <q-item-label class="text-white">
                {{ edge.node.id }}

                <bookmark-component
                  :item="{ id: edge.node.id, type: 'address' }"
                  list-id="addresses"
                  item-translation="koiner.chain.item.address"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import { SearchRequestType, useSearchManager } from '@appvise/search-manager';
import BookmarkComponent from '@koiner/bookmarks/components/bookmark-component.vue';

export default defineComponent({
  name: 'SearchDialog',
  components: { BookmarkComponent },
  props: {
    openDialog: {
      required: false,
      type: Boolean,
    },
  },
  emits: ['closed'],

  setup(props, { emit }) {
    const { Control } = useMagicKeys();

    const dialog = ref(false);
    const search = ref('');
    const addressesSearch = useSearchManager('addresses');
    const tokenContractsSearch = useSearchManager('tokenContracts');

    const performSearch = async () => {
      const request: SearchRequestType = {
        first: 10,
        filter: {
          search: {
            // Use dummy text for triggering searchProvider to workaround around error of urql: can only useClient inside setup
            iContains: search.value !== '' ? search.value : 'zzzzzzz',
          },
        },
      };

      // await addressesSearch.search(request);
      await tokenContractsSearch.search(request);
    };

    const resetSearch = () => {
      search.value = '';
      addressesSearch.reset();
      tokenContractsSearch.reset();
    };

    let lastPressedControl: number | undefined;

    watchEffect(() => {
      if (Control.value) {
        if (lastPressedControl && Date.now() - lastPressedControl < 1000) {
          dialog.value = true;
          lastPressedControl = undefined;
        } else {
          lastPressedControl = Date.now();
        }
      }
    });

    watch(
      props,
      () => {
        if (props.openDialog != null) {
          dialog.value = true;
        }
      },
      { deep: true }
    );

    watch(dialog, (newValue) => {
      if (!newValue) {
        resetSearch();
        emit('closed');
      }
    });

    watch(search, () => {
      if (search.value.length > 2) {
        performSearch();
      }
    });

    // Use dummy search for triggering searchProvider to workaround around error of urql: can only useClient inside setup
    performSearch();

    return {
      dialog,
      search,
      addressesSearch,
      tokenContractsSearch,
    };
  },
});
</script>

<style lang="scss">
.q-dialog .q-table__container {
  height: auto !important;
  max-height: 200px !important;
}
.q-table__container {
  .q-table__bottom {
    display: none;
  }
}
.q-table {
  thead {
    display: none;
  }
}
.q-dialog .q-item__section--side .favorite-icon {
  color: yellow !important;
}
</style>
