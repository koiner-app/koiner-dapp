import {
  and,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';

import { isStringAttributeControl } from '@appvise/jsonsearch-quasar';
import ParentAttributeRenderer from './parent-attribute-renderer.vue';
import TransactionAttributeRenderer from './transaction-attribute-renderer.vue';

const parentAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ParentAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'parent'))
  ),
};

const transactionAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: TransactionAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'transaction'))
  ),
};

export { ParentAttributeRenderer, TransactionAttributeRenderer };

export const transactionAttributeRenderers = [
  transactionAttributeRendererEntry,
  parentAttributeRendererEntry,
];
