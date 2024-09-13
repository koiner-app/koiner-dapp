<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <q-icon v-if="rawValue(result)" :name="appliedOptions.icon">
      <q-tooltip v-if="appliedOptions.tooltip">
        {{ t(appliedOptions.tooltip) }}
      </q-tooltip>
    </q-icon>
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
  name: 'IconTagAttributeRenderer',
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

    return {
      ...attributeControl,
      t,
    };
  },
});
</script>
