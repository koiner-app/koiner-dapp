import {
  composePaths,
  computeLabel,
  getFirstPrimitiveProp,
  isDescriptionHidden,
  JsonFormsSubStates,
  Resolve,
} from '@jsonforms/core';
import { cloneDeep, merge } from 'lodash';
import { useStyles } from '../styles';
import { computed, ComputedRef, inject, ref } from 'vue';
import Ajv from 'ajv';
import { getI18nKeyPrefix } from '@jsonforms/core';

const useControlAppliedOptions = <I extends { control: any }>(input: I) => {
  return computed(() =>
    merge(
      {},
      cloneDeep(input.control.value.config),
      cloneDeep(input.control.value.uischema.options)
    )
  );
};

const useComputedLabel = <I extends { control: any }>(
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

const useComputedHtmlLabel = <I extends { control: any }>(
  input: I,
  appliedOptions: ComputedRef<any>
) => {
  return computed((): string => {
    return `${input.control.value.label ?? ''}${ input.control.value.required && !!appliedOptions.value?.hideRequiredAsterisk ? '' : '<span class="asterisk">*</span>'}`;
  });
};

const useComputedDescription = <I extends { control: any }>(
  input: I,
) => {
  const prefix = getI18nKeyPrefix(input.control.value.schema, input.control.value.uischema, input.control.value.path);

  return computed((): string => {
    // When using i18n prefixes for labels description will also be loaded even when there is no translation for them.
    // So only return description if it is translated. If description includes the prefix it's not translated.
    return input.control.value.description && !input.control.value.description.includes(prefix) ? input.control.value.description : undefined;
  });
};

/**
 * Adds styles, isFocused, appliedOptions and onChange
 */
export const useQuasarControl = <
  I extends { control: any; handleChange: any }
>(
    input: I,
  // eslint-disable-next-line no-unused-vars
    adaptValue: (target: any) => any = (v) => v,
  ) => {
  const appliedOptions = useControlAppliedOptions(input);

  const isFocused = ref(false);
  const onChange = (value: any) => {
    input.handleChange(input.control.value.path, adaptValue(value));
  };

  const onButtonClick = () => {
    input.handleChange(input.control.value.path, adaptValue(true));
  };

  const persistentHint = (): boolean => {
    return !isDescriptionHidden(
      input.control.value.visible,
      input.control.value.description,
      isFocused.value,
      !!appliedOptions.value?.showUnfocusedDescription
    );
  };

  const computedLabel = useComputedLabel(input, appliedOptions);
  const computedHtmlLabel = useComputedHtmlLabel(input, appliedOptions);
  const computedDescription = useComputedDescription(input);

  const controlWrapper = computed(() => {
    const { id, description, errors, label, visible, required } =
      input.control.value;
    return { id, description, errors, label, visible, required };
  });

  const styles = useStyles(input.control.value.uischema);

  return {
    ...input,
    styles,
    isFocused,
    appliedOptions,
    controlWrapper,
    onChange,
    onButtonClick,
    persistentHint,
    computedLabel,
    computedHtmlLabel,
    computedDescription,
    isDisabled: input.control.enabled === false ? false : undefined,
  };
};

export const useTranslator = () => {
  const jsonforms = inject<JsonFormsSubStates>('jsonforms');

  if (!jsonforms) {
    throw new Error(
      "'jsonforms couldn't be injected. Are you within JSON Forms?"
    );
  }

  if (!jsonforms.i18n || !jsonforms.i18n.translate) {
    throw new Error(
      "'jsonforms i18n couldn't be injected. Are you within JSON Forms?"
    );
  }

  const translate = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return jsonforms.i18n!.translate!;
  });

  return translate;
};

/**
 * Adds styles and appliedOptions
 */
export const useQuasarLayout = <I extends { layout: any }>(input: I) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      cloneDeep(input.layout.value.config),
      cloneDeep(input.layout.value.uischema.options)
    )
  );
  return {
    ...input,
    styles: useStyles(input.layout.value.uischema),
    appliedOptions,
  };
};

/**
 * Adds styles, appliedOptions and childUiSchema
 */
export const useQuasarArrayControl = <I extends { control: any }>(
  input: I
) => {
  const appliedOptions = useControlAppliedOptions(input);

  const computedLabel = useComputedLabel(input, appliedOptions);

  const childLabelForIndex = (index: number) => {
    const childLabelProp =
      input.control.value.uischema.options?.childLabelProp ??
      getFirstPrimitiveProp(input.control.value.schema);
    if (!childLabelProp) {
      return `${index}`;
    }
    const labelValue = Resolve.data(
      input.control.value.data,
      composePaths(`${index}`, childLabelProp)
    );
    if (
      labelValue === undefined ||
      labelValue === null ||
      Number.isNaN(labelValue)
    ) {
      return '';
    }
    return `${labelValue}`;
  };
  return {
    ...input,
    styles: useStyles(input.control.value.uischema),
    appliedOptions,
    childLabelForIndex,
    computedLabel,
  };
};

/**
 * Adds styles and appliedOptions
 */
export const useQuasarBasicControl = <I extends { control: any }>(
  input: I
) => {
  const appliedOptions = useControlAppliedOptions(input);

  return {
    ...input,
    styles: useStyles(input.control.value.uischema),
    appliedOptions,
  };
};

/**
 * Extracts Ajv from JSON Forms
 */
export const useAjv = () => {
  const jsonforms = inject<JsonFormsSubStates>('jsonforms');

  // console.log('useAJV');
  // console.log(jsonforms.core?.ajv);
  if (!jsonforms) {
    throw new Error(
      "'jsonforms' couldn't be injected. Are you within JSON Forms?"
    );
  }

  // should always exist
  // TODO: Fix typing
  return jsonforms.core?.ajv as unknown as any; // Ajv;
};
