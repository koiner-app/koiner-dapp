import { and, schemaTypeIs, uiTypeIs } from '@jsonforms/core';

const isBooleanAttributeControl = and(
  uiTypeIs('Attribute'),
  schemaTypeIs('boolean')
);
const isNumericAttributeControl = and(
  uiTypeIs('Attribute'),
  schemaTypeIs('number')
);
const isObjectAttributeControl = and(
  uiTypeIs('Attribute'),
  schemaTypeIs('object')
);
const isStringAttributeControl = and(
  uiTypeIs('Attribute'),
  schemaTypeIs('string')
);

export {
  isBooleanAttributeControl,
  isNumericAttributeControl,
  isObjectAttributeControl,
  isStringAttributeControl,
};
