<template>
  <attribute-wrapper
    v-if="rawValue(result) != null"
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <router-link
      :to="to(rawValue(result))"
      :class="`${styles.attribute.link} transaction--attribute`"
    >
      <q-icon v-if="appliedOptions.icon" :name="appliedOptions.icon" />
      <span v-if="!appliedOptions.icon">{{ rawValue(result) }}</span>
      <q-tooltip> Transaction: {{ rawValue(result) }} </q-tooltip>
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
  name: 'TransactionAttributeRenderer',
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
        name: attributeControl.appliedOptions.value['route'] ?? 'transaction',
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
