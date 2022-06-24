import { and, schemaTypeIs, uiTypeIs } from '@jsonforms/core';

const isStringAttributeControl = and(
  uiTypeIs('Attribute'),
  schemaTypeIs('string')
);
const isBooleanAttributeControl = and(
  uiTypeIs('Attribute'),
  schemaTypeIs('boolean')
);
const isNumericAttributeControl = and(
  uiTypeIs('Attribute'),
  schemaTypeIs('number')
);

export {
  isStringAttributeControl,
  isBooleanAttributeControl,
  isNumericAttributeControl,
};
