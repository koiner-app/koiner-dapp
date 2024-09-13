<template>
  <attribute-wrapper
    v-if="rawValue(result)"
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <router-link :to="routerLink(result)" :class="`${styles.attribute.link}`">
      <q-icon v-if="appliedOptions.icon" :name="appliedOptions.icon" />
      <span v-if="!appliedOptions.icon">{{ rawValue(result) }}</span>
    </router-link>
  </attribute-wrapper>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue';
import AttributeWrapper from './attribute-wrapper.vue';
import {
  AttributeElement,
  useJsonAttribute,
  useQuasarAttribute,
} from '@appvise/jsonsearch-quasar';

export default defineComponent({
  components: {
    AttributeWrapper,
  },
  props: {
    result: {
      type: Object as PropType<any>,
      required: false,
      default: null,
    },
    ...rendererProps<AttributeElement>(),
  },
  setup(props: RendererProps<AttributeElement>) {
    const attributeControl = useQuasarAttribute(useJsonAttribute(props));

    return {
      ...attributeControl,
    };
  },
});
</script>
