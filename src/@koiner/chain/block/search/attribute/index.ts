import {
  and,
  JsonFormsRendererRegistryEntry,
  optionIs,
  rankWith,
} from '@jsonforms/core';

import BlockRewardAttributeRenderer from './block-reward-attribute-renderer.vue';
import { isStringAttributeControl } from '@appvise/jsonsearch-quasar';

const blockRewardAttributeRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: BlockRewardAttributeRenderer,
  tester: rankWith(
    2,
    and(isStringAttributeControl, optionIs('format', 'blockReward'))
  ),
};

export { BlockRewardAttributeRenderer };

export const blockAttributeRenderers = [blockRewardAttributeRendererEntry];
