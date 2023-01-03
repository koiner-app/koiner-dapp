import {
  and,
  hasType,
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  rankWith,
  schemaMatches,
  schemaSubPathMatches,
  uiTypeIs,
} from '@jsonforms/core';

import EnumArrayRenderer from './EnumArrayRenderer.vue';

// EnumArrayRenderer
const hasOneOfItems = (schema: JsonSchema): boolean =>
  schema.oneOf !== undefined &&
  schema.oneOf.length > 0 &&
  (schema.oneOf as JsonSchema[]).every((entry: JsonSchema) => {
    return entry.const !== undefined;
  });

const hasEnumItems = (schema: JsonSchema): boolean =>
  schema.type === 'string' && schema.enum !== undefined;

const enumArrayRendererEntry: JsonFormsRendererRegistryEntry = {
  renderer: EnumArrayRenderer,
  tester: rankWith(
    5,
    and(
      uiTypeIs('Control'),
      and(
        schemaMatches(
          (schema) =>
            hasType(schema, 'array') &&
            !Array.isArray(schema.items) &&
            schema.uniqueItems === true
        ),
        schemaSubPathMatches('items', (schema) => {
          return hasOneOfItems(schema) || hasEnumItems(schema);
        })
      )
    )
  ),
};

export { EnumArrayRenderer };

export const complexRenderers: JsonFormsRendererRegistryEntry[] = [
  enumArrayRendererEntry,
];
