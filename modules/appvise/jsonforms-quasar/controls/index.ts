import {
  and,
  formatIs,
  isBooleanControl,
  isEnumControl,
  isNumberControl,
  isOneOfEnumControl,
  isStringControl,
  JsonFormsRendererRegistryEntry,
  optionIs,
  or,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { formatIsForAnyType } from '@appvise/jsonforms-quasar';

import ControlWrapper from './ControlWrapper.vue';
import BooleanToggleControlRenderer from './BooleanToggleControlRenderer.vue';
import ButtonControlRenderer from './ButtonControlRenderer.vue';
import ColorPickerControlRenderer from './ColorPickerControlRenderer.vue';
import CurrencyControlRenderer from './CurrencyControlRenderer.vue';
import StringControlRenderer from './StringControlRenderer.vue';
import EnumControlRenderer from './EnumControlRenderer.vue';
import OneOfEnumControlRenderer from './OneOfEnumControlRenderer.vue';
import BooleanControlRenderer from './BooleanControlRenderer.vue';
import NumberControlRenderer from './NumberControlRenderer.vue';
import PasswordControlRenderer from './PasswordControlRenderer.vue';
import AnyOfStringOrEnumControlRenderer from '@appvise/jsonforms-quasar/controls/AnyOfStringOrEnumControlRenderer.vue';
import { isAnyOfControl } from '@jsonforms/core/src/testers/testers';

const stringControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: StringControlRenderer,
  tester: rankWith(1, isStringControl),
};

const booleanToggleControlRendererEntry: JsonFormsRendererRegistryEntry = {
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

const anyOfStringOrEnumControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: AnyOfStringOrEnumControlRenderer,
  tester: rankWith(5, isAnyOfControl),
};

const oneOfEnumControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: OneOfEnumControlRenderer,
  tester: rankWith(5, isOneOfEnumControl),
};

const booleanControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: BooleanControlRenderer,
  tester: rankWith(1, isBooleanControl),
};

const numberControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: NumberControlRenderer,
  tester: rankWith(1, isNumberControl),
};

const colorControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ColorPickerControlRenderer,
  tester: rankWith(
    2,
    and(
      isStringControl,
      or(formatIsForAnyType('color'), optionIs('format', 'color'))
    )
  ),
};

const currencyControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: CurrencyControlRenderer,
  tester: rankWith(
    2,
    and(
      isNumberControl,
      or(formatIsForAnyType('currency'), optionIs('format', 'currency'))
    )
  ),
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
  AnyOfStringOrEnumControlRenderer,
  OneOfEnumControlRenderer,
  BooleanControlRenderer,
  NumberControlRenderer,
  ColorPickerControlRenderer,
  CurrencyControlRenderer,
  PasswordControlRenderer,
};

export const controlRenderers: JsonFormsRendererRegistryEntry[] = [
  stringControlRendererEntry,
  buttonControlRendererEntry,
  booleanControlRendererEntry,
  numberControlRendererEntry,
  enumControlRendererEntry,
  anyOfStringOrEnumControlRendererEntry,
  oneOfEnumControlRendererEntry,
  booleanToggleControlRendererEntry,
  colorControlRendererEntry,
  currencyControlRendererEntry,
  passwordControlRendererEntry,
];
