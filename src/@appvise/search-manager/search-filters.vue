<template>
  <div class="card-header row no-wrap items-center search-filters">
    <q-input
      v-if="searchVisible"
      outlined
      v-model="search"
      :placeholder="searchPlaceholder"
      class="col-grow wildcard-search"
      dense
    />
    <q-btn flat icon="search" @click="searchVisible = !searchVisible"></q-btn>
    <q-btn flat icon="filter_list" label="Filter"></q-btn>
    <q-btn flat icon="tune" label="Columns"></q-btn>
    <q-btn flat icon="density_medium"></q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref, watch } from 'vue';
import { SearchRequestType } from '@appvise/search-manager';

export default defineComponent({
  name: 'SearchFilters',

  props: {
    request: {
      type: Object as PropType<SearchRequestType>,
      required: true,
    },
    searchPlaceholder: {
      type: String,
      required: false,
      default: 'Search',
    },
  },

  emits: ['onChange'],

  setup(props, { emit }) {
    const request: Ref<SearchRequestType> = ref(props.request);
    const search: Ref<string | undefined> = ref();
    const searchVisible = ref(false);

    onMounted(() => {
      if (request.value.filter?.search?.iContains) {
        search.value = request.value.filter.search.iContains;
      }
    });

    watch(search, (newSearch) => {
      if (!request.value.filter) {
        request.value.filter = {};
      }

      if (newSearch) {
        request.value.filter.search = { iContains: newSearch };
      } else {
        delete request.value.filter.search;
      }
    });

    watch(request, (newRequest) => {
      emit('onChange', newRequest);
    });

    return {
      search,
      searchVisible,
    };
  },
});
</script>
