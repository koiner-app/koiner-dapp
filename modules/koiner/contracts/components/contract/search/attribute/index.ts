import {
  and,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';

import ContractNameAttributeRenderer from './contract-name-attribute-renderer.vue';
import { isStringAttributeControl } from '@appvise/jsonsearch-quasar';

const contractNameAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ContractNameAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'contractName'))
  ),
};

export { ContractNameAttributeRenderer };

export const contractsAttributeRenderers = [contractNameAttributeRendererEntry];
