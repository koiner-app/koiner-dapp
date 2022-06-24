<template>
  <q-json-search
    :schema="schema"
    :uischema="uiSchema"
    :renderers="renderers"
    :search-provider="searchProvider"
    :request="request"
    :scroll-position="scrollPosition"
    :data="{}"
    @on-scroll="onScroll"
  />
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, PropType } from 'vue';
import { BlocksSearchProvider } from '@koiner/chain/block/search/blocks-search-provider';
import { SearchRequestType } from '@appvise/search-manager';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import blocksSearchSchema from './blocks-search.schema.json';
import blocksSearchUiSchema from './view/blocks-table.ui-schema.json';
import { extendedQuasarRenderers } from '@appvise/jsonforms-quasar';
import { jsonSearchRenderers } from '@appvise/jsonsearch-quasar';
import { blockAttributeRenderers } from './attribute';

const renderers = [
  ...extendedQuasarRenderers,
  ...jsonSearchRenderers,
  ...blockAttributeRenderers,
];

export default defineComponent({
  components: {
    QJsonSearch,
  },

  emits: ['onScroll'],

  props: {
    request: {
      type: Object as PropType<SearchRequestType>,
      required: false,
    },
    scrollPosition: {
      type: Number,
      required: false,
    },
  },

  setup(props, { emit }) {
    const router = useRouter();
    const searchProvider = new BlocksSearchProvider();

    const onScroll = (newScrollPosition: number) => {
      emit('onScroll', newScrollPosition);
    };

    return {
      renderers: Object.freeze(renderers),
      schema: blocksSearchSchema,
      uiSchema: blocksSearchUiSchema,
      router,
      searchProvider,
      onScroll,
    };
  },
});
</script>
