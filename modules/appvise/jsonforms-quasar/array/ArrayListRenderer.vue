<template>
  <div v-if="control.visible" :class="styles.arrayList.root">
    <div :class="styles.arrayList.legend">
      <label :class="styles.arrayList.label">
        {{ computedLabel }}
      </label>
      <q-btn
        :class="styles.arrayList.addButton"
        @click="addButtonClick"
        flat
        :icon="matAdd"
      >
        {{ addButtonTranslation }}
      </q-btn>
    </div>

    <q-list>
      <q-item
        v-for="(element, index) in control.data"
        :key="`${control.path}-${index}`"
        :class="styles.arrayList.itemWrapper"
      >
        <array-list-element
          :show-sort-buttons="appliedOptions.showSortButtons ?? undefined"
          :move-up="moveUp(control.path, index)"
          :move-up-enabled="index > 0"
          :move-down="moveDown(control.path, index)"
          :move-down-enabled="index < control.data.length - 1"
          :delete="removeItems(control.path, [index])"
          :delete-enabled="minItems ? control.data.length > minItems : true"
          :label="childLabelForIndex(index)"
          :styles="styles"
        >
          <dispatch-renderer
            :schema="control.schema"
            :uischema="control.uischema"
            :path="composePaths(control.path, `${index}`)"
            :enabled="control.enabled"
            :renderers="control.renderers"
            :cells="control.cells"
          />
        </array-list-element>
      </q-item>
    </q-list>

    <div v-if="noData" :class="styles.arrayList.noData">
      {{ noDataTranslation }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  composePaths,
  createDefaultValue,
  JsonFormsRendererRegistryEntry,
  rankWith,
  ControlElement,
  schemaTypeIs,
  and,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsArrayControl,
  RendererProps,
} from '@jsonforms/vue';
import {
  getI18nKeyPrefix2,
  useQuasarArrayControl,
  useTranslator,
} from '../util';
import ArrayListElement from './ArrayListElement.vue';
import { matAdd } from '@quasar/extras/material-icons';

export default defineComponent({
  name: 'array-list-renderer',
  components: {
    ArrayListElement,
    DispatchRenderer,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const t = useTranslator();
    const input = useQuasarArrayControl(useJsonFormsArrayControl(props));
    const i18nPrefix = getI18nKeyPrefix2(input);
    const noDataTranslation = t(`${i18nPrefix}.noDataLabel`, '');
    const addButtonTranslation = t(`${i18nPrefix}.addButton`, '');

    return {
      t,
      ...input,
      noDataTranslation: !noDataTranslation.includes(i18nPrefix)
        ? noDataTranslation
        : 'No data',
      addButtonTranslation: !addButtonTranslation.includes(i18nPrefix)
        ? addButtonTranslation
        : '',
      matAdd,
    };
  },
  computed: {
    noData(): boolean {
      return !this.control.data || this.control.data.length === 0;
    },
    minItems(): number {
      return this.appliedOptions.minItems ?? 0;
    },
  },
  methods: {
    composePaths,
    createDefaultValue,
    addButtonClick() {
      this.addItem(
        this.control.path,
        createDefaultValue(this.control.schema)
      )();
    },
  },
});
</script>
