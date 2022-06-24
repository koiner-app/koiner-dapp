<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <q-chip :class="`chip-${rawValue(result.node)}`">
      {{ rawValue(result.node) }}
    </q-chip>
  </attribute-wrapper>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue';
import {
  AttributeWrapper,
  AttributeElement,
  useJsonAttribute,
  useQuasarAttribute,
} from '@appvise/jsonsearch-quasar';

export default defineComponent({
  name: 'BlockRewardAttributeRenderer',
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
    return useQuasarAttribute(useJsonAttribute(props));
  },
});
</script>

<style lang="scss">
.q-chip {
  &.chip-registration {
    color: #2a355e;
    background: #dbdff0;
  }
  &.chip-quotation {
    color: #ed7f03;
    background: #f9e6d1;
  }
  &.chip-delivery {
    color: #373737;
    background: #dddddd;
  }
  &.chip-completed {
    color: #1ba818;
    background: #dbf2da;
  }
}
</style>
