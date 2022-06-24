import {
  and,
  formatIs,
  isBooleanControl,
  isEnumControl,
  isNumberControl,
  isStringControl,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';

import ControlWrapper from './ControlWrapper.vue';
import BooleanToggleControlRenderer from './BooleanToggleControlRenderer.vue';
import ButtonControlRenderer from './ButtonControlRenderer.vue';
import StringControlRenderer from './StringControlRenderer.vue';
import EnumControlRenderer from './EnumControlRenderer.vue';
import BooleanControlRenderer from './BooleanControlRenderer.vue';
import NumberControlRenderer from './NumberControlRenderer.vue';
import PasswordControlRenderer from './PasswordControlRenderer.vue';

const stringControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: StringControlRenderer,
  tester: rankWith(1, isStringControl),
};

const booleanToggleControlRendererEntry: JsonFormsRendererRegistryEntry =
  {
    renderer: BooleanToggleControlRenderer,
    tester: rankWith(3, and(isBooleanControl, optionIs('toggle', true))),
  };

const buttonControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ButtonControlRenderer,
  tester: rankWith(1, uiTypeIs('Button')),
};

const enumControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: EnumControlRenderer,
  tester: rankWith(2, isEnumControl),
};

const booleanControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: BooleanControlRenderer,
  tester: rankWith(1, isBooleanControl),
};

const numberControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: NumberControlRenderer,
  tester: rankWith(1, isNumberControl),
};

const passwordControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: PasswordControlRenderer,
  tester: rankWith(2, and(isStringControl, formatIs('password'))),
};

export {
  ControlWrapper,
  StringControlRenderer,
  BooleanToggleControlRenderer,
  ButtonControlRenderer,
  EnumControlRenderer,
  BooleanControlRenderer,
  NumberControlRenderer,
  PasswordControlRenderer,
};

export const controlRenderers = [
  stringControlRendererEntry,
  buttonControlRendererEntry,
  booleanControlRendererEntry,
  numberControlRendererEntry,
  enumControlRendererEntry,
  booleanToggleControlRendererEntry,
  passwordControlRendererEntry,
];
