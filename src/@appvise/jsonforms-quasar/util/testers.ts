import isEmpty from 'lodash/isEmpty';
import { schemaMatches, Tester } from '@jsonforms/core/src/testers/testers';

const formatIsForAnyType = (expectedFormat: string): Tester =>
  schemaMatches(
    (schema) => !isEmpty(schema) && schema.format === expectedFormat
  );

export { formatIsForAnyType };
