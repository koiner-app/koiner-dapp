<template>
  <q-list>
    <q-item-label v-if="translation('label')" header
      >{{ translation('label') }}...</q-item-label
    >

    <q-item
      v-for="searchResult in results"
      :key="`${control.path}-${searchResult.rowIndex}`"
    >
      <q-item-section>
        <dispatch-renderer
          v-for="(attribute, index) in attributes"
          :key="`${control.path}-${index}`"
          :schema="control.schema"
          :uischema="uischema.elements[attribute.elementIndex]"
          :path="control.path"
          :enabled="control.enabled"
          :renderers="control.renderers"
          :cells="control.cells"
          :result="searchResult"
          :index="searchResult.rowIndex"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue';
import { DispatchRenderer, rendererProps } from '@jsonforms/vue';
import { SearchViewElement, SearchViewRendererProps } from '../index';
import useSearchView from '@appvise/jsonsearch-quasar/views/use-search-view';

export default defineComponent({
  name: 'ListViewRenderer',
  components: {
    DispatchRenderer,
  },
  props: {
    ...rendererProps<SearchViewElement>(),

    result: {
      type: Object as PropType<any>,
      required: false,
      default: null,
    },
  },
  setup(props: SearchViewRendererProps) {
    const {
      // Schema
      uischema,

      // Search View
      searchView,
      attributes,

      // Search Manager
      searchManager,
      request,
      results,

      // Util functions
      translation,
    } = useSearchView(props, props.result);

    onMounted(async () => {
      await searchManager.search(request.value);
    });

    return {
      // Schema
      uischema,

      // Search View
      ...searchView,
      attributes,

      // Search Manager
      searchManager,
      request,
      results,

      // Util functions
      translation,
    };
  },
});
</script>
