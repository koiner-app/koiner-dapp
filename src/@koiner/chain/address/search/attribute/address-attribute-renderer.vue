<template>
  <attribute-wrapper
    v-if="rawValue(result.node) != null"
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <router-link
      :to="to(rawValue(result.node))"
      :class="`${styles.attribute.link}`"
    >
      <q-icon v-if="appliedOptions.icon" :name="appliedOptions.icon" />
      <span v-if="!appliedOptions.icon">{{ rawValue(result.node) }}</span>
    </router-link>
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
  name: 'AddressAttributeRenderer',
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

    const to = (data: Record<string, unknown>) => {
        // Use route with params
        return {
          name: 'address',
          params: { id: data },
        };
    };

    return {
      ...attributeControl,
      to,
    };
  },
});
</script>
