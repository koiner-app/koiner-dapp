<template>
  <attribute-wrapper
    v-if="rawValue(result.node)"
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <span :class="`${rawValue(result.node)}`">
      {{ tokenAmount(parseInt(rawValue(result.node)), 8) }}
      <router-link
        :to="{
          name: 'token',
          params: { id: '1JZqj7dDrK5LzvdJgufYBJNUFo88xBoWC8' },
        }"
        :class="`${styles.attribute.link}`"
      >
        <span>
          VHP
          <q-tooltip :delay="500">Virtual Hash Power</q-tooltip>
        </span>
      </router-link>
    </span>
  </attribute-wrapper>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { rendererProps, RendererProps } from '@jsonforms/vue';
import {
  AttributeElement,
  AttributeWrapper,
  useJsonAttribute,
  useQuasarAttribute,
} from '@appvise/jsonsearch-quasar';
import { round } from 'lodash';

export default defineComponent({
  name: 'VhpTokenAmountAttributeRenderer',
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

    const tokenAmount = (units: number, decimals: number): number => {
      return round(units / Math.pow(10, decimals), decimals);
    };

    return {
      ...attributeControl,
      tokenAmount,
    };
  },
});
</script>
