import { JsonFormsRendererRegistryEntry, rankWith } from '@jsonforms/core';

import TableViewRenderer from './table-view-renderer.vue';
import { isTable } from '../util';

const tableViewRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: TableViewRenderer,
  tester: rankWith(999, isTable),
};

export { TableViewRenderer };

export const viewRenderers = [tableViewRendererEntry];
