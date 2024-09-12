export function mappedValue(
  data: Record<string, unknown>,
  mapping: string
): any {
  const mappingFields: string[] = mapping.split('.');

  let result: any = data;

  for (let i = 0; i < mappingFields.length; i++) {
    if (result[mappingFields[i]] != null) {
      // Sub mapping found, move to next
      result = result[mappingFields[i]];
    } else {
      // Mapping could not be resolved
      return;
    }
  }

  return result;
}

/**
 * source Key of field to use as datasource
 * selector Mapping to field from input to match records with for selecting the record from second data set
 * mapping Mapping key of record field to compare with mappedValue
 * fields Fields to return from matched object. Leave empty to return whole object
 */
export interface RecordMappingConfig {
  source: string;
  selector: string;
  mapping: string;
  fields?: string[];
}

/**
 * Add mapped record to input data
 * @param input Input data to add record to
 * @param data Data to select from
 * @param config Config with mappings for retrieving record
 */
export function getRecordFromDataset(
  input: Record<string, unknown>,
  data: Record<string, unknown>,
  config: RecordMappingConfig
): Record<string, unknown> | undefined {
  if (!Array.isArray(data[config.source])) {
    return;
  }

  // Retrieve selector value from input dataset
  const selectorValue = mappedValue(input, config.selector);

  if (!selectorValue) {
    return;
  }

  // Retrieve mapped record from second dataset and compare mapped value with selector value
  const records: Record<string, unknown>[] = data[config.source] as any;
  const record = records.find((_record) => {
    const result = mappedValue(_record, config.mapping);

    if (result === selectorValue) {
      return result;
    }
  });

  if (record && config.fields) {
    // Return specific fields
    const output: Record<string, unknown> = {};

    config.fields.forEach((key) => {
      output[key] = record[key];
    });

    return output;
  } else {
    // Return mapped object
    return record;
  }
}
