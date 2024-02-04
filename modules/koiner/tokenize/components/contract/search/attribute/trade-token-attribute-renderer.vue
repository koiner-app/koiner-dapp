<template>
  <attribute-wrapper
    v-bind="attributeWrapper"
    :styles="styles"
    :applied-options="appliedOptions"
  >
    <a
      v-if="tradableTokens().includes(result.node.id)"
      :href="`https://app.koindx.com/swap?output=${result.node.id}`"
      target="_blank"
      :class="`${styles.attribute.link}`"
    >
      Trade
    </a>
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
import { tradableTokens } from '@koiner/tokenize/tradable-tokens-map';

export default defineComponent({
  name: 'TradeTokenAttributeRenderer',
  methods: {
    tradableTokens() {
      return tradableTokens;
    },
  },
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

    return {
      ...attributeControl,
    };
  },
});
</script>
