import { cloneDeep, merge } from 'lodash';
import { useStyles } from '../styles';
import { computed, ComputedRef, unref } from 'vue';
import { computeLabel } from '@jsonforms/core';

const useAttributeAppliedOptions = <I extends { control: any }>(input: I) => {
  return computed(() =>
    merge(
      {},
      cloneDeep(input.control.value.config),
      cloneDeep(input.control.value.uischema.options)
    )
  );
};

const useComputedValue = <I extends { control: any }>(
  input: I,
  appliedOptions: ComputedRef<any>
) => {
  return computed((): string => {
    return computeLabel(
      input.control.value.label,
      input.control.value.required,
      !!appliedOptions.value?.hideRequiredAsterisk ||
        !input.control.value.required
    );
  });
};

/**
 * Adds styles and appliedOptions
 */
export const useQuasarSearchView = <
  I extends { control: any; handleChange: any }
>(
  input: I
) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      cloneDeep(input.control.value.config),
      cloneDeep(input.control.value.uischema.options)
    )
  );

  const onChange = (value: any) => {
    input.handleChange(input.control.value.path, value);
  };

  const emitEvent = (name: string, data: Record<any, any>) => {
    input.handleChange('events', { [name]: data });
  };

  return {
    ...input,
    styles: useStyles(input.control.value.uischema),
    appliedOptions,
    onChange,
    emitEvent,
  };
};

/**
 * Adds styles, isFocused, appliedOptions and onChange
 */
export const useQuasarAttribute = <
  I extends { control: any; handleChange: any }
>(
  input: I
) => {
  const appliedOptions = useAttributeAppliedOptions(input);

  const computedValue = useComputedValue(input, appliedOptions);

  const attributeWrapper = computed(() => {
    const { id, description, errors, label, visible, required } =
      input.control.value;
    return { id, description, errors, label, visible, required };
  });

  const styles = useStyles(input.control.value.uischema);

  const replaceNestedMappings = (
    data: Record<string, unknown>,
    mappingKey: string
  ): string => {
    let nestedMappingKey;
    let resolvedMappingKey;

    // Use the value from another field as input for mapping of this field
    // Use : as separator for nested fields: {otherField:nestedField}
    if (mappingKey.includes('{') && mappingKey.includes('}')) {
      nestedMappingKey = mappingKey.substring(
        mappingKey.indexOf('{') + 1,
        mappingKey.indexOf('}') - mappingKey.indexOf('{')
      );

      resolvedMappingKey = rawValue(data, nestedMappingKey);
    }

    return nestedMappingKey && resolvedMappingKey
      ? mappingKey
          .replace(`{${nestedMappingKey}}`, resolvedMappingKey) // Replace {nestedMappingKey} with the resolved key
          .replace(':', '.') // Replace nested mappings separator : {my:other:mappingKey}
      : mappingKey;
  };

  // Retrieve rawValue for a field. Custom mappings can be used like:
  // someField.name
  // someField.{otherField:type}.name => someField.typeFromOtherField.name
  const rawValue = (
    data: Record<string, unknown>,
    mappingKey?: string
  ): any => {
    if (!mappingKey && appliedOptions.value.mapping) {
      // Use mapping from options if no mapping is provided
      mappingKey = appliedOptions.value.mapping;
    }

    if (mappingKey) {
      mappingKey = replaceNestedMappings(data, mappingKey);

      // Check if mappingKey is defined in mappings
      if (
        appliedOptions.value.mappings &&
        appliedOptions.value.mappings[mappingKey]
      ) {
        // Return value from mappings
        return mappedValue(data, mappingKey);
      }

      // Split mapping subfields, so we can find them 1 by 1
      const mappingFields = mappingKey.split('.');

      // Prefix mapping with edge to access properties on the root of the result
      if (mappingFields[0] === 'edge') {
        // Result === edge so remove from selection
        mappingFields.shift();
      } else {
        // Use node as default base if mapping is not set to edge
        mappingFields.unshift('node');
      }

      let field: any = data;

      for (let i = 0; i < mappingFields.length; i++) {
        const mappingField = mappingFields[i];

        if (field[mappingField] != null) {
          // Mapped subfield found
          field = field[mappingField];
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return data['node'][input.control.value.path];
        }
      }

      // Return mapped field
      return field;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return data['node'][input.control.value.path];
  };

  const mappedValue = (
    data: Record<string, unknown>,
    mappingKey: string,
    fallback = true
  ): any => {
    if (
      appliedOptions.value.mappings &&
      appliedOptions.value.mappings[mappingKey]
    ) {
      const mapping = appliedOptions.value.mappings[mappingKey];

      // Map to a hardcoded value by providing `value:XXX` as mapping
      if (mapping.includes('value:')) {
        return mapping.substring(mapping.indexOf('value:') + 6);
      }

      const mappingFields: string[] = mapping.split('.');

      // Prefix mapping with edge to access properties on the root of the result
      if (mappingFields[0] === 'edge') {
        // Result === edge so remove from selection
        mappingFields.shift();
      } else {
        // Use node as default base if mapping is not set to edge
        mappingFields.unshift('node');
      }

      let field: any = data;

      for (let i = 0; i < mappingFields.length; i++) {
        if (field[mappingFields[i]] != null) {
          field = field[mappingFields[i]];
        } else {
          if (fallback) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return data['node'][input.control.value.path];
          }

          return null;
        }
      }

      // Return mapped field
      return field;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return data['node'][input.control.value.path];
  };

  const routerLink = (result: Record<string, unknown>) => {
    if (appliedOptions.value.route) {
      const params: Record<string, string | number> = {};
      const query: Record<string, string> = {};

      if (appliedOptions.value.linkParams) {
        const linkParams: string[] = appliedOptions.value.linkParams;
        for (const linkParam of linkParams) {
          params[linkParam] = mappedValue(result, linkParam);
        }
      }

      if (appliedOptions.value.linkQuery) {
        const linkQueryItems: string[] = appliedOptions.value.linkQuery;
        for (const linkQueryItem of linkQueryItems) {
          query[linkQueryItem] = mappedValue(result, linkQueryItem);
        }
      }

      // Use route with params
      return {
        name: appliedOptions.value.route,
        params,
        query,
      };
    }

    // Use raw data as link
    return result;
  };

  const emitEvent = (name: string, data: Record<any, any>) => {
    input.handleChange('events', { [name]: data });
  };

  const filterValue = (request: any): string | undefined => {
    const id =
      appliedOptions.value.path ??
      unref(input.control).path.replace('filters.', ''); // Remove property parent (filters)

    return request?.filter &&
      request?.filter[id] &&
      request?.filter[id].iContains
      ? request?.filter[id].iContains
      : undefined;
  };

  return {
    ...input,
    styles,
    appliedOptions,
    attributeWrapper,
    computedValue,
    isDisabled: input.control.enabled === false ? false : undefined,
    rawValue,
    mappedValue,
    routerLink,
    emitEvent,
    filterValue,
  };
};
