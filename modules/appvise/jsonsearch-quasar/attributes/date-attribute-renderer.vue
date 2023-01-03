<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <span :class="`${styles.attribute.age}`">
      {{
        date.formatDate(
          rawValue(result.node),
          appliedOptions['dateFormat'] ?? 'YYYY-MM-DD HH:mm:ss.SSSZ'
        )
      }}
    </span>
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
import { timeAgo } from '../util';
import { date } from 'quasar';

export default defineComponent({
  name: 'DateAttributeRenderer',
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
    return {
      ...useQuasarAttribute(useJsonAttribute(props)),

      timeAgo,
      date,
    };
  },
});
</script>
