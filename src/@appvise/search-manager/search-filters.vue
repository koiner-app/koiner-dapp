<template>
  <div class="card-header row no-wrap items-center search-filters">
    <q-input
      outlined
      v-model="search"
      :placeholder="searchPlaceholder"
      class="col-grow wildcard-search"
      dense
    >
      <template v-slot:prepend>
        <q-icon name="search" size="xs" />
      </template>
    </q-input>
    <!--    <q-btn flat icon="filter_list" label="Filter"></q-btn>-->
    <!--    <q-btn flat icon="tune" label="Columns"></q-btn>-->
    <!--    <q-btn flat icon="density_medium"></q-btn>-->
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
    };
  },
});
</script>

<style lang="scss">
.wildcard-search {
  border: 0;
  width: 102px !important;
  max-width: 100%;

  &.q-field--dense .q-field__control,
  &.q-field--dense .q-field__marginal {
    height: 2rem !important;
    /* font-size: 0.75rem !important; */
  }
  .q-field__inner {
    transition: width 1s linear 1s;
  }

  &.q-field--highlighted {
    width: 320px !important;
  }
}
</style>
