import { and, schemaTypeIs, Tester, uiTypeIs } from '@jsonforms/core';

/**
 * Tests whether the given UI schema is of type SearchControl and if the schema
 * is of type string
 * @type {Tester}
 */
export const isSearchControl = and(
  uiTypeIs('SearchControl'),
  schemaTypeIs('string')
);
