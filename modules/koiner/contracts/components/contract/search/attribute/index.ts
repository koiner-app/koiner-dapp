import {
  and,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';

import ContractNameAttributeRenderer from './contract-name-attribute-renderer.vue';
import { isStringAttributeControl } from '@appvise/jsonsearch-quasar';
import ContractEventParentAttributeRenderer from '@koiner/contracts/components/contract/search/attribute/contract-event-parent-attribute-renderer.vue';

const contractNameAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ContractNameAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'contractName'))
  ),
};

const contractEventParentAttributeRendererEntry: JsonFormsRendererRegistryEntry =
  {
    renderer: ContractEventParentAttributeRenderer,
    tester: rankWith(
      2,
      and(isStringAttributeControl, optionIs('format', 'contractEventParent'))
    ),
  };

export { ContractNameAttributeRenderer, ContractEventParentAttributeRenderer };

export const contractsAttributeRenderers = [
  contractNameAttributeRendererEntry,
  contractEventParentAttributeRendererEntry,
];
