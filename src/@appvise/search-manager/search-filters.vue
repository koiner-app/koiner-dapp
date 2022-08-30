<template>
  <div class="card-header row no-wrap items-center search-filters">
    <q-input
      outlined
      v-model="search"
      :placeholder="searchPlaceholder"
      class="col-grow wildcard-search"
      dense
    />
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
      default: 'Search'
    },
  },

  emits: ['onChange'],

  setup(props, { emit }) {
    const request: Ref<SearchRequestType> = ref(props.request);
    const search: Ref<string | undefined> = ref();

    onMounted(() => {
      if (request.value.filter?.search?.contains) {
        search.value = request.value.filter.search.contains;
      }
    });

    watch(search, (newSearch) => {
      if (!request.value.filter) {
        request.value.filter = {};
      }

      if (newSearch) {
        request.value.filter.search = { contains: newSearch };
      } else {
        delete request.value.filter.search;
      }
    });

    watch(request, (newRequest) => {
      emit('onChange', newRequest);
    });

    return {
      search,
    };
  },
});
</script>
