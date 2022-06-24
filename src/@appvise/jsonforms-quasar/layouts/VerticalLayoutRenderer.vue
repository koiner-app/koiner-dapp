<template>
  <div
    v-if="layout.visible"
    :class="`pa-0 ${styles.verticalLayout.root}`"
  >
    <div
      v-for="(element, index) in layout.uischema.elements"
      :key="`${layout.path}-${index}`"
      class="row"
    >
      <div
        :class="`col ${styles.verticalLayout.item}`"
      >
        <dispatch-renderer
          :schema="layout.schema"
          :uischema="element"
          :path="layout.path"
          :enabled="layout.enabled"
          :renderers="layout.renderers"
          :cells="layout.cells"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  uiTypeIs,
  JsonFormsRendererRegistryEntry,
  Layout,
  rankWith,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsLayout,
  RendererProps,
} from '@jsonforms/vue';
import { useQuasarLayout } from '../util';

const layoutRenderer = defineComponent({
  name: 'VerticalLayoutRenderer',
  components: {
    DispatchRenderer,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    return useQuasarLayout(useJsonFormsLayout(props));
  },
});

export default layoutRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: layoutRenderer,
  tester: rankWith(2, uiTypeIs('VerticalLayout')),
};
</script>
