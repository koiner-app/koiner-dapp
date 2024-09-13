<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <span :class="`${styles.attribute.text}`" v-html="transformValue(result)" />
  </attribute-wrapper>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue';
import AttributeWrapper from './attribute-wrapper.vue';
import {
  AttributeElement,
  useJsonAttribute,
  useQuasarAttribute,
} from '@appvise/jsonsearch-quasar';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: {
    AttributeWrapper,
  },
  props: {
    ...rendererProps<AttributeElement>(),

    result: {
      type: Object as PropType<any>,
      required: false,
      default: null,
    },
  },
  setup(props: RendererProps<AttributeElement>) {
    const input = useQuasarAttribute(useJsonAttribute(props));
    const { t } = useI18n();

    const transformValue = (result: any): string => {
      const value = input.rawValue(result);

      if (input.appliedOptions.value.translate) {
        const i18nPrefix = input.appliedOptions.value.i18nPrefix;
        const translation = t(
          `${i18nPrefix ? i18nPrefix + '.' : ''}${value}`,
          value
        );

        // Return original value if translation still contains the prefix.
        // Then the translation is not found
        return i18nPrefix && translation.includes(i18nPrefix)
          ? value
          : translation;
      }

      if (
        (value == null || value === '') &&
        input.appliedOptions.value.emptyValueText
      ) {
        return input.appliedOptions.value.emptyValueText;
      }

      return value;
    };

    return {
      ...input,
      transformValue,
    };
  },
});
</script>
