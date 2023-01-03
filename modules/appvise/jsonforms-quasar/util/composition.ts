import {
  composePaths,
  computeLabel,
  getFirstPrimitiveProp,
  getI18nKeyPrefix,
  isDescriptionHidden,
  JsonFormsSubStates,
  mapDispatchToMultiEnumProps,
  mapStateToMultiEnumControlProps,
  Resolve,
} from '@jsonforms/core';
import { cloneDeep, merge } from 'lodash';
import { useStyles } from '../styles';
import { computed, ComputedRef, inject, ref } from 'vue';
import { ControlProps, useControl } from '@jsonforms/vue';

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
  const label = input.control.value.label;

  return computed((): string => {
    return computeLabel(
      label,
      input.control.value.required,
      !!appliedOptions.value?.hideRequiredAsterisk
    );
  });
};

const useComputedHtmlLabel = <I extends { control: any }>(
  input: I,
  appliedOptions: ComputedRef<any>
) => {
  const label = input.control.value.label;

  return computed((): string => {
    return `${label ?? ''}${
      input.control.value.required &&
      !!appliedOptions.value?.hideRequiredAsterisk
        ? ''
        : '<span class="asterisk">*</span>'
    }`;
  });
};

const useComputedDescription = <I extends { control: any }>(input: I) => {
  const description = input.control.value.description;

  return computed((): string => {
    return description;
  });
};

export const getI18nKeyPrefix2 = (input: { control: any }): string => {
  const jsonforms = inject<JsonFormsSubStates>('jsonforms');

  let rootI18nPrefix = '';
  if (jsonforms) {
    rootI18nPrefix = jsonforms.core?.uischema?.options?.i18n;
  }

  let i18nPrefix: string;

  if (input.control.value.uischema.i18n) {
    // Use the exact i18n key if provided
    i18nPrefix = input.control.value.uischema.i18n;
  } else {
    // Otherwise, combine prefix with control.path and a possible root prefix
    i18nPrefix = `${getI18nKeyPrefix(
      input.control.value.schema,
      input.control.value.uischema,
      input.control.value.path
    )}`;

    if (rootI18nPrefix) {
      i18nPrefix = `${rootI18nPrefix}.${i18nPrefix}`;
    }
  }

  return i18nPrefix;
};

/**
 * Adds styles, isFocused, appliedOptions and onChange
 */
export const useQuasarControl = <I extends { control: any; handleChange: any }>(
  input: I,
  // eslint-disable-next-line no-unused-vars
  adaptValue: (target: any) => any = (v) => v
) => {
  const basicControl = useQuasarBasicControl(input);
  const t = useTranslator();

  const onChange = (value: any) => {
    input.handleChange(input.control.value.path, adaptValue(value));
  };

  const onButtonClick = () => {
    input.handleChange(input.control.value.path, adaptValue(true));
  };

  // Translate anyOf options
  // TODO: Create reusable way to translate options for controls
  if (input.control.value.schema.anyOf) {
    for (let i = 0; i < input.control.value.schema.anyOf.length; i++) {
      if (input.control.value.schema.anyOf[i].title) {
        input.control.value.schema.anyOf[i].title = t(
          input.control.value.schema.anyOf[i].title,
          input.control.value.schema.anyOf[i].title
        );
      }
    }
  }

  return {
    ...input,
    ...basicControl,
    isDisabled: input.control.enabled === false ? false : undefined,

    onChange,
    onButtonClick,
  };
};

export const useJsonFormsMultiEnumControl = (props: ControlProps) => {
  return useControl(
    props,
    mapStateToMultiEnumControlProps,
    mapDispatchToMultiEnumProps
  );
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

  return jsonforms.i18n!.translate;
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

  const jsonforms = inject<JsonFormsSubStates>('jsonforms');

  let rootI18nPrefix = '';
  if (jsonforms) {
    rootI18nPrefix = jsonforms.core?.uischema?.options?.i18n;
  }

  let i18nPrefix: string;

  if (input.layout.value.uischema.i18n) {
    // Use the exact i18n key if provided
    i18nPrefix = input.layout.value.uischema.i18n;
  } else {
    // Otherwise, combine prefix with layout.path and a possible root prefix
    i18nPrefix = `${getI18nKeyPrefix(
      input.layout.value.schema,
      input.layout.value.uischema,
      input.layout.value.path
    )}`;

    if (rootI18nPrefix) {
      i18nPrefix = `${rootI18nPrefix}.${i18nPrefix}`;
    }
  }

  const t = useTranslator();

  // Try translating labels for each element
  for (let i = 0; i < input.layout.value.uischema.elements.length; i++) {
    if (
      input.layout.value.uischema.elements[i].label &&
      input.layout.value.uischema.elements[i].label.includes('.') // Prevents double translating on reload
    ) {
      const i18nLabelKey =
        `${i18nPrefix}.${input.layout.value.uischema.elements[i].label}`.replace(
          'root.',
          ''
        );

      const labelTranslation = t(i18nLabelKey, '');

      // Only update if translated
      if (labelTranslation !== '') {
        input.layout.value.uischema.elements[i].label = labelTranslation;
      }
    }
  }

  return {
    ...input,
    styles: useStyles(input.layout.value.uischema),
    appliedOptions,
  };
};

