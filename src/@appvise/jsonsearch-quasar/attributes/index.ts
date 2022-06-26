import {
  and,
  JsonFormsRendererRegistryEntry,
  optionIs,
  or,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';

import {
  isStringAttributeControl,
  isBooleanAttributeControl,
  isNumericAttributeControl,
} from '../util';

import ActiveStatusAttributeRenderer from './status-attribute-renderer.vue';
import AgeAttributeRenderer from './age-attribute-renderer.vue';
import AttributeWrapper from './attribute-wrapper.vue';
import AttributeGroupRenderer from './attribute-group-renderer.vue';
import ButtonAttributeRenderer from './button-attribute-renderer.vue';
import IconTagAttributeRenderer from './icon-tag-attribute-renderer.vue';
import LinkAttributeRenderer from './link-attribute-renderer.vue';
import NumericAttributeRenderer from './numeric-attribute-renderer.vue';
import TextAttributeRenderer from './text-attribute-renderer.vue';
import ProgressAttributeRenderer from './progress-attribute-renderer.vue';

const attributeGroupRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: AttributeGroupRenderer,
  tester: rankWith(1000, and(uiTypeIs('AttributeGroup'))),
};

const textAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: TextAttributeRenderer,
  tester: rankWith(1, isStringAttributeControl),
};

const numericAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: NumericAttributeRenderer,
  tester: rankWith(1, isNumericAttributeControl),
};

const activeStatusAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ActiveStatusAttributeRenderer,
  tester: rankWith(
    2,
    and(isBooleanAttributeControl, optionIs('format', 'status'))
  ),
};

const ageAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: AgeAttributeRenderer,
  tester: rankWith(
    2,
    and(isNumericAttributeControl, optionIs('format', 'age'))
  ),
};

const progressAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ProgressAttributeRenderer,
  tester: rankWith(
    2,
    and(isNumericAttributeControl, optionIs('format', 'progress'))
  ),
};

const linkAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: LinkAttributeRenderer,
  tester: rankWith(
    2,
    and(
      or(isStringAttributeControl, isNumericAttributeControl),
      optionIs('format', 'link')
    )
  ),
};

const buttonAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ButtonAttributeRenderer,
  tester: rankWith(
    2,
    and(
      or(isStringAttributeControl, isNumericAttributeControl),
      optionIs('format', 'button')
    )
  ),
};

const iconTagAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: IconTagAttributeRenderer,
  tester: rankWith(
    2,
    and(isBooleanAttributeControl, optionIs('format', 'iconTag'))
  ),
};

export {
  ActiveStatusAttributeRenderer,
  AgeAttributeRenderer,
  AttributeGroupRenderer,
  AttributeWrapper,
  ButtonAttributeRenderer,
  IconTagAttributeRenderer,
  LinkAttributeRenderer,
  NumericAttributeRenderer,
  TextAttributeRenderer,
  ProgressAttributeRenderer,
};

export const attributeRenderers = [
  attributeGroupRendererEntry,
  activeStatusAttributeRendererEntry,
  ageAttributeRendererEntry,
  buttonAttributeRendererEntry,
  iconTagAttributeRendererEntry,
  linkAttributeRendererEntry,
  numericAttributeRendererEntry,
  textAttributeRendererEntry,
  progressAttributeRendererEntry,
];
