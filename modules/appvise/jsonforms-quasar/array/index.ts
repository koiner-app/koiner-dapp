import {
  and,
  JsonFormsRendererRegistryEntry,
  rankWith,
  schemaTypeIs,
  uiTypeIs,
} from '@jsonforms/core';

import ArrayListRenderer from './ArrayListRenderer.vue';

export const arrayListRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ArrayListRenderer,
  tester: rankWith(2, and(uiTypeIs('Control'), schemaTypeIs('array'))),
};

export { ArrayListRenderer };

export const arrayRenderers: JsonFormsRendererRegistryEntry[] = [
  arrayListRendererEntry,
];
