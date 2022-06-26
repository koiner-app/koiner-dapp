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

  const rawValue = (data: Record<string, unknown>): any => {
    if (appliedOptions.value.mapping) {
      const mappingFields = appliedOptions.value.mapping.split('.');

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
