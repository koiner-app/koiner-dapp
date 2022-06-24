<script lang="ts">
import { JsonForms } from '@jsonforms/vue';
import { quasarRenderers } from '@appvise/jsonforms-quasar/renderers';
// import { JsonFormsI18nState, Translator } from '@jsonforms/core/src/i18n/i18nTypes';
// import { useI18n } from 'vue-i18n';
import { ErrorObject } from 'ajv';
import { PropType, ref } from 'vue';
import { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import { createAjv } from '@appvise/jsonforms-quasar/util/validator';

const renderers = [
  ...quasarRenderers,
];

/**
 * Setup base form which will take care of loading QuasarRenderers + translators
 */
export default {
  name: 'QJsonForms',
  components: {
    JsonForms,
  },
  extends: JsonForms,
  props: {
    renderers: {
      required: false,
      type: Object as PropType<JsonFormsRendererRegistryEntry[]>,
      // Freeze renderers for performance gains
      default: Object.freeze(renderers),
    },
  },
  emits: ['change', 'submit', 'cancel', 'custom', 'validationModeChanged'],

  setup() {
    const valid = ref(false);
    const validationMode = ref('ValidateAndHide');

    // const { t } = useI18n({
    //   fallbackWarn: false,
    // });

    // const i18n: JsonFormsI18nState = {
    //   translate: (id: string, defaultMessage: string, values?: any) => {
    //     if (!id) {
    //       return defaultMessage;
    //     }
    //
    //     return t(id, values) ?? defaultMessage;
    //   },
    //   translateError:  (error: ErrorObject, translate: Translator) => {
    //     let messageId = error.message
    //
    //     // Reverse engineer original message by using parsed params
    //     for (const [key, param] of Object.entries(error.params)) {
    //       messageId = messageId.replace(`'${param}'`, `{${key}}`);
    //
    //       // Translate each field title with an error
    //       const title = error.parentSchema.properties[param].title;
    //       error.params[key] = translate(title, title);
    //     }
    //
    //     return translate(messageId, messageId, error.params);
    //   }
    // }

    const ajv = createAjv();

    return {
      ajv,
      // i18n,

      valid,
      validationMode,

      // Allowed button events. Other button events will be triggered with the 'custom' event
      buttonEvents: ['submit', 'cancel'],
    };
  },

  // computed: {
  //   componentProps() {
  //     return this.$props;
  //   },
  //
  //   computedButtonKeys(): string[] {
  //     return this.buttonsKeys(this.uischema.elements);
  //   },
  //
  //   /** Return data for button events to watch */
  //   errors(): ErrorObject[] {
  //     return this.jsonforms.core.errors;
  //   },
  // },
  //
  // watch: {
  //   validationMode(newValue) {
  //     this.$emit('validationModeChanged', newValue);
  //   },
  //
  //   data() {
  //     this.emitButtons();
  //   },
  // },

  methods: {
    /** Recursively retrieve keys for button elements */
    buttonsKeys(elements: any[], keys: string[] = []): string[] {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].type === 'Button') {
          // Get property key from scope
          keys.push(elements[i].scope.replace('#/properties/', ''))
        }

        if (elements[i].elements != null) {
          keys = this.buttonsKeys(elements[i].elements, keys);
        }
      }

      return keys;
    },

    /**
     * Emit actions for clicked buttons
     */
    emitButtons(): void {
    //   for (let i = 0; i < this.computedButtonKeys.length; i++) {
    //     const fieldName = this.computedButtonKeys[i];
    //
    //     this.valid = this.errors.length === 0;
    //
    //     if (this.jsonforms.core.data[fieldName]) {
    //       // Reset value for field to enable another click
    //       this.jsonforms.core.data[fieldName] = false
    //
    //       // Only trigger allowed buttonEvents directly
    //       if (this.buttonEvents.includes(fieldName)) {
    //         if (fieldName === 'submit') {
    //           // Make sure validation errors are shown
    //           this.validationMode = 'ValidateAndShow';
    //
    //           // Only trigger submit if validation succeeded
    //           if (this.valid) {
    //             this.$emit(fieldName);
    //           }
    //         } else {
    //           this.$emit(fieldName);
    //         }
    //       } else {
    //         // Otherwise, use the custom event
    //         this.$emit('custom', fieldName);
    //       }
    //     }
    //   }
    }
  },
};
</script>
