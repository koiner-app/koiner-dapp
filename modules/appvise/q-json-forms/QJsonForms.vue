<template>
  <q-form :class="formClass">
    <json-forms
      :renderers="renderers"
      :validation-mode="internalValidationMode"
      :data="data"
      :schema="schema"
      :uischema="computedUiSchema"
      :cells="cells"
      :config="config"
      :readonly="readonly"
      :uischemas="uischemas"
      :ajv="ajv"
      :i18n="i18n"
      :additionalErrors="additionalErrors"
      @change="onChange"
    />
  </q-form>
</template>

<script lang="ts">
import { JsonForms, JsonFormsChangeEvent, MaybeReadonly } from '@jsonforms/vue';
import { createAjv, quasarRenderers } from '@appvise/jsonforms-quasar';
import { computed, defineComponent, PropType, Ref, ref, watch } from 'vue';
import {
  JsonFormsRendererRegistryEntry,
  JsonFormsI18nState,
  ValidationMode,
  JsonSchema,
  UISchemaElement,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
  Translator,
} from '@jsonforms/core';
import { useI18n } from 'vue-i18n';
import { searchManagerRenderers } from '@appvise/jsonforms-search-manager';
import {
  Categorization,
  isInternationalized,
  Layout,
} from '@jsonforms/core/src/models/uischema';
import { ErrorObject } from 'ajv';
import _ from 'lodash';
import { useQuasar } from 'quasar';

// TODO: Load project default renderers from config?
const renderers = [...quasarRenderers, ...searchManagerRenderers];

/**
 * Setup base form which will take care of loading QuasarRenderers + translators
 */
