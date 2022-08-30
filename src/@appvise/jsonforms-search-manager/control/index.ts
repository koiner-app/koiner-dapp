import { JsonFormsRendererRegistryEntry, rankWith } from '@jsonforms/core';
import { isSearchControl } from '../testers';

import SearchControlRenderer from './SearchControlRenderer.vue';

const clientsOneOfEnumControlRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: SearchControlRenderer,
  // TODO: Use something else then format: search for matching renderer
  tester: rankWith(99, isSearchControl),
};

export { SearchControlRenderer };

export const searchManagerControlRenderers = [
  clientsOneOfEnumControlRendererEntry,
];