/**
 * Adds styles, appliedOptions and childUiSchema
 */
export const useQuasarArrayControl = <I extends { control: any }>(input: I) => {
  const appliedOptions = useControlAppliedOptions(input);
  const i18nPrefix = getI18nKeyPrefix2(input);
  const t = useTranslator();

  const i18nLabelPrefix = input.control.value.uischema.i18n ?? i18nPrefix;
  const labelTranslation = t(`${i18nLabelPrefix}.label`, '');

  // Only update if translated
  if (labelTranslation !== '') {
    input.control.value.label = labelTranslation;
  }

  const computedLabel = !input.control.value.label.endsWith('.label')
    ? useComputedLabel(input, appliedOptions)
    : '';

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
export const useQuasarBasicControl = <I extends { control: any }>(input: I) => {
  const appliedOptions = useControlAppliedOptions(input);

  const isFocused = ref(false);

  const persistentHint = (): boolean => {
    return !isDescriptionHidden(
      input.control.value.visible,
      input.control.value.description,
      isFocused.value,
      !!appliedOptions.value?.showUnfocusedDescription
    );
  };

  const i18nPrefix = getI18nKeyPrefix2(input);

  const t = useTranslator();

  const i18nLabelPrefix = input.control.value.uischema.i18n ?? i18nPrefix;
  const labelTranslation = t(`${i18nLabelPrefix}.label`, '');

  // Only update if translated
  if (labelTranslation !== '') {
    input.control.value.label = labelTranslation;
  }

  const i18nLabelDescriptionKey = `${i18nPrefix}.description`;
  const translatedDescription = t(i18nLabelDescriptionKey, '');

  // Only update if translated
  if (!translatedDescription.includes(i18nPrefix)) {
    input.control.value.description = translatedDescription;
  }

  // TODO: Find out why field.description is always added to descriptions causing it incorrectly to be loaded
  if (input.control.value.description.endsWith('.description')) {
    input.control.value.description = '';
  }

  // Translate anyOf options
  // TODO: Create reusable way to translate options for controls
  if (input.control.value.schema.anyOf) {
    for (let i = 0; i < input.control.value.schema.anyOf.length; i++) {
      if (input.control.value.schema.anyOf[i].title) {
        input.control.value.schema.anyOf[i].title = t(
          input.control.value.schema.anyOf[i].title,
          input.control.value.schema.anyOf[i].title
        );
      }
    }
  }

  const computedLabel = useComputedLabel(input, appliedOptions);
  const computedHtmlLabel = useComputedHtmlLabel(input, appliedOptions);
  const computedDescription = useComputedDescription(input);

  const controlWrapper = computed(() => {
    const { id, description, errors, label, visible, required } =
      input.control.value;
    return { id, description, errors, label, visible, required };
  });

  const styles = useStyles(input.control.value.uischema);

  // Make sure an i18n is always present so controls + error validation can use it
  if (!input.control.value.uischema.i18n) {
    input.control.value.uischema.i18n = i18nPrefix;
  }

  const jsonforms = inject<JsonFormsSubStates>('jsonforms');

  return {
    ...input,
    controlWrapper,
    styles,
    isFocused,
    appliedOptions,
    persistentHint,
    computedLabel,
    computedHtmlLabel,
    computedDescription,
    isDisabled: input.control.enabled === false ? false : undefined,
    rootUiSchema: jsonforms?.core?.uischema,
  };
};

/**
 * Extracts Ajv from JSON Forms
 */
export const useAjv = () => {
  const jsonforms = inject<JsonFormsSubStates>('jsonforms');

  if (!jsonforms) {
    throw new Error(
      "'jsonforms' couldn't be injected. Are you within JSON Forms?"
    );
  }

  // should always exist
  // TODO: Fix typing
  return jsonforms.core?.ajv as unknown as any; // Ajv;
};
