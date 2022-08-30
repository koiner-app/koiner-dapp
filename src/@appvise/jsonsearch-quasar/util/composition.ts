import { cloneDeep, merge } from 'lodash';
import { useStyles } from '../styles';
import { computed, ComputedRef } from 'vue';
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
      !!appliedOptions.value?.hideRequiredAsterisk
    );
  });
};

/**
 * Adds styles and appliedOptions
 */
export const useQuasarSearchView = <I extends { searchView: any }>(
  input: I
) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      cloneDeep(input.searchView.value.config),
      cloneDeep(input.searchView.value.uischema.options)
    )
  );
  return {
    ...input,
    styles: useStyles(input.searchView.value.uischema),
    appliedOptions,
  };
};

/**
 * Adds styles, isFocused, appliedOptions and onChange
 */
export const useQuasarAttribute = <I extends { control: any }>(input: I) => {
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

      let field: any = data;

      for (let i = 0; i < mappingFields.length; i++) {
        const mappingField = mappingFields[i];

        if (field[mappingField] != null) {
          // Mapped subfield found
          field = field[mappingField];
        } else {
          // Return normal path if custom mapping fails
          return data[input.control.value.path];
        }
      }

      // Return mapped field
      return field;
    }

    return data[input.control.value.path];
  };

  const mappedValue = (
    data: Record<string, unknown>,
    mappingKey: string
  ): any => {
    if (
      appliedOptions.value.mappings &&
      appliedOptions.value.mappings[mappingKey]
    ) {
      const mappingFields =
        appliedOptions.value.mappings[mappingKey].split('.');

      let field: any = data;

      for (let i = 0; i < mappingFields.length; i++) {
        if (field[mappingFields[i]]) {
          field = field[mappingFields[i]];
        } else {
          // Return normal path if custom mapping fails
          return data[input.control.value.path];
        }
      }

      // Return mapped field
      return field;
    }

    return data[input.control.value.path];
  };

  const routerLink = (data: Record<string, unknown>) => {
    if (appliedOptions.value.route) {
      const params: Record<string, string | number> = {};

      if (appliedOptions.value.linkParams) {
        const linkParams: string[] = appliedOptions.value.linkParams;
        for (const linkParam of linkParams) {
          params[linkParam] = mappedValue(data, linkParam);
        }
      }

      // Use route with params
      return {
        name: appliedOptions.value.route,
        params,
      };
    }

    // Use raw data as link
    return data;
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
  };
};
