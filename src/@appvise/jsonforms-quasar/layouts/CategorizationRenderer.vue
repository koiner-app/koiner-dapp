<template>
  <q-card v-if="layout.visible" :class="styles.categorization.root">
    <q-tabs
      v-model="activeCategory"
      :vertical="layout.direction === 'row'"
      :align="appliedOptions.align ?? 'left'"
    >
      <q-tab
        v-for="(element, index) in visibleCategories"
        :key="`${layout.path}-${index}`"
        :label="t(element.label)"
        :name="element.label"
      />
    </q-tabs>

    <q-separator />

    <q-scroll-area style="height: calc(100vh - 340px)">
      <q-tab-panels v-model="activeCategory">
        <q-tab-panel
          v-for="(element, index) in visibleCategories"
          :key="`${layout.path}-${index}`"
          :name="element.label"
        >
          <dispatch-renderer
            :schema="layout.schema"
            :uischema="element"
            :path="layout.path"
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
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'CategorizationRenderer',
  components: {
    DispatchRenderer,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    const activeCategory = ref(
      (props.uischema as Categorization).elements[0].label
    );
    const ajv = useAjv();
    const { t } = useI18n();
    const options = useJsonFormsLayout(props);

    return {
      ...useQuasarLayout(options),
      activeCategory,
      ajv,
      t,
    };
  },
  computed: {
    visibleCategories(): (Category | Categorization)[] {
      return (this.layout.uischema as Categorization).elements.filter(
        (category: Category | Categorization) =>
          isVisible(category, this.layout.data, this.layout.path, this.ajv)
      );
    },
  },
});
</script>
