import {
  and,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';

import TokenAmountAttributeRenderer from './token-amount-attribute-renderer.vue';
import KoinTokenAmountAttributeRenderer from './koin-token-amount-attribute-renderer.vue';
import VhpTokenAmountAttributeRenderer from './vhp-token-amount-attribute-renderer.vue';
import { isNumericAttributeControl } from '@appvise/jsonsearch-quasar';

const tokenAmountAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: TokenAmountAttributeRenderer,
  tester: rankWith(
    2,
    and(isNumericAttributeControl, optionIs('format', 'tokenAmount'))
  ),
};

const koinTokenAmountAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: KoinTokenAmountAttributeRenderer,
  tester: rankWith(
    2,
    and(isNumericAttributeControl, optionIs('format', 'koinTokenAmount'))
  ),
};

const vhpTokenAmountAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: VhpTokenAmountAttributeRenderer,
  tester: rankWith(
    2,
    and(isNumericAttributeControl, optionIs('format', 'vhpTokenAmount'))
  ),
};

export {
  TokenAmountAttributeRenderer,
  KoinTokenAmountAttributeRenderer,
  VhpTokenAmountAttributeRenderer,
};

export const tokenAttributeRenderers = [
  tokenAmountAttributeRendererEntry,
  koinTokenAmountAttributeRendererEntry,
  vhpTokenAmountAttributeRendererEntry,
];
