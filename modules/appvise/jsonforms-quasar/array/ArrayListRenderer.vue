<template>
  <div v-if="control.visible" :class="styles.arrayList.root">
    <legend :class="styles.arrayList.legend">
      <button
        :class="styles.arrayList.addButton"
        @click="addButtonClick"
        type="button"
      >
        +
      </button>
      <label :class="styles.arrayList.label">
        {{ control.label }}
      </label>
    </legend>

    <q-list bordered>
      <q-item
        v-for="(element, index) in control.data"
        :key="`${control.path}-${index}`"
        :class="styles.arrayList.itemWrapper"
      >
        <!--        <q-item-section>-->
        <array-list-element
          :moveUp="moveUp(control.path, index)"
          :moveUpEnabled="index > 0"
          :moveDown="moveDown(control.path, index)"
          :moveDownEnabled="index < control.data.length - 1"
          :delete="removeItems(control.path, [index])"
          :label="childLabelForIndex(index)"
          :styles="styles"
        >
          <dispatch-renderer
            :schema="control.schema"
            :uischema="childUiSchema"
            :path="composePaths(control.path, `${index}`)"
            :enabled="control.enabled"
            :renderers="control.renderers"
            :cells="control.cells"
          />
        </array-list-element>
        <!--        </q-item-section>-->

        <!--        <q-item-section side>-->
        <!--          <q-icon name="chat_bubble" color="green" />-->
        <!--        </q-item-section>-->
      </q-item>
    </q-list>
    <!--    <fieldset v-if="control.visible" :class="styles.arrayList.root">-->
    <!--      <legend :class="styles.arrayList.legend">-->
    <!--        <button-->
    <!--          :class="styles.arrayList.addButton"-->
    <!--          @click="addButtonClick"-->
    <!--          type="button"-->
    <!--        >-->
    <!--          +-->
    <!--        </button>-->
    <!--        <label :class="styles.arrayList.label">-->
    <!--          {{ control.label }}-->
    <!--        </label>-->
    <!--      </legend>-->
    <!--      <div-->
    <!--        v-for="(element, index) in control.data"-->
    <!--        :key="`${control.path}-${index}`"-->
    <!--        :class="styles.arrayList.itemWrapper"-->
    <!--      >-->
    <!--        <array-list-element-->
    <!--          :moveUp="moveUp(control.path, index)"-->
    <!--          :moveUpEnabled="index > 0"-->
    <!--          :moveDown="moveDown(control.path, index)"-->
    <!--          :moveDownEnabled="index < control.data.length - 1"-->
    <!--          :delete="removeItems(control.path, [index])"-->
    <!--          :label="childLabelForIndex(index)"-->
    <!--          :styles="styles"-->
    <!--        >-->
    <!--          <dispatch-renderer-->
    <!--            :schema="control.schema"-->
    <!--            :uischema="childUiSchema"-->
    <!--            :path="composePaths(control.path, `${index}`)"-->
    <!--            :enabled="control.enabled"-->
    <!--            :renderers="control.renderers"-->
    <!--            :cells="control.cells"-->
    <!--          />-->
    <!--        </array-list-element>-->
    <!--      </div>-->
    <!--      <div v-if="noData" :class="styles.arrayList.noData">No data</div>-->
    <!--    </fieldset>-->

    <div v-if="noData" :class="styles.arrayList.noData">No data</div>
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
} from '@jsonforms/core';
import { defineComponent } from 'vue';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsArrayControl,
  RendererProps,
} from '@jsonforms/vue';
import { useQuasarArrayControl } from '../util';
import ArrayListElement from './ArrayListElement.vue';

const controlRenderer = defineComponent({
  name: 'array-list-renderer',
  components: {
    ArrayListElement,
    DispatchRenderer,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useQuasarArrayControl(useJsonFormsArrayControl(props));
  },
  computed: {
    noData(): boolean {
      return !this.control.data || this.control.data.length === 0;
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

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, schemaTypeIs('array')),
};
</script>