export default defineComponent({
  name: 'QJsonForms',
  components: {
    JsonForms,
  },
  props: {
    formClass: {
      required: false,
      type: String,
    },
    // Adapted props
    renderers: {
      required: false,
      type: Object as PropType<JsonFormsRendererRegistryEntry[]>,
      // Freeze renderers for performance gains
      default: Object.freeze(renderers),
    },
    validationMode: {
      required: false,
      type: String as PropType<ValidationMode>,
    },
    // Same as original
    data: {
      required: true,
      type: [String, Number, Boolean, Array, Object] as PropType<any>,
    },
    schema: {
      required: false,
      type: [Object, Boolean] as PropType<JsonSchema>,
      default: undefined,
    },
    uischema: {
      required: false,
      type: Object as PropType<UISchemaElement>,
      default: undefined,
    },
    cells: {
      required: false,
      type: Array as PropType<
        MaybeReadonly<JsonFormsCellRendererRegistryEntry[]>
      >,
      default: () => [],
    },
    config: {
      required: false,
      type: Object as PropType<any>,
      default: undefined,
    },
    readonly: {
      required: false,
      type: Boolean,
      default: false,
    },
    uischemas: {
      required: false,
      type: Array as PropType<MaybeReadonly<JsonFormsUISchemaRegistryEntry[]>>,
      default: () => [],
    },
    additionalErrors: {
      required: false,
      type: Array as PropType<ErrorObject[]>,
      default: () => [],
    },
    dynamicOptions: {
      required: false,
      type: Object as PropType<object>,
      default: () => {
        return {};
      },
    },
    autoSave: {
      type: Boolean,
      required: false,
      default: false,
    },
    autoSaveDelay: {
      type: Number,
      required: false,
      default: 1000,
    },
    submitting: {
      required: false,
      type: Boolean,
    },
    submit: {
      type: Function,
      required: false,
    },
  },
  emits: [
    'change',
    'submit',
    'cancel',
    'previousStep',
    'nextStep',
    'custom',
    'validationModeChanged',
    'errors',
  ],

  setup(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    props: any,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { emit }: any
  ) {
    const $q = useQuasar();

    const validationMode: Ref<
      'ValidateAndHide' | 'ValidateAndShow' | 'NoValidation'
    > = ref('ValidateAndHide');
    const isSubmitting = ref(false);
    const loaded = ref(false);

    // Allowed button events. Other button events will be triggered with the 'custom' event
    const allowedButtonEvents = [
      'submit',
      'cancel',
      'previousStep',
      'nextStep',
      'skipSteps',
    ];

    const errors: Ref<any[]> = ref([]); // ErrorObject[]

    const { t } = useI18n();
    const ajv = createAjv({
      allErrors: true,
      verbose: true,
    });

    const i18n: Partial<JsonFormsI18nState> = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // TODO: How to match signature to ignore is not necessary
      translate: (
        id: string,
        defaultMessage: string | undefined,
        values?: any
      ): string | undefined => {
        // Ignore translations with .error. key so translateError can handle these messages
        return !id.includes('.error.')
          ? t(id, values) ?? defaultMessage
          : undefined;
      },
      translateError: (
        error: ErrorObject,
        t: Translator,
        uischema: UISchemaElement | undefined
      ) => {
        if (!error.message) {
          return 'no error';
        }

        let messageId = error.message;
        const params: Record<string, unknown> = {};

        // // Reverse engineer original message by using parsed params
        for (const [key, param] of Object.entries(error.params)) {
          messageId = messageId.replace(`'${param}'`, `{${key}}`);
          messageId = messageId.replace(`${param}`, `{${key}}`);

          params[key] = param;
        }

        // i18n holds prefixed translation key for field and is set inside useQuasarControl -> composition.ts
        if (uischema && isInternationalized(uischema) && uischema.i18n) {
          // Property name so translations can use it
          if (!params['property']) {
            params['property'] = t(`${uischema.i18n}.label`, '');
          }

          // Also translate for required translation
          if (params['missingProperty']) {
            params['missingProperty'] = t(`${uischema.i18n}.label`, '');
          }
        }

        // Translate message again with params that hold translated labels
        return t(`error.${messageId}`, messageId, params);
      },
    };

    const computedButtonKeys = computed((): string[] => {
      return buttonsKeys((props.uischema as Layout | Categorization).elements);
    });

    const valid = computed((): boolean => {
      console.log(errors);
      return errors.value.length === 0;
    });

    /** Recursively retrieve keys for button elements */
    // eslint-disable-next-line
    const buttonsKeys = (elements: any[], keys: string[] = []): string[] => {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].type === 'Button') {
          // Get property key from scope
          keys.push(elements[i].scope.replace('#/properties/', ''));
        }

        if (elements[i].elements) {
          keys = buttonsKeys(elements[i].elements, keys);
        }
      }

      return keys;
    };

    const submit = async (event: JsonFormsChangeEvent) => {
      // Make sure validation errors are shown

      validationMode.value = props.validationMode ?? 'ValidateAndShow';

      // Only trigger submit if validation succeeded
      if (valid.value) {
        isSubmitting.value = true;

        if (props.submit) {
          // Execute callback
          console.log('Execute submit callback');

          try {
            await props.submit();
          } catch (error: any) {
            $q.notify({
              message: t(error),
              type: 'negative',
            });
          }
        } else {
          console.log('Trigger submit event');

          // Trigger event if no callback is provided
          await emit('submit', event.data);
        }

        isSubmitting.value = false;
      } else {
        // Reset value for field to enable another click
        delete props.data['submit'];
      }
    };

    /**
     * Emit actions for clicked buttons
     */
    const emitButtons = (event: JsonFormsChangeEvent): void => {
      for (let i = 0; i < computedButtonKeys.value.length; i++) {
        const fieldName = computedButtonKeys.value[i];

        if (props.data[fieldName]) {
          // Reset value for field to enable another click
          delete props.data[fieldName];

          // // Only trigger allowed button events directly
          if (allowedButtonEvents.includes(fieldName)) {
            if (fieldName === 'previousStep') {
              event.data.activeStep -= 1;
            }

            if (fieldName === 'nextStep') {
              if (event.data.activeStep) {
                event.data.activeStep += 1;
              }
            }

            if (fieldName === 'skipSteps') {
              if (event.data.stepCount) {
                event.data.activeStep = event.data.stepCount;
              }
            }

            if (fieldName === 'submit') {
              submit(event.data);
            } else {
              emit(fieldName);
            }
          } else {
            // Otherwise, use the custom event
            emit('custom', fieldName);
          }
        }
      }
    };

    watch(validationMode, (newValue) => {
      emit('validationModeChanged', newValue);
    });

    const debouncedSubmit = _.debounce((submit: any, args: any) => {
      submit(args);
    }, props.autoSaveDelay);

    const onChange = (event: JsonFormsChangeEvent) => {
      errors.value = event.errors ?? [];
      emit('errors', errors.value);

      emitButtons(event);

      // Propagate event
      emit('change', event);

      if (loaded.value && props.autoSave) {
        // Prevent submitting on load by checking loaded
        debouncedSubmit(submit, event);
      }

      // Prevent double submitting when parent form syncs data from onChange event
      loaded.value = false;

      setTimeout(() => {
        loaded.value = true;
      }, 1000);
    };

    return {
      isSubmitting,
      ajv,
      i18n,

      valid,
      errors,
      internalValidationMode: validationMode,
      emitButtons,
      onChange,
      computedUiSchema: computed(() => {
        const uischema = props.uischema;

        // Can be used to check state of form
        // Used by ButtonControlRenderer with type=submit
        uischema.options.submitting = isSubmitting;

        if (props.submitting) {
          uischema.options.submitting = isSubmitting.value;
        }

        // Allow parent component to supply dynamic properties to be used by renderer components
        uischema.options.dynamicOptions = props.dynamicOptions;

        return uischema;
      }),
    };
  },
  watch: {
    submitting: {
      immediate: true,
      handler(newValue) {
        this.isSubmitting = newValue;
      },
    },
  },
});
</script>
