import Ajv, { Options } from 'ajv';
import { createAjv as createAjvCore } from '@jsonforms/core';

// TODO: Fix123
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const createAjv = (options?: Options): Ajv => {
  // TODO: Fix123
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const ajv = createAjvCore(options);
  ajv.addFormat('password', (_) => true);
  return ajv;
};
