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
import { OperationsSearchProvider } from '@koiner/chain/operation/search/operations-search-provider';
import { SearchRequestType } from '@appvise/search-manager';
import QJsonSearch from '@appvise/q-json-forms/QJsonSearch.vue';
import operationsSearchSchema from './operations-search.schema.json';
import operationsSearchUiSchema from './view/operations-table.ui-schema.json';
import { extendedQuasarRenderers } from '@appvise/jsonforms-quasar';
import { jsonSearchRenderers } from '@appvise/jsonsearch-quasar';
import { KoinerRenderers } from '@koiner/renderers';

const renderers = [
  ...extendedQuasarRenderers,
  ...jsonSearchRenderers,
  ...KoinerRenderers,
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
    const searchProvider = new OperationsSearchProvider();

    const onScroll = (newScrollPosition: number) => {
      emit('onScroll', newScrollPosition);
    };

    return {
      renderers: Object.freeze(renderers),
      schema: operationsSearchSchema,
      uiSchema: operationsSearchUiSchema,
      router,
      searchProvider,
      onScroll,
    };
  },
});
</script>
