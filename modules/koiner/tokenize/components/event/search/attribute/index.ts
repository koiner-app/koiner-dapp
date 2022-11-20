import {
  and,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';

import TokenEventNameAttributeRenderer from './token-event-name-attribute-renderer.vue';
import { isStringAttributeControl } from '@appvise/jsonsearch-quasar';

const tokenEventNameAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: TokenEventNameAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'tokenEventName'))
  ),
};

export { TokenEventNameAttributeRenderer };

export const contractEventAttributeRenderers = [
  tokenEventNameAttributeRendererEntry,
];
