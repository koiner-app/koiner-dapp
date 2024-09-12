import { and, UISchemaElement, uiTypeIs } from '@jsonforms/core';
import {
  ExpansionPanelElement,
  ListElement,
  SearchViewElement,
  TableViewElement,
} from '@appvise/jsonsearch-quasar';

export const isSearchView = (
  uischema: UISchemaElement
): uischema is SearchViewElement =>
  (uischema as SearchViewElement).elements !== undefined;

export const isExpansionPanel = (
  uischema: UISchemaElement
): uischema is ExpansionPanelElement =>
  uischema.type === 'ExpansionPanelView' &&
  (uischema as ExpansionPanelElement).elements !== undefined;

export const isList = (uischema: UISchemaElement): uischema is ListElement =>
  uischema.type === 'ListView' &&
  (uischema as ListElement).elements !== undefined;

export const isTable = (
  uischema: UISchemaElement
): uischema is TableViewElement =>
  uischema.type === 'TableView' &&
  (uischema as TableViewElement).elements !== undefined;

/**
 * Tests whether the given UI schema is of type Filter and if the schema
 * is of type string
 * @type {Tester}
 */
export const isFilter = and(uiTypeIs('Filter'));
