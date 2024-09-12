import { JsonFormsRendererRegistryEntry, rankWith } from '@jsonforms/core';

import ListViewRenderer from './list-view-renderer.vue';
import TableViewRenderer from './table-view-renderer.vue';
import { isList, isTable } from '../util';

const listViewRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: ListViewRenderer,
  tester: rankWith(999, isList),
};

const tableViewRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: TableViewRenderer,
  tester: rankWith(999, isTable),
};

export * from './options';
export { TableViewRenderer, ExpansionPanelViewRenderer };

export const viewRenderers = [listViewRendererEntry, tableViewRendererEntry];
