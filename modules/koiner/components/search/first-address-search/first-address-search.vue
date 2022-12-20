<template>
  <q-card
    class="bg-primary text-primary first-addresses-search"
    style="width: 700px; max-width: 80vw; max-height: 80vh"
  >
    <q-bar class="bg-primary text-white">
      <span class="text-caption">Search address</span>

      <q-space />
      <span class="text-caption q-pr-md text-italic" style="opacity: 0.7"
        >Search for an address to save them to your portfolio</span
      >
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

    <first-addresses-search-results :search="trimmedSearch" :links="false" />
  </q-card>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import FirstAddressesSearchResults from './first-addresses-search-results.vue';

export default defineComponent({
  name: 'FirstAddressSearch',
  components: {
    FirstAddressesSearchResults,
  },

  setup() {
    const search = ref('');

    return {
      search,
      trimmedSearch: computed(() => {
        return search.value.trim();
      }),
    };
  },
});
</script>

<style lang="scss">
.first-addresses-search .q-item__section--side .favorite-icon {
  color: yellow !important;
}
.first-addresses-search {
  .q-card__section > .text-caption {
    padding-bottom: 0.5rem;
    display: inline-block;
  }
  .q-list > .q-item,
  .q-item {
    min-height: 32px;
    padding: 2px 16px;
  }
}
</style>
