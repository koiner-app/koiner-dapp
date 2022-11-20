<template>
  <q-card
    v-if="layout.visible"
    :class="`pa-0 ${styles.group.root} ${appliedOptions.class ?? ''}`"
    elevation="2"
  >
    <q-card-section v-if="layout.uischema.label" :class="styles.group.label">
      <div class="text-h6">
        {{ layout.uischema.label }}
      </div>
    </q-card-section>

    <q-card-section
      v-for="(element, index) in layout.uischema.elements"
      :key="`${layoutPath}-${index}`"
      :class="styles.group.item"
    >
      <dispatch-renderer
        :schema="layout.schema"
        :uischema="element"
        :path="layoutPath !== 'root' ? layoutPath : ''"
        :enabled="layout.enabled"
        :renderers="layout.renderers"
        :cells="layout.cells"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Layout } from '@jsonforms/core';
import { defineComponent } from '../config/vue';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsLayout,
  RendererProps,
} from '@jsonforms/vue';
import { useQuasarLayout } from '../util';

export default defineComponent({
  name: 'GroupRenderer',
  components: {
    DispatchRenderer,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    const quasarLayout = useQuasarLayout(useJsonFormsLayout(props));
    const layoutPath = quasarLayout.layout.path && quasarLayout.layout.path !== '' ? quasarLayout.layout.path : 'root';

    return {
      ...quasarLayout,
      layoutPath,
    };
  },
});
</script>
