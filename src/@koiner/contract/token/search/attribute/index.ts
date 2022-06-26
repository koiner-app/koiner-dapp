import {
  and,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';

import TokenAmountAttributeRenderer from './token-amount-attribute-renderer.vue';
import KoinTokenAmountAttributeRenderer from './koin-token-amount-attribute-renderer.vue';
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

export { TokenAmountAttributeRenderer, KoinTokenAmountAttributeRenderer };

export const tokenAttributeRenderers = [
  tokenAmountAttributeRendererEntry,
  koinTokenAmountAttributeRendererEntry,
];
