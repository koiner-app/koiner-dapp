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
      <template v-slot:append>
        <q-icon
          v-if="search?.length > 0"
          @click="search = ''"
          name="close"
          size="18px"
          color="#333"
        />
        <q-icon
          v-if="searchInfo"
          name="info"
          size="15px"
          color="grey"
          style="opacity: 0.75"
        />
        <q-tooltip
          v-if="searchInfo"
          top
          nudge-right="54"
          close-delay="25"
          z-index="98"
          transition="hide-on-leave"
        >
          <span>{{ searchInfo }}</span>
        </q-tooltip>
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
    searchInfo: {
      type: String,
      required: false,
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
  width: 120px !important;
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
