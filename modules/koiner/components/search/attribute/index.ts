import {
  and,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';

import DataAttributeRenderer from './data-attribute-renderer.vue';
import { isStringAttributeControl } from '@appvise/jsonsearch-quasar';

const dataRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: DataAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'data'))
  ),
};

export { DataAttributeRenderer };

export const KoinerAttributeRenderers = [dataRendererEntry];
