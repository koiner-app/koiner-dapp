import {
  and,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';

import AddressAttributeRenderer from './address-attribute-renderer.vue';
import { isStringAttributeControl } from '@appvise/jsonsearch-quasar';

const addressAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: AddressAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'address'))
  ),
};

export { AddressAttributeRenderer };

export const addressAttributeRenderers = [addressAttributeRendererEntry];
