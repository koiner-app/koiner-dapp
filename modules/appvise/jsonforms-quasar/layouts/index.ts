import {
  JsonFormsRendererRegistryEntry,
  rankWith,
  isLayout,
  Tester,
  and,
  uiTypeIs,
  categorizationHasCategory,
} from '@jsonforms/core';

import VerticalLayoutRenderer from './VerticalLayoutRenderer.vue';
import CategorizationRenderer from './CategorizationRenderer.vue';
import GroupRenderer from './GroupRenderer.vue';

// default layout renderer is the VerticalLayoutRenderer
const layoutRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: VerticalLayoutRenderer,
  tester: rankWith(1, isLayout),
};

export const verticalLayoutRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: VerticalLayoutRenderer,
  tester: rankWith(2, uiTypeIs('VerticalLayout')),
};

export const isSingleLevelCategorization: Tester = and(
  uiTypeIs('Categorization'),
  categorizationHasCategory
);

export const categorizationRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: CategorizationRenderer,
  tester: rankWith(2, isSingleLevelCategorization),
};

export const groupRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: GroupRenderer,
  tester: rankWith(2, and(isLayout, uiTypeIs('Group'))),
};

export const layoutRenderers = [
  layoutRendererEntry,
  // arrayLayoutRendererEntry,
  categorizationRendererEntry,
  // categorizationStepperRendererEntry,
  groupRendererEntry,
  // horizontalLayoutRendererEntry,
  verticalLayoutRendererEntry,
];
