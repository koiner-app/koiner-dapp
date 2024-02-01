import {
  and,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';

import ProducerStatusAttributeRenderer from './producer-status-attribute-renderer.vue';
import ProducerVhpAttributeRenderer from './producer-vhp-attribute-renderer.vue';
import ProducerNameAttributeRenderer from './producer-name-attribute-renderer.vue';
import {
  isNumericAttributeControl,
  isStringAttributeControl,
} from '@appvise/jsonsearch-quasar';

const producerStatusAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ProducerStatusAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'producerStatus'))
  ),
};

const producerVhpAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ProducerVhpAttributeRenderer,
  tester: rankWith(
    2,
    and(isNumericAttributeControl, optionIs('format', 'producerVhp'))
  ),
};

const producerNameAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ProducerNameAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'producerName'))
  ),
};

export { ProducerStatusAttributeRenderer, ProducerVhpAttributeRenderer };

export const blockProductionAttributeRenderers = [
  producerStatusAttributeRendererEntry,
  producerVhpAttributeRendererEntry,
  producerNameAttributeRendererEntry,
];
