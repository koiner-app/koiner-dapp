import {
  and,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';

import TokenAttributeRenderer from './token-attribute-renderer.vue';
import TokenAmountAttributeRenderer from './token-amount-attribute-renderer.vue';
import KoinTokenAmountAttributeRenderer from './koin-token-amount-attribute-renderer.vue';
import VhpTokenAmountAttributeRenderer from './vhp-token-amount-attribute-renderer.vue';
import {
  isNumericAttributeControl,
  isStringAttributeControl,
} from '@appvise/jsonsearch-quasar';

const tokenAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: TokenAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'token'))
  ),
};

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
  TokenAttributeRenderer,
  TokenAmountAttributeRenderer,
  KoinTokenAmountAttributeRenderer,
  VhpTokenAmountAttributeRenderer,
};

export const contractAttributeRenderers = [
  tokenAttributeRendererEntry,
  tokenAmountAttributeRendererEntry,
  koinTokenAmountAttributeRendererEntry,
  vhpTokenAmountAttributeRendererEntry,
];
