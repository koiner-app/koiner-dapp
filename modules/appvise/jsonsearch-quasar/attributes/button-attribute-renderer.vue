<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <q-btn
      v-bind="buttonProps"
      :icon="appliedOptions.icon"
      :to="routerLink(result)"
      :class="`${styles.attribute.button}`"
    >
      <span v-if="appliedOptions.i18n">{{ t(appliedOptions.i18n) }}</span>
    </q-btn>
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

// TODO: Find better way to load props
export const allowedButtonProps = ['size', 'flat', 'dense', 'round'];

export default defineComponent({
  name: 'ButtonAttributeRenderer',
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
    const attributeControl = useQuasarAttribute(useJsonAttribute(props));
    const { t } = useI18n();
    const buttonProps: any = {};

    if (attributeControl.appliedOptions.value.button) {
      for (const [propKey, propValue] of Object.entries(
        attributeControl.appliedOptions.value.button
      )) {
        if (allowedButtonProps.includes(propKey)) {
          buttonProps[propKey] = propValue;
        }
      }
    }

    return {
      ...attributeControl,
      t,
      buttonProps,
    };
  },
});
</script>
