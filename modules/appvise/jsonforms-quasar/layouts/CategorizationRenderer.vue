<template>
  <q-card v-if="layout.visible" :class="styles.categorization.root">
    <q-tabs
      v-model="activeCategory"
      :vertical="layout.direction === 'row'"
      :align="appliedOptions.align ?? 'left'"
    >
      <q-tab
        v-for="(element, index) in visibleCategories"
        :key="`${layoutPath}-${index}`"
        :label="element.label"
        :name="`${layoutPath}-${index}`"
      />
    </q-tabs>

    <q-separator />

    <q-scroll-area style="height: calc(100vh - 340px)">
      <q-tab-panels v-model="activeCategory">
        <q-tab-panel
          v-for="(element, index) in visibleCategories"
          :key="`${layoutPath}-${index}`"
          :name="`${layoutPath}-${index}`"
        >
          <dispatch-renderer
            :schema="layout.schema"
            :uischema="element"
            :path="layoutPath !== 'root' ? layoutPath : ''"
            :enabled="layout.enabled"
            :renderers="layout.renderers"
            :cells="layout.cells"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-scroll-area>
  </q-card>
</template>

<script lang="ts">
import { Layout, Categorization, Category, isVisible } from '@jsonforms/core';
import { defineComponent, ref } from '../config/vue';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsLayout,
  RendererProps,
} from '@jsonforms/vue';
import { useAjv, useQuasarLayout } from '../util';

export default defineComponent({
  name: 'CategorizationRenderer',
  components: {
    DispatchRenderer,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    const ajv = useAjv();
    const options = useJsonFormsLayout(props);
    const quasarLayout = useQuasarLayout(options);

    const layoutPath =
      quasarLayout.layout.path && quasarLayout.layout.path !== ''
        ? quasarLayout.layout.path
        : 'root';

    const activeCategory = ref(
      // Select first item
      `${layoutPath}-0`
    );

    return {
      ...quasarLayout,
      activeCategory,
      ajv,
      layoutPath,
    };
  },
  computed: {
    visibleCategories(): (Category | Categorization)[] {
      return (this.layout.uischema as Categorization).elements.filter(
        (category: Category | Categorization, index: number) =>
          isVisible(
            category,
            this.layout.data,
            `${this.layoutPath}-${index}`,
            this.ajv
          )
      );
    },
  },
});
</script>
