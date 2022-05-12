import { FilterInput } from '@appvise/graphql/connection/filter-input';

export class FilterTransformer {
  public static transform(filter: FilterInput): any {
    const output: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(filter)) {
      if (value != null) {
        if (typeof value === 'string') {
          output[key] = {
            contains: value,
          };
        } else if (typeof value === 'number') {
          output[key] = {
            equals: value,
          };
        } else if (typeof value === 'boolean') {
          output[key] = {
            equals: value,
          };
        }
      }
    }

    return output;
  }
}
